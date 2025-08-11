import React, { useState, useRef } from 'react';
import { FaFolder, FaFolderOpen, FaFile, FaChevronRight, FaChevronDown, FaUpload, FaFolderPlus } from 'react-icons/fa';

export function FileExplorer({ onFileSelect, selectedFile }) {
  const [expandedFolders, setExpandedFolders] = useState(new Set());
  const [fileStructure, setFileStructure] = useState({
    name: 'project',
    type: 'folder',
    children: []
  });
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  const folderInputRef = useRef(null);

  const toggleFolder = (path) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(path)) {
      newExpanded.delete(path);
    } else {
      newExpanded.add(path);
    }
    setExpandedFolders(newExpanded);
  };

  const handleFileUpload = (event) => {
    const files = event.target.files;
    if (!files) return;

    // Convert FileList to array and process files
    Array.from(files).forEach(file => {
      const path = file.webkitRelativePath || file.name;
      const pathParts = path.split('/');
      
      // Add file to structure
      let current = fileStructure;
      pathParts.slice(0, -1).forEach(part => {
        let folder = current.children?.find(child => child.name === part);
        if (!folder) {
          folder = { name: part, type: 'folder', children: [] };
          current.children = current.children || [];
          current.children.push(folder);
        }
        current = folder;
      });
      
      // Add the file
      current.children = current.children || [];
      current.children.push({
        name: pathParts[pathParts.length - 1],
        type: 'file',
        content: file // Store the actual file object
      });
    });

    setFileStructure({ ...fileStructure });
    event.target.value = ''; // Reset input
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const items = e.dataTransfer.items;
    if (!items) return;

    const processEntry = async (entry) => {
      if (entry.isFile) {
        const file = await new Promise((resolve) => entry.file(resolve));
        return { name: entry.name, type: 'file', content: file };
      } else if (entry.isDirectory) {
        const dirReader = entry.createReader();
        const entries = await new Promise((resolve) => {
          dirReader.readEntries(resolve);
        });
        
        const children = await Promise.all(
          Array.from(entries).map(processEntry)
        );
        
        return {
          name: entry.name,
          type: 'folder',
          children
        };
      }
    };

    // Process all dropped items
    Array.from(items).forEach(async (item) => {
      const entry = item.webkitGetAsEntry();
      if (entry) {
        const result = await processEntry(entry);
        setFileStructure(prev => ({
          ...prev,
          children: [...(prev.children || []), result]
        }));
      }
    });
  };

  const renderItem = (item, path = '') => {
    const currentPath = `${path}/${item.name}`;
    const isExpanded = expandedFolders.has(currentPath);

    if (item.type === 'folder') {
      return (
        <div key={currentPath}>
          <button
            onClick={() => toggleFolder(currentPath)}
            className="w-full flex items-center px-2 py-1 hover:bg-muted rounded text-app"
          >
            <span className="w-4 h-4 mr-1">
              {isExpanded ? <FaChevronDown size={12} /> : <FaChevronRight size={12} />}
            </span>
            {isExpanded ? (
              <FaFolderOpen className="w-4 h-4 mr-2 text-secondary" />
            ) : (
              <FaFolder className="w-4 h-4 mr-2 text-secondary" />
            )}
            <span className="text-sm">{item.name}</span>
          </button>
          {isExpanded && item.children && (
            <div className="ml-4">
              {item.children.map((child) => renderItem(child, currentPath))}
            </div>
          )}
        </div>
      );
    }

    const isActive = selectedFile && (
      (selectedFile.path && selectedFile.path === currentPath) ||
      (!selectedFile.path && selectedFile.name === item.name)
    );

    return (
      <button
        key={currentPath}
        onClick={() => onFileSelect({ ...item, path: currentPath })}
        className={`w-full flex items-center px-2 py-1 rounded text-app transition-colors ${
          isActive ? 'bg-[rgb(var(--secondary))/0.12] border border-[rgb(var(--secondary))/0.4]' : 'hover:bg-muted'
        }`}
      >
        <span className="w-4 h-4 mr-1" />
        <FaFile className={`w-4 h-4 mr-2 ${isActive ? 'text-secondary' : 'text-muted-foreground'}`} />
        <span className={`text-sm ${isActive ? 'text-app' : ''}`}>{item.name}</span>
      </button>
    );
  };

  return (
    <div className="flex flex-col h-full">
      {/* Upload Area */}
      <div className="p-4 border-b border-app space-y-2">
        {/* Hidden File Inputs */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          className="hidden"
          multiple
        />
        <input
          type="file"
          ref={folderInputRef}
          onChange={handleFileUpload}
          className="hidden"
          webkitdirectory=""
          directory=""
        />
        
        {/* Upload Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center justify-center px-4 py-2 bg-primary hover:opacity-90 text-primary-foreground rounded-lg transition-colors"
          >
            <FaUpload className="w-4 h-4 mr-2" />
            Upload Files
          </button>
          <button
            onClick={() => folderInputRef.current?.click()}
            className="flex items-center justify-center px-4 py-2 bg-primary hover:opacity-90 text-primary-foreground rounded-lg transition-colors"
          >
            <FaFolderPlus className="w-4 h-4 mr-2" />
            Upload Folder
          </button>
        </div>

        {/* Drag & Drop Zone */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`mt-2 border-2 border-dashed rounded-lg p-4 text-center transition-colors ${
            isDragging
              ? 'border-secondary bg-[rgb(var(--secondary))/0.1]'
              : 'border-app hover:border-secondary'
          }`}
        >
          <p className="text-sm text-muted-foreground">
            Drag and drop files or folders here
          </p>
        </div>
      </div>

      {/* File Tree */}
      <div className="flex-1 overflow-y-auto p-2">
        {fileStructure.children?.length > 0 ? (
          renderItem(fileStructure)
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-muted-foreground space-y-2">
            <FaFolder className="w-12 h-12 opacity-50" />
            <p className="text-sm">No files uploaded yet</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default FileExplorer;
