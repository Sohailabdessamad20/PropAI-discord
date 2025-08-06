import React from 'react';
import { Hash, Volume2, Settings, Users, Crown, LogOut } from 'lucide-react';
import { Channel } from '../types';
import { logout } from '../services/auth';

interface SidebarProps {
  channels: Channel[];
  activeChannel: string;
  onChannelSelect: (channelId: string) => void;
  user: any;
}

export default function Sidebar({ channels, activeChannel, onChannelSelect, user }: SidebarProps) {
  const channelsByCategory = channels.reduce((acc, channel) => {
    const category = channel.category || 'General';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(channel);
    return acc;
  }, {} as Record<string, Channel[]>);

  const getChannelIcon = (channelName: string) => {
    const iconMap: Record<string, string> = {
      'rules': '📋',
      'announcements': '📢',
      'giveaways': '🎁',
      'updates': '🔔',
      'partnership': '🤝',
      'reaction-roles': '👑',
      'chat': '💬',
      'talk-to-ai': '💬',
      'activity': '👋',
      'levels': '📊'
    };
    return iconMap[channelName] || '💬';
  };

  const handleLogout = () => {
    logout();
    window.location.reload();
  };

  return (
    <div className="w-60 bg-[#2f3136] flex flex-col h-full">
      <div className="h-12 bg-[#202225] flex items-center px-4 border-b border-[#202225] shadow-md">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
            <Crown className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-white font-semibold text-lg">PropAI</h1>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {Object.entries(channelsByCategory).map(([categoryName, categoryChannels]) => (
          <div key={categoryName} className="p-2">
            <div className="flex items-center justify-between px-2 py-1 mb-1">
              <span className="text-gray-400 text-xs font-semibold uppercase tracking-wide">
                {categoryName}
              </span>
            </div>
            
            {categoryChannels.map((channel) => (
              <button
                key={channel.id}
                onClick={() => onChannelSelect(channel.id)}
                className={`w-full flex items-center px-2 py-1 rounded text-left transition-colors ${
                  activeChannel === channel.id
                    ? 'bg-[#393c43] text-white'
                    : 'text-gray-400 hover:bg-[#393c43] hover:text-gray-300'
                }`}
              >
                <Hash className="w-4 h-4 mr-2 text-gray-500" />
                <span className="text-xs mr-2">{getChannelIcon(channel.name)}</span>
                <span className="text-sm">{channel.name}</span>
              </button>
            ))}
          </div>
        ))}
      </div>

      <div className="h-14 bg-[#292b2f] flex items-center px-2 border-t border-[#202225]">
        <div className="flex items-center flex-1">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mr-2">
            <span className="text-white text-sm font-semibold">
              {user?.username?.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-white text-sm font-medium truncate">
              {user?.username}
            </div>
            <div className="text-gray-400 text-xs">
              {user?.email && (
                <div className="truncate">{user.email}</div>
              )}
            </div>
          </div>
        </div>
        <button className="p-1 text-gray-500 hover:text-gray-400 transition-colors mr-1">
          <Settings className="w-4 h-4" />
        </button>
        <button 
          onClick={handleLogout}
          className="p-1 text-gray-500 hover:text-red-400 transition-colors"
          title="Logout"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}