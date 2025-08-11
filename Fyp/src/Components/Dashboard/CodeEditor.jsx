import React, { useEffect, useMemo, useState } from 'react';
import Editor from '@monaco-editor/react';
import { useTheme } from '../../contexts/ThemeContext';

export function CodeEditor({ file }) {
  const { darkMode } = useTheme();

  const [code, setCode] = useState('');
  const language = useMemo(() => {
    const name = file?.name || '';
    const ext = name.split('.').pop()?.toLowerCase();
    switch (ext) {
      case 'js':
      case 'jsx':
        return 'javascript';
      case 'ts':
      case 'tsx':
        return 'typescript';
      case 'json':
        return 'json';
      case 'css':
        return 'css';
      case 'html':
        return 'html';
      case 'py':
        return 'python';
      case 'java':
        return 'java';
      case 'c':
        return 'c';
      case 'cc':
      case 'cpp':
      case 'cxx':
      case 'hpp':
      case 'hh':
        return 'cpp';
      case 'md':
        return 'markdown';
      case 'txt':
        return 'plaintext';
      default:
        return 'javascript';
    }
  }, [file?.name]);

  // Load text for File/Blob inputs; accept string as-is
  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      if (!file) {
        setCode('');
        return;
      }
      const content = file.content;
      if (typeof content === 'string') {
        if (!cancelled) setCode(content);
        return;
      }
      if (content && typeof content.text === 'function') {
        try {
          const text = await content.text();
          if (!cancelled) setCode(text);
          return;
        } catch (e) {
          console.error('Failed to read file content', e);
        }
      }
      // Fallback
      if (!cancelled) setCode('// Start coding...');
    };
    load();
    return () => { cancelled = true; };
  }, [file]);

  const handleEditorChange = (value) => {
    setCode(value ?? '');
    // TODO: persist changes if needed
  };

  return (
    <div className="h-full bg-card text-app p-4">
      {!file ? (
        <div className="h-full flex items-center justify-center text-muted-foreground">
          <p>Select a file to start editing</p>
        </div>
      ) : (
        <div className="h-full rounded-lg border border-app ring-1 ring-app overflow-hidden">
          <Editor
            height="100%"
            theme={darkMode ? 'vs-dark' : 'vs'}
            language={language}
            path={file?.name || 'untitled'}
            value={code}
            onChange={handleEditorChange}
            options={{
              fontSize: 14,
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              automaticLayout: true,
            }}
          />
        </div>
      )}
    </div>
  );
}

export default CodeEditor;
