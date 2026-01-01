import { SYSTEM_INSTRUCTION } from "../constants";

export class DocumentationService {
  async generateDocumentation(
    code: string,
    language: string,
    onProgress?: (chunk: string) => void
  ): Promise<string> {
    try {
      const ollamaUrl = process.env.OLLAMA_URL || 'http://localhost:11434';
      const model = process.env.OLLAMA_MODEL || 'phi3:mini'; // Much faster model!

      // Ultra-concise prompt for maximum speed
      const prompt = `Document this ${language} code briefly:

\`\`\`${language}
${code}
\`\`\`

Quick summary:
- What it does
- Key functions
- Main parameters`;

      const response = await fetch(`${ollamaUrl}/api/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: model,
          prompt: prompt,
          stream: true,
          options: {
            temperature: 0.1,    // Very low for fast, focused output
            num_predict: 512,    // Reduced for faster generation
            top_k: 20,           // Faster sampling
            top_p: 0.8,
            num_ctx: 2048,       // Smaller context = faster
            num_thread: 8,       // Use more CPU threads
          }
        }),
      });

      if (!response.ok) {
        throw new Error(`Ollama API error: ${response.statusText}`);
      }

      // Handle streaming response
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let fullResponse = '';

      if (!reader) {
        throw new Error('Failed to get response reader');
      }

      while (true) {
        const { done, value } = await reader.read();

        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n').filter(line => line.trim());

        for (const line of lines) {
          try {
            const parsed = JSON.parse(line);
            if (parsed.response) {
              fullResponse += parsed.response;
              // Call progress callback if provided
              if (onProgress) {
                onProgress(fullResponse);
              }
            }
          } catch (e) {
            // Skip invalid JSON lines
          }
        }
      }

      return fullResponse || "Failed to generate documentation.";
    } catch (error: any) {
      console.error("Ollama API Error:", error);

      // Provide helpful error message
      if (error.message.includes('fetch') || error.message.includes('Failed to fetch')) {
        throw new Error("Cannot connect to Ollama. Please make sure Ollama is running locally on port 11434. Install from https://ollama.ai");
      }

      throw new Error(error.message || "An unexpected error occurred during generation.");
    }
  }
}

export const docService = new DocumentationService();