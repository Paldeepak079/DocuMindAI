
import React from 'react';
import { Language } from '../types';

interface EditorProps {
  code: string;
  setCode: (code: string) => void;
  language: Language;
  onGenerate: () => void;
  disabled: boolean;
}

const Editor: React.FC<EditorProps> = ({ code, setCode, language, onGenerate, disabled }) => {
  return (
    <div className="flex flex-col h-full bg-slate-900 rounded-xl shadow-2xl overflow-hidden border border-slate-700">
      <div className="flex items-center justify-between px-4 py-2 bg-slate-800 border-b border-slate-700">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="ml-2 text-slate-400 text-xs font-mono uppercase tracking-wider">source_code.{language === 'javascript' ? 'ts' : language === 'python' ? 'py' : 'src'}</span>
        </div>
        <button
          onClick={onGenerate}
          disabled={disabled || !code.trim()}
          className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${
            disabled || !code.trim() 
              ? 'bg-slate-700 text-slate-500 cursor-not-allowed' 
              : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-900/20'
          }`}
        >
          {disabled ? (
            <>
              <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating...
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Generate Docs
            </>
          )}
        </button>
      </div>
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="// Paste your complex code here to generate documentation..."
        className="flex-1 w-full bg-transparent text-indigo-100 font-mono p-6 resize-none focus:outline-none text-sm leading-relaxed"
        spellCheck={false}
      />
    </div>
  );
};

export default Editor;
