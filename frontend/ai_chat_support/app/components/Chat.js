'use client';

import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import ChatMessage from './ChatMessage';

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:8080/api/chat', {
        message: userMessage,
      });

      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: response.data.response },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Sorry, there was an error processing your request.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-teal-100">
      <div className="w-full max-w-2xl h-[80vh] flex flex-col bg-white/90 rounded-2xl shadow-2xl border border-gray-200">
        {/* Header */}
        <div className="py-4 px-6 border-b border-gray-200 rounded-t-2xl bg-white/80">
          <h1 className="text-2xl font-bold text-center text-blue-700">AI Chat Support</h1>
        </div>
        {/* Chat area */}
        <div className="flex-1 overflow-y-auto px-4 py-6 flex flex-col gap-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <ChatMessage
                message={message.content}
                isUser={message.role === 'user'}
              />
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-200 rounded-lg px-4 py-2">
                <span className="animate-pulse">AI is typing...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        {/* Input area */}
        <form
          onSubmit={handleSubmit}
          className="px-4 py-3 border-t border-gray-200 bg-white/80 rounded-b-2xl"
        >
          <div className="flex justify-center w-full gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="w-2/3 p-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 shadow-sm"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading}
              className="px-5 py-2 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition disabled:opacity-50 shadow"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 