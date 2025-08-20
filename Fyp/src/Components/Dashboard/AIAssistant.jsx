import React, { useState } from "react";
import { FaPaperPlane, FaRobot, FaUser } from "react-icons/fa";

export function AIAssistant() {
  const [messages, setMessages] = useState([
    {
      type: "assistant",
      content:
        "Hello! I can help you with code analysis, test generation, and faculty prediction. What would you like to do?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = { type: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: input }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'Failed to get response from the AI');
      }

      setMessages((prev) => [
        ...prev,
        { type: "assistant", content: data.answer }
      ]);
    } catch (err) {
      console.error('Error:', err);
      setMessages((prev) => [
        ...prev,
        { 
          type: "assistant", 
          content: `⚠️ Error: ${err.message || 'An error occurred while processing your request'}` 
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Chat Header */}
      <div className="p-4 border-b border-app">
        <h3 className="text-lg font-semibold flex items-center text-app">
          <FaRobot className="w-5 h-5 mr-2 text-secondary" />
          AI Assistant
        </h3>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex items-start space-x-2 ${
              message.type === "user"
                ? "flex-row-reverse space-x-reverse"
                : ""
            }`}
          >
            {/* Avatar */}
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                message.type === "assistant" ? "bg-secondary" : "bg-primary"
              }`}
            >
              {message.type === "assistant" ? (
                <FaRobot className="w-4 h-4 text-white" />
              ) : (
                <FaUser className="w-4 h-4 text-white" />
              )}
            </div>

            {/* Message */}
            <div
              className={`max-w-[80%] rounded-lg px-4 py-2 ${
                message.type === "assistant"
                  ? "bg-muted text-app"
                  : "bg-primary text-primary-foreground"
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-start space-x-2">
            <div className="w-8 h-8 rounded-full flex items-center justify-center bg-secondary">
              <FaRobot className="w-4 h-4 text-white" />
            </div>
            <div className="bg-muted text-app rounded-lg px-4 py-2">
              Typing...
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="flex items-center justify-between p-4 border-t border-app">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 p-2 rounded-l-lg border border-r-0 border-app bg-muted text-app focus:outline-none focus:ring-2 focus:ring-primary"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={!input.trim() || loading}
          className="bg-primary text-primary-foreground p-2 rounded-r-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
          ) : (
            <FaPaperPlane className="w-5 h-5" />
          )}
        </button>
      </form>
    </div>
  );
}

export default AIAssistant;
