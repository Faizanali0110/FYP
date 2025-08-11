import React, { useState } from 'react';
import FileExplorer from '../../Components/Dashboard/FileExplorer';
import CodeEditor from '../../Components/Dashboard/CodeEditor';
import AIAssistant from '../../Components/Dashboard/AIAssistant';
import DashboardHeader from '../../Components/Dashboard/DashboardHeader';
import { FaCode, FaVial, FaChartLine } from 'react-icons/fa';

export function Dashboard() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [activeTab, setActiveTab] = useState('editor'); 

  return (
    <div className="h-screen bg-app text-app flex flex-col transition-colors duration-200">
      <DashboardHeader />
      
      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - File Explorer */}
        <div className="w-72 bg-card border-r border-app flex flex-col">
          <FileExplorer
            selectedFile={selectedFile}
            onFileSelect={(f) => {
              setSelectedFile(f);
              setActiveTab('editor');
            }}
          />
        </div>

        {/* Center Panel - Code Editor & Features */}
        <div className="flex-1 flex flex-col">
          {/* Tabs */}
          <div className="bg-card/80 backdrop-blur border-b border-app px-4">
            <div className="flex space-x-1">
              <TabButton 
                active={activeTab === 'editor'}
                onClick={() => setActiveTab('editor')}
                icon={<FaCode />}
                label="Editor"
              />
              <TabButton 
                active={activeTab === 'faculty'}
                onClick={() => setActiveTab('faculty')}
                icon={<FaChartLine />}
                label="Faculty Prediction"
              />
              <TabButton 
                active={activeTab === 'tests'}
                onClick={() => setActiveTab('tests')}
                icon={<FaVial />}
                label="Test Generation"
              />
            </div>
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-hidden">
            {activeTab === 'editor' && (
              <div className="h-full flex flex-col">
                <div className="h-10 bg-muted border-b border-app flex items-center px-4 text-xs md:text-sm text-muted-foreground">
                  {selectedFile ? (selectedFile.path || selectedFile.name) : 'No file selected'}
                </div>
                <div className="flex-1 overflow-hidden">
                  <CodeEditor file={selectedFile} />
                </div>
              </div>
            )}
            {activeTab === 'faculty' && (
              <FacultyPrediction 
                file={selectedFile}
              />
            )}
            {activeTab === 'tests' && (
              <TestGeneration 
                file={selectedFile}
              />
            )}
          </div>
        </div>

        {/* Right Panel - AI Assistant */}
        <div className="w-96 bg-card border-l border-app">
          <AIAssistant />
        </div>
      </div>

      {/* Bottom Panel - Logs */}
      <div className="h-32 bg-muted border-t border-app p-4 overflow-y-auto">
        <h3 className="text-sm font-semibold text-muted-foreground mb-2">Logs</h3>
        <div className="space-y-1 text-sm font-mono">
          <LogEntry type="info" message="System initialized" />
          <LogEntry type="success" message="Connected to AI service" />
        </div>
      </div>
    </div>
  );
}

function TabButton({ active, onClick, icon, label }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
        active 
          ? 'text-secondary border-secondary'
          : 'text-muted-foreground border-transparent hover:text-app hover:border-app'
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

function LogEntry({ type, message }) {
  const colors = {
    info: 'text-blue-600',
    success: 'text-green-600',
    error: 'text-red-600',
    warning: 'text-yellow-600'
  };

  return (
    <div className={`${colors[type]} font-mono text-sm`}>
      {`[${type.toUpperCase()}] ${message}`}
    </div>
  );
}

function FacultyPrediction({ file }) {
  return (
    <div className="h-full p-6 overflow-y-auto">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Faculty Prediction</h2>
        
        {!file ? (
          <div className="text-center py-12">
            <FaChartLine className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Select a file to analyze and predict faculty</p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-card rounded-lg p-6 border border-app">
              <h3 className="text-lg font-semibold mb-4">Prediction Results</h3>
              {/* Add prediction UI here */}
            </div>
            
            <div className="bg-card rounded-lg p-6 border border-app">
              <h3 className="text-lg font-semibold mb-4">Confidence Score</h3>
              {/* Add confidence score visualization here */}
            </div>

            <div className="bg-card rounded-lg p-6 border border-app">
              <h3 className="text-lg font-semibold mb-4">Influencing Factors</h3>
              {/* Add factors table here */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function TestGeneration({ file }) {
  return (
    <div className="h-full p-6 overflow-y-auto">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Test Generation</h2>
        
        {!file ? (
          <div className="text-center py-12">
            <FaVial className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Select a file to generate tests</p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-card rounded-lg p-6 border border-app">
              <h3 className="text-lg font-semibold mb-4">Test Configuration</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Test Type
                  </label>
                  <select className="w-full bg-input border border-app rounded-lg p-2">
                    <option>Unit Test</option>
                    <option>Integration Test</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Framework
                  </label>
                  <select className="w-full bg-input border border-app rounded-lg p-2">
                    <option>Jest</option>
                    <option>Mocha</option>
                    <option>JUnit</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-lg p-6 border border-app">
              <h3 className="text-lg font-semibold mb-4">Generated Tests</h3>
              {/* Add test code editor here */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
