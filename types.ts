
export enum Language {
  Javascript = 'javascript',
  Python = 'python',
  Java = 'java',
  Cpp = 'cpp',
  Auto = 'auto'
}

export enum OutputFormat {
  Markdown = 'markdown',
  HTML = 'html',
  JSON = 'json',
  PDF = 'pdf'
}

export interface DocGenerationState {
  isLoading: boolean;
  content: string;
  error: string | null;
}

export interface CodeSnippet {
  code: string;
  language: Language;
}

export interface DocumentationResult {
  markdown: string;
  html?: string;
  metadata: {
    generatedAt: string;
    language: string;
  };
}
