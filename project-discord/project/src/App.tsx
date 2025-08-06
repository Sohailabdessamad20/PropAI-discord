import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Sidebar from './components/Sidebar';
import ChatArea from './components/ChatArea';
import LoginScreen from './components/LoginScreen';
import { Message, Channel, User } from './types';
import { getStoredUser, initiateDiscordLogin, handleDiscordCallback } from './services/auth';
import { sendMessageToAI } from './services/ai';

const CHANNELS: Channel[] = [
  { id: 'rules', name: 'rules', type: 'text', category: 'Informations' },
  { id: 'announcements', name: 'announcements', type: 'text', category: 'Informations' },
  { id: 'giveaways', name: 'giveaways', type: 'text', category: 'Informations' },
  { id: 'updates', name: 'updates', type: 'text', category: 'Informations' },
  { id: 'partnership', name: 'partnership', type: 'text', category: 'Informations' },
  { id: 'reaction-roles', name: 'reaction-roles', type: 'text', category: 'Informations' },
  
  { id: 'chat', name: 'chat', type: 'text', category: 'Community' },
  { id: 'talk-to-ai', name: 'talk-to-ai', type: 'text', category: 'Community' },
  { id: 'activity', name: 'activity', type: 'text', category: 'Community' },
  { id: 'levels', name: 'levels', type: 'text', category: 'Community' },
];

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [activeChannel, setActiveChannel] = useState('chat');
  const [isAiResponding, setIsAiResponding] = useState(false);
  const [messages, setMessages] = useState<{ [channelId: string]: Message[] }>({
    rules: [],
    announcements: [],
    giveaways: [],
    updates: [],
    partnership: [],
    'reaction-roles': [],
    chat: [],
    'talk-to-ai': [],
    activity: [],
    levels: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = getStoredUser();
    if (storedUser) {
      setUser(storedUser);
    }

    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    
    if (code) {
      handleDiscordCallback(code).then((userData) => {
        setUser(userData);
        window.history.replaceState({}, document.title, window.location.pathname);
      }).catch((error) => {
        console.error('OAuth callback failed:', error);
      });
    }

    setIsLoading(false);
  }, []);

  const handleLogin = () => {
    initiateDiscordLogin();
  };

  const handleSendMessage = async (content: string) => {
    if (!user) return;
    
    if (activeChannel === 'talk-to-ai' && isAiResponding) {
      return;
    }

    const isGenerateCommand = content.startsWith('/generate ');
    
    const newMessage: Message = {
      id: uuidv4(),
      content,
      author: user,
      timestamp: new Date(),
      isBot: false,
      isImageGeneration: isGenerateCommand,
    };

    setMessages(prev => ({
      ...prev,
      [activeChannel]: [...(prev[activeChannel] || []), newMessage],
    }));

    if (activeChannel === 'talk-to-ai') {
      setIsAiResponding(true);
      try {
        const aiResponse = await sendMessageToAI(content);
        
        const imageUrlMatch = aiResponse.match(/https:\/\/files\.shapes\.inc\/[a-zA-Z0-9]+\.(png|jpg|jpeg|gif|webp)/);
        const imageUrl = imageUrlMatch ? imageUrlMatch[0] : undefined;
        
        const textContent = imageUrl ? aiResponse.replace(imageUrl, '').trim() : aiResponse;
        
        const aiMessage: Message = {
          id: uuidv4(),
          content: textContent || (imageUrl ? 'Generated image:' : aiResponse),
          author: {
            id: 'ai-bot',
            username: 'PropAI',
            discriminator: '0000',
            avatar: null,
          },
          timestamp: new Date(),
          isBot: true,
          imageUrl,
          isImageGeneration: isGenerateCommand,
        };

        setMessages(prev => ({
          ...prev,
          [activeChannel]: [...(prev[activeChannel] || []), aiMessage],
        }));
      } catch (error) {
        console.error('Failed to get AI response:', error);
      } finally {
        setIsAiResponding(false);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  const currentChannel = CHANNELS.find(c => c.id === activeChannel) || CHANNELS[0];
  const currentMessages = messages[activeChannel] || [];

  return (
    <div className="h-screen bg-gray-900 text-white flex">
      <Sidebar
        channels={CHANNELS}
        activeChannel={activeChannel}
        onChannelSelect={setActiveChannel}
        user={user}
      />
      <ChatArea
        channel={currentChannel}
        messages={currentMessages}
        isAiResponding={isAiResponding}
        onSendMessage={handleSendMessage}
        user={user}
      />
    </div>
  );
}

export default App;