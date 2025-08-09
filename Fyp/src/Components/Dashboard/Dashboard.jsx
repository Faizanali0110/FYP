import React, { useState } from 'react';
import FileExplorer from './FileExplorer';
import CodeEditor from './CodeEditor';
import AIAssistant from './AIAssistant';
import DashboardHeader from './DashboardHeader';
import { FaCode, FaVial, FaChartLine } from 'react-icons/fa';

export function Dashboard() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [activeTab, setActiveTab] = useState('editor'); // 'editor', 'faculty', 'tests'

  return (
    <div className="h-screen bg-[#0F172A] text-white flex flex-col">
      <DashboardHeader />
      
      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - File Explorer */}
        <div className="w-64 bg-[#1E293B] border-r border-gray-700 flex flex-col">
          <FileExplorer 
            onFileSelect={setSelectedFile}
          />
        </div>

        {/* Center Panel - Code Editor & Features */}
        <div className="flex-1 flex flex-col">
          {/* Tabs */}
          <div className="bg-[#1E293B] border-b border-gray-700 px-4">
            <div className="flex space-x-4">
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
              <CodeEditor 
                file={selectedFile}
              />
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
        <div className="w-96 bg-[#1E293B] border-l border-gray-700">
          <AIAssistant />
        </div>
      </div>

      {/* Bottom Panel - Logs */}
      <div className="h-32 bg-[#1E293B] border-t border-gray-700 p-4 overflow-y-auto">
        <h3 className="text-sm font-semibold text-gray-400 mb-2">Logs</h3>
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
          ? 'text-[#22D3EE] border-[#22D3EE]' 
          : 'text-gray-400 border-transparent hover:text-gray-300 hover:border-gray-700'
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

function LogEntry({ type, message }) {
  const colors = {
    info: 'text-blue-400',
    success: 'text-green-400',
    error: 'text-red-400',
    warning: 'text-yellow-400'
  };

  return (
    <div className={`${colors[type]} font-mono`}>
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
            <FaChartLine className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">Select a file to analyze and predict faculty</p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-[#0F172A] rounded-lg p-6 border border-gray-700">
              <h3 className="text-lg font-semibold mb-4">Prediction Results</h3>
              {/* Add prediction UI here */}
            </div>
            
            <div className="bg-[#0F172A] rounded-lg p-6 border border-gray-700">
              <h3 className="text-lg font-semibold mb-4">Confidence Score</h3>
              {/* Add confidence score visualization here */}
            </div>

            <div className="bg-[#0F172A] rounded-lg p-6 border border-gray-700">
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
            <FaVial className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">Select a file to generate tests</p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-[#0F172A] rounded-lg p-6 border border-gray-700">
              <h3 className="text-lg font-semibold mb-4">Test Configuration</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Test Type
                  </label>
                  <select className="w-full bg-[#1E293B] border border-gray-700 rounded-lg p-2">
                    <option>Unit Test</option>
                    <option>Integration Test</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Framework
                  </label>
                  <select className="w-full bg-[#1E293B] border border-gray-700 rounded-lg p-2">
                    <option>Jest</option>
                    <option>Mocha</option>
                    <option>JUnit</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-[#0F172A] rounded-lg p-6 border border-gray-700">
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
