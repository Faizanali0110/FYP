import React, { useState } from 'react';
import { FaPaperPlane, FaRobot, FaUser } from 'react-icons/fa';

export function AIAssistant() {
  const [messages, setMessages] = useState([
    {
      type: 'assistant',
      content: 'Hello! I can help you with code analysis, test generation, and faculty prediction. What would you like to do?'
    }
  ]);
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { type: 'user', content: input }]);
    
    // TODO: Add AI response logic here
    
    setInput('');
  };

  return (
    <div className="h-full flex flex-col">
      {/* Chat Header */}
      <div className="p-4 border-b border-gray-700">
        <h3 className="text-lg font-semibold flex items-center">
          <FaRobot className="w-5 h-5 mr-2 text-[#22D3EE]" />
          AI Assistant
        </h3>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex items-start space-x-2 ${
              message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
            }`}
          >
            {/* Avatar */}
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              message.type === 'assistant' ? 'bg-[#22D3EE]' : 'bg-[#6366F1]'
            }`}>
              {message.type === 'assistant' ? (
                <FaRobot className="w-4 h-4 text-[#0F172A]" />
              ) : (
                <FaUser className="w-4 h-4 text-[#0F172A]" />
              )}
            </div>

            {/* Message */}
            <div className={`max-w-[80%] rounded-lg px-4 py-2 ${
              message.type === 'assistant' 
                ? 'bg-[#0F172A] text-white' 
                : 'bg-[#6366F1] text-white'
            }`}>
              {message.content}
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-700">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question..."
            className="flex-1 bg-[#0F172A] text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#22D3EE]"
          />
          <button
            type="submit"
            className="bg-[#6366F1] hover:bg-[#4F46E5] text-white rounded-lg p-2 transition-colors"
          >
            <FaPaperPlane className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
}

export default AIAssistant;
