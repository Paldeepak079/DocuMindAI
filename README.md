# 🧠 DocuMind AI - AI-Powered Code Documentation Generator

<div align="center">
  
![DocuMind AI Banner](https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6)

**Transform your source code into professional, comprehensive documentation in seconds.**

[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue?logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.2-61dafb?logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.2-646cff?logo=vite)](https://vitejs.dev/)
[![Ollama](https://img.shields.io/badge/Ollama-Powered-000000?logo=ollama)](https://ollama.ai/)

</div>

---

## ✨ Features

### 🚀 **AI-Powered Documentation Generation**
- **Intelligent Code Analysis**: Automatically analyzes your code structure, logic, and patterns
- **Multi-Language Support**: JavaScript/TypeScript, Python, Java, C++, and more
- **Auto-Detection**: Automatically identifies the programming language
- **Streaming Output**: Real-time documentation generation with live previews

### 📝 **Professional Documentation Structure**
- **Overview & Purpose**: High-level explanation and business value
- **Architecture & Workflow**: System flow and component interactions
- **Detailed API Reference**: Comprehensive function/class documentation
- **Algorithmic Explanations**: Complex logic explained in plain language
- **Dependency Mapping**: Track all external libraries and imports

### 📤 **Multi-Format Export**
- **Markdown** (`.md`) - Perfect for GitHub and documentation sites
- **HTML** (`.html`) - Styled, print-ready professional documents
- **PDF** (`.pdf`) - High-quality exports with custom styling
- **JSON** (`.json`) - Structured data with metadata for automation

### ⚡ **Performance & UX**
- **Local AI Processing**: Powered by Ollama for fast, private, unlimited generation
- **Dark Mode UI**: Modern, sleek interface optimized for developers
- **Real-time Preview**: See documentation as it's being generated
- **Optimized Models**: Uses `phi3:mini` for blazing-fast results

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 19** | Modern UI framework with hooks |
| **TypeScript** | Type-safe development |
| **Vite** | Lightning-fast build tool |
| **Ollama API** | Local AI inference engine |
| **Tailwind CSS** | Utility-first styling |
| **marked.js** | Markdown to HTML conversion |
| **html2pdf.js** | PDF generation |

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** - Comes with Node.js
- **Ollama** - [Install from ollama.ai](https://ollama.ai/)

### Setting up Ollama

1. Install Ollama from [ollama.ai](https://ollama.ai/)
2. Pull the recommended model:
   ```bash
   ollama pull phi3:mini
   ```
3. Ensure Ollama is running on `http://localhost:11434`

---

## 🚀 Getting Started

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd documind-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment (Optional)**
   
   Create a `.env.local` file to customize Ollama settings:
   ```env
   OLLAMA_URL=http://localhost:11434
   OLLAMA_MODEL=phi3:mini
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   ```
   http://localhost:5173
   ```

---

## 📖 Usage Guide

### Step 1: Paste Your Code
- Copy your source code into the left editor panel
- The syntax highlighting will automatically adjust

### Step 2: Select Language (Optional)
- Choose your programming language from the sidebar
- Or leave it on "Auto Detect" for automatic detection

### Step 3: Generate Documentation
- Click the **"Generate Documentation"** button
- Watch as the AI analyzes your code in real-time
- Documentation appears instantly in the preview panel

### Step 4: Export
Choose your preferred format:
- **Markdown** - For GitHub, wikis, or documentation sites
- **HTML** - Styled, professional web document
- **PDF** - Print-ready, high-quality export
- **JSON** - Structured data with metadata

---

## 🏗️ Project Structure

```
documind-ai/
├── components/
│   ├── Header.tsx          # Top navigation bar
│   ├── Editor.tsx          # Code input editor with syntax highlighting
│   └── Preview.tsx         # Documentation preview panel
├── services/
│   └── geminiService.ts    # Ollama API integration & streaming
├── App.tsx                 # Main application component
├── types.ts                # TypeScript type definitions
├── constants.ts            # System prompts & language options
├── index.tsx               # React root entry point
├── index.html              # HTML template
├── vite.config.ts          # Vite configuration
└── package.json            # Dependencies & scripts
```

---

## ⚙️ Configuration

### Ollama Settings

You can customize the AI generation in `services/geminiService.ts`:

```typescript
options: {
  temperature: 0.1,    // Lower = more focused output
  num_predict: 512,    // Max tokens to generate
  top_k: 20,           // Sampling parameter
  top_p: 0.8,          // Nucleus sampling
  num_ctx: 2048,       // Context window size
  num_thread: 8,       // CPU threads for inference
}
```

### Available Ollama Models

- `phi3:mini` ⭐ (Recommended - Fast & Efficient)
- `llama3.2:3b` (Larger, more detailed)
- `codellama:7b` (Code-specialized)
- `mistral:7b` (General-purpose)

---

## 🎯 Key Features Explained

### 🤖 AI System Instructions

DocuMind AI uses a carefully crafted system prompt that ensures:
- ✅ Clean Markdown formatting
- ✅ Structured sections (Overview, Architecture, API Reference, etc.)
- ✅ Accurate analysis without hallucinations
- ✅ Focus on code intent and problem-solving
- ✅ Mermaid diagram support for complex flows

### 📊 Supported Output Formats

| Format | Use Case | Features |
|--------|----------|----------|
| Markdown | GitHub, Wikis | Raw `.md` file |
| HTML | Web Publishing | Styled with Google Fonts, print-ready |
| PDF | Official Docs | A4 format, high quality (98% JPEG) |
| JSON | Automation | Includes metadata & timestamps |

---

## 🐛 Troubleshooting

### "Cannot connect to Ollama"
**Solution**: Ensure Ollama is installed and running
```bash
# Check if Ollama is running
curl http://localhost:11434

# Start Ollama service
ollama serve
```

### Model not found
**Solution**: Pull the required model
```bash
ollama pull phi3:mini
```

### Port already in use (5173)
**Solution**: Change the Vite port in `vite.config.ts`
```typescript
export default defineConfig({
  server: { port: 3000 }
})
```

---

## 📦 Build for Production

```bash
# Create optimized production build
npm run build

# Preview production build locally
npm run preview
```

The build output will be in the `dist/` folder, ready for deployment.

---

## 🚀 Deployment

Deploy to your favorite platform:

- **Vercel**: `vercel deploy`
- **Netlify**: Drag & drop `dist/` folder
- **GitHub Pages**: Use `gh-pages` branch
- **Docker**: Create a Dockerfile with nginx

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Ollama Team** - For providing local AI inference
- **Google Fonts** - Inter & Fira Code fonts
- **Tailwind CSS** - Utility-first CSS framework
- **React Team** - Amazing UI library
- **Vite Team** - Lightning-fast build tool

---

## 📞 Support

Having issues? Here's how to get help:

- 📧 **Email**: support@documind.ai
- 💬 **Discord**: Join our community
- 📝 **Issues**: [GitHub Issues](https://github.com/yourusername/documind-ai/issues)
- 📚 **Docs**: [Full Documentation](https://docs.documind.ai)

---

<div align="center">

**Made with ❤️ by the DocuMind AI Team**

⭐ Star us on GitHub if this project helped you!

</div>
