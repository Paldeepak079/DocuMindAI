
import React, { useState } from 'react';
import ReactMarkdown from 'https://esm.sh/react-markdown';
import remarkGfm from 'https://esm.sh/remark-gfm';

interface PreviewProps {
  content: string;
  isLoading: boolean;
  error: string | null;
}

const Preview: React.FC<PreviewProps> = ({ content, isLoading, error }) => {
  const [copied, setCopied] = useState(false);
  const [errorCopied, setErrorCopied] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const handleCopy = async (text: string, setter: (v: boolean) => void) => {
    try {
      await navigator.clipboard.writeText(text);
      setter(true);
      setTimeout(() => setter(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-full space-y-4 text-gray-500 bg-[#0a0a0a]">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-gray-700 border-t-gray-500 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
        </div>
        <p className="text-lg font-medium text-gray-400 animate-pulse">Deconstructing logic and weaving documentation...</p>
        <p className="text-sm">This may take a minute for complex codebases.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 bg-gray-900">
        <div className="max-w-md w-full bg-gray-800 rounded-2xl shadow-xl border border-gray-700 overflow-hidden">
          <div className="bg-red-600 px-6 py-4 flex items-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <h3 className="text-white font-bold text-lg">Generation Failed</h3>
          </div>
          <div className="p-6 space-y-4">
            <p className="text-slate-600 text-sm leading-relaxed">
              An error occurred while analyzing your code. This could be due to API limits, network issues, or internal model processing errors.
            </p>
            <div className="bg-gray-900 rounded-lg p-4 font-mono text-xs text-red-400 border border-gray-700 break-words max-h-40 overflow-y-auto">
              {error}
            </div>
            <button
              onClick={() => handleCopy(error, setErrorCopied)}
              className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${errorCopied
                ? 'bg-green-600 text-white shadow-lg shadow-green-900/30'
                : 'bg-gray-700 text-white hover:bg-gray-600 shadow-lg shadow-gray-900/30'
                }`}
            >
              {errorCopied ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Error Log Copied
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                  </svg>
                  Copy Detailed Error Log
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-gray-500 p-8 text-center space-y-4 bg-[#0a0a0a]">
        <div className="p-4 bg-gray-900 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-400">Ready to Document</h3>
        <p className="max-w-xs">Enter your code in the left panel and click 'Generate Docs' to see the magic happen.</p>
      </div>
    );
  }

  return (
    <div className={`h-full relative overflow-hidden flex flex-col transition-colors duration-300 ${theme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-[#0a0a0a]'}`}>
      <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
        <button
          onClick={toggleTheme}
          title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          className={`p-1.5 rounded-lg border transition-all duration-200 shadow-sm ${theme === 'dark'
            ? 'bg-gray-800 text-yellow-400 border-gray-700 hover:bg-gray-700'
            : 'bg-gray-800 text-gray-400 border-gray-700 hover:bg-gray-700'
            }`}
        >
          {theme === 'light' ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 9h-1m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
            </svg>
          )}
        </button>
        <button
          onClick={() => handleCopy(content, setCopied)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 shadow-sm border ${copied
            ? 'bg-green-50 text-green-700 border-green-200'
            : theme === 'dark'
              ? 'bg-gray-800 text-gray-300 border-gray-700 hover:bg-gray-700 hover:text-white'
              : 'bg-gray-800 text-gray-300 border-gray-700 hover:bg-gray-700 hover:text-gray-100'
            }`}
        >
          {copied ? (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Copied!
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
              </svg>
              Copy MD
            </>
          )}
        </button>
      </div>
      <div className={`flex-1 overflow-y-auto px-8 py-10 prose prose-slate max-w-none transition-all duration-300 ${theme === 'dark' ? 'theme-dark' : 'theme-light'}`}>
        <style>{`
          .theme-light h1 { font-weight: 800; color: #d1d5db; border-bottom: 2px solid #374151; padding-bottom: 0.5rem; }
          .theme-light h2 { font-weight: 700; color: #9ca3af; margin-top: 2rem; border-left: 4px solid #6b7280; padding-left: 1rem; }
          .theme-light h3 { font-weight: 600; color: #9ca3af; }
          .theme-light p { line-height: 1.75; color: #9ca3af; }
          .theme-light code { background: #1a1a1a; padding: 0.2rem 0.4rem; border-radius: 4px; color: #a5b4fc; font-size: 0.875em; }
          .theme-light pre { background: #0f0f0f; color: #f1f5f9; padding: 1.5rem; border-radius: 0.75rem; overflow-x: auto; box-shadow: inset 0 2px 4px 0 rgba(0,0,0,0.4); border: 1px solid #1a1a1a; }
          .theme-light pre code { background: transparent; padding: 0; color: inherit; }
          .theme-light ul { list-style-type: disc; padding-left: 1.5rem; color: #9ca3af; }
          .theme-light strong { color: #e5e7eb; }
          .theme-light blockquote { border-left-color: #374151; color: #6b7280; }

          .theme-dark h1 { font-weight: 800; color: #d1d5db; border-bottom: 2px solid #374151; padding-bottom: 0.5rem; }
          .theme-dark h2 { font-weight: 700; color: #9ca3af; margin-top: 2rem; border-left: 4px solid #6b7280; padding-left: 1rem; }
          .theme-dark h3 { font-weight: 600; color: #9ca3af; }
          .theme-dark p { line-height: 1.75; color: #9ca3af; }
          .theme-dark code { background: #1a1a1a; padding: 0.2rem 0.4rem; border-radius: 4px; color: #a5b4fc; font-size: 0.875em; }
          .theme-dark pre { background: #0f0f0f; color: #f1f5f9; padding: 1.5rem; border-radius: 0.75rem; overflow-x: auto; box-shadow: inset 0 2px 4px 0 rgba(0,0,0,0.4); border: 1px solid #1a1a1a; }
          .theme-dark pre code { background: transparent; padding: 0; color: inherit; }
          .theme-dark ul { list-style-type: disc; padding-left: 1.5rem; color: #9ca3af; }
          .theme-dark strong { color: #e5e7eb; }
          .theme-dark blockquote { border-left-color: #374151; color: #6b7280; }
        `}</style>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default Preview;
