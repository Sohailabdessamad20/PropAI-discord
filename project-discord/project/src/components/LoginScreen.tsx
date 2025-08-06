import React, { useState } from 'react';
import { Crown, MessageSquare, Zap } from 'lucide-react';
import { fastLogin } from '../services/auth';

interface LoginScreenProps {
  onLogin: () => void;
}

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  const [showFastLogin, setShowFastLogin] = useState(false);
  const [username, setUsername] = useState('');

  const handleFastLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      const user = fastLogin(username.trim());
      window.location.reload(); // Refresh to trigger user state update
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
      <div className="bg-gray-800 rounded-lg shadow-2xl p-8 max-w-md w-full mx-4 border border-gray-700">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Crown className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">PropAI</h1>
          <p className="text-gray-400">
            Your AI-powered Discord-like experience
          </p>
        </div>

        <div className="space-y-4 mb-8">
          <div className="flex items-center space-x-3 text-gray-300">
            <MessageSquare className="w-5 h-5 text-blue-400" />
            <span>Chat with advanced AI</span>
          </div>
          <div className="flex items-center space-x-3 text-gray-300">
            <Zap className="w-5 h-5 text-purple-400" />
            <span>Real-time conversations</span>
          </div>
          <div className="flex items-center space-x-3 text-gray-300">
            <Crown className="w-5 h-5 text-yellow-400" />
            <span>Premium Discord-like interface</span>
          </div>
        </div>

        {!showFastLogin ? (
          <div className="space-y-3">
            <button
              onClick={onLogin}
              className="w-full bg-[#5865F2] hover:bg-[#4752C4] text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
              </svg>
              <span>Login with Discord</span>
            </button>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-800 text-gray-400">or</span>
              </div>
            </div>
            
            <button
              onClick={() => setShowFastLogin(true)}
              className="w-full bg-gray-600 hover:bg-gray-500 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <Zap className="w-5 h-5" />
              <span>Fast Login</span>
            </button>
          </div>
        ) : (
          <form onSubmit={handleFastLogin} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
                Choose a username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                className="w-full bg-gray-700 text-white placeholder-gray-400 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-600"
                required
                minLength={2}
                maxLength={20}
              />
            </div>
            
            <div className="flex space-x-3">
              <button
                type="button"
                onClick={() => setShowFastLogin(false)}
                className="flex-1 bg-gray-600 hover:bg-gray-500 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={!username.trim()}
                className="flex-1 bg-blue-600 hover:bg-blue-500 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
              >
                Enter Chat
              </button>
            </div>
          </form>
        )}

        <p className="text-gray-400 text-xs text-center mt-4">
          By logging in, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}