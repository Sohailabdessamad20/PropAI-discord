import React, { useState, useRef, useEffect } from 'react';
import { Send, Hash, Users, Bell, Pin, Search, Inbox, MailQuestion as QuestionMark, Bot, Image as ImageIcon } from 'lucide-react';
import { Message, Channel } from '../types';
import MessageComponent from './Message';

interface ChatAreaProps {
  channel: Channel;
  messages: Message[];
  isAiResponding: boolean;
  onSendMessage: (content: string) => void;
  user: any;
}

export default function ChatArea({ channel, messages, isAiResponding, onSendMessage, user }: ChatAreaProps) {
  const [messageInput, setMessageInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (messageInput.trim() && !(channel.name === 'talk-to-ai' && isAiResponding)) {
      onSendMessage(messageInput.trim());
      setMessageInput('');
    }
  };

  const isGenerateCommand = messageInput.startsWith('/generate ');

  return (
    <div className="flex-1 flex flex-col bg-[#36393f]">
      <div className="h-12 bg-[#36393f] border-b border-[#202225] flex items-center px-4 shadow-sm">
        <Hash className="w-5 h-5 text-gray-400 mr-2" />
        <span className="text-white font-semibold mr-2">{channel.name}</span>
        {channel.name === 'talk-to-ai' && (
          <div className="flex items-center bg-blue-600 px-2 py-1 rounded text-xs">
            <Bot className="w-3 h-3 mr-1" />
            <span className="text-white">AI Powered</span>
          </div>
        )}
        {channel.name === 'talk-to-ai' && (
          <div className="ml-2 text-xs text-gray-400">
            Chat with PropAI • Use /generate [prompt] for images
          </div>
        )}
        <div className="ml-auto flex items-center space-x-4">
          <button className="text-gray-400 hover:text-gray-300 transition-colors">
            <Bell className="w-5 h-5" />
          </button>
          <button className="text-gray-400 hover:text-gray-300 transition-colors">
            <Pin className="w-5 h-5" />
          </button>
          <button className="text-gray-400 hover:text-gray-300 transition-colors">
            <Users className="w-5 h-5" />
          </button>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Search"
              className="bg-[#202225] text-gray-300 placeholder-gray-500 pl-10 pr-4 py-1 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 w-36"
            />
          </div>
          <button className="text-gray-400 hover:text-gray-300 transition-colors">
            <Inbox className="w-5 h-5" />
          </button>
          <button className="text-gray-400 hover:text-gray-300 transition-colors">
            <QuestionMark className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-1">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 mt-8">
            <Hash className="w-16 h-16 mx-auto mb-4 text-gray-500" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">
              Welcome to #{channel.name}!
            </h3>
            <p className="text-gray-500">
              {channel.name === 'talk-to-ai' 
                ? 'Start a conversation with our AI assistant. Ask questions, get help, or just chat!'
                : 'This is the start of the #' + channel.name + ' channel.'
              }
            </p>
          </div>
        ) : (
          messages.map((message) => (
            <MessageComponent key={message.id} message={message} />
          ))
        )}
        {isAiResponding && channel.name === 'talk-to-ai' && (
          <div className="flex items-start space-x-3 px-4 py-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                <span className="text-white font-medium text-sm">PropAI</span>
                <div className="bg-blue-600 text-white text-xs px-1.5 py-0.5 rounded">BOT</div>
              </div>
              <div className="flex items-center space-x-1 text-gray-400">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
                <span className="text-xs">PropAI is typing...</span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4">
        <form onSubmit={handleSendMessage} className="relative">
          {isGenerateCommand && (
            <div className="mb-2 text-xs text-purple-300 flex items-center">
              <ImageIcon className="w-3 h-3 mr-1" />
              Image generation mode
            </div>
          )}
          <input
            type="text"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            disabled={channel.name === 'talk-to-ai' && isAiResponding}
            placeholder={
              channel.name === 'talk-to-ai' && isAiResponding
                ? 'Waiting for PropAI to respond...'
                : channel.name === 'talk-to-ai' 
                ? `Message #${channel.name} or use /generate [prompt]`
                : `Message #${channel.name}`
            }
            className={`w-full bg-[#40444b] text-white placeholder-gray-500 px-4 py-3 rounded-lg focus:outline-none focus:ring-1 pr-12 disabled:opacity-50 disabled:cursor-not-allowed ${
              isGenerateCommand ? 'focus:ring-purple-500 border border-purple-500' : 'focus:ring-blue-500'
            } ${channel.name === 'talk-to-ai' && isAiResponding ? 'cursor-not-allowed' : ''}`}
          />
          <button
            type="submit"
            disabled={!messageInput.trim() || (channel.name === 'talk-to-ai' && isAiResponding)}
            className={`absolute right-3 top-1/2 transform -translate-y-1/2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
              isGenerateCommand 
                ? 'text-purple-400 hover:text-purple-300' 
                : 'text-gray-500 hover:text-white'
            }`}
          >
            {isGenerateCommand ? <ImageIcon className="w-5 h-5" /> : <Send className="w-5 h-5" />}
          </button>
        </form>
      </div>
    </div>
  );
}