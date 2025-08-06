import React from 'react';
import { Bot, Crown, Download, Image as ImageIcon } from 'lucide-react';
import { Message } from '../types';

interface MessageProps {
  message: Message;
}

export default function MessageComponent({ message }: MessageProps) {
  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }).format(date);
  };

  const handleDownloadImage = async (imageUrl: string) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `generated-image-${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Failed to download image:', error);
    }
  };

  return (
    <div className="flex items-start space-x-3 hover:bg-[#32353b] hover:bg-opacity-50 px-4 py-2 group">
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
        {message.isBot ? (
          <Bot className="w-6 h-6 text-white" />
        ) : (
          <span className="text-white text-sm font-semibold">
            {message.author.username.charAt(0).toUpperCase()}
          </span>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center space-x-2">
          <span className="text-white font-medium text-sm">
            {message.author.username}
          </span>
          {message.isBot && (
            <div className="bg-blue-600 text-white text-xs px-1.5 py-0.5 rounded">
              BOT
            </div>
          )}
          {message.isImageGeneration && (
            <div className="bg-purple-600 text-white text-xs px-1.5 py-0.5 rounded flex items-center">
              <ImageIcon className="w-3 h-3 mr-1" />
              IMAGE
            </div>
          )}
          <span className="text-gray-400 text-xs">
            {formatTime(message.timestamp)}
          </span>
        </div>
        <div className="mt-1">
          {message.content && (
            <div className="text-[#dcddde] text-sm leading-relaxed mb-2">
              {message.content}
            </div>
          )}
          {message.imageUrl && (
            <div className="bg-[#2f3136] rounded-lg p-3 max-w-md border border-[#202225]">
              <img 
                src={message.imageUrl} 
                alt="Generated image" 
                className="w-full rounded-lg mb-2 cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => window.open(message.imageUrl, '_blank')}
              />
              <div className="flex items-center justify-between">
                <span className="text-gray-500 text-xs">Generated Image</span>
                <button
                  onClick={() => handleDownloadImage(message.imageUrl!)}
                  className="flex items-center space-x-1 text-blue-400 hover:text-blue-300 text-xs transition-colors"
                >
                  <Download className="w-3 h-3" />
                  <span>Download</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}