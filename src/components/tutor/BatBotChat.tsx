import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User } from 'lucide-react';
import { TutorMessage } from '../../types';
import { useBatBot } from '../../hooks/useBatBot';

interface BatBotChatProps {
  contextLabel?: string;
}

export function BatBotChat({ contextLabel = 'Bat Bot' }: BatBotChatProps) {
  const [input, setInput] = useState('');
  const { messages, loading, sendMessage, clearMessages } = useBatBot();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const content = input.trim();
    setInput('');
    await sendMessage(content);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full bg-batman-dark border border-batman-yellow/30 rounded-lg batman-card">
      <div className="p-4 border-b border-batman-yellow/30 flex items-center justify-between">
        <div className="flex items-center space-x-2 text-batman-yellow">
          <Bot className="w-5 h-5" />
          <h3 className="font-semibold">{contextLabel}</h3>
        </div>
        {messages.length > 0 && (
          <button
            onClick={clearMessages}
            className="text-sm text-batman-yellow/80 hover:text-batman-yellow"
          >
            Clear
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-batman-yellow/70 py-8">
            <Bot className="w-12 h-12 mx-auto mb-4 opacity-70" />
            <p>Ask Bat Bot anything about SQL, ERD, Mapping, or Normalization.</p>
            <p className="text-sm mt-2">Powered by Google Gemini. Keep your queries concise.</p>
          </div>
        )}

        {messages.map((message: TutorMessage) => (
          <div
            key={message.id}
            className={`flex items-start space-x-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
          >
            {message.role === 'assistant' && (
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-batman-yellow text-batman-dark flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
            )}
            <div
              className={`max-w-[80%] rounded-lg p-3 ${message.role === 'user'
                  ? 'bg-batman-yellow text-batman-dark'
                  : 'bg-batman-gray text-batman-yellow'
                }`}
            >
              <div className="whitespace-pre-wrap">{message.content}</div>
              <div className="text-xs mt-1 opacity-70">
                {new Date(message.timestamp).toLocaleTimeString()}
              </div>
            </div>
            {message.role === 'user' && (
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-batman-gray text-batman-yellow flex items-center justify-center">
                <User className="w-5 h-5" />
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex items-start space-x-3 text-batman-yellow">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-batman-yellow text-batman-dark flex items-center justify-center">
              <Bot className="w-5 h-5" />
            </div>
            <div className="bg-batman-gray rounded-lg p-3">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-batman-yellow rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-batman-yellow rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-batman-yellow rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-batman-yellow/30">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask Bat Bot..."
            disabled={loading}
            className="flex-1 px-4 py-2 rounded-lg batman-input disabled:opacity-50"
          />
          <button
            onClick={handleSend}
            disabled={loading || !input.trim()}
            className="p-2 batman-button rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}