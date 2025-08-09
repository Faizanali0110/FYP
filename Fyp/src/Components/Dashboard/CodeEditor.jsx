import React from 'react';

export function CodeEditor({ file }) {
  return (
    <div className="h-full bg-[#0F172A] p-4">
      {!file ? (
        <div className="h-full flex items-center justify-center text-gray-400">
          <p>Select a file to start editing</p>
        </div>
      ) : (
        <div className="h-full">
          {/* Placeholder for Monaco Editor */}
          <textarea
            className="w-full h-full bg-[#0F172A] text-white font-mono p-4 resize-none focus:outline-none"
            placeholder="// Code will appear here"
            readOnly
          />
        </div>
      )}
    </div>
  );
}

export default CodeEditor;
