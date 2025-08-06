
const DISCORD_CLIENT_ID = import.meta.env.VITE_DISCORD_CLIENT_ID;
const DISCORD_REDIRECT_URI = import.meta.env.VITE_DISCORD_REDIRECT_URI;

export const initiateDiscordLogin = () => {
  const params = new URLSearchParams({
    client_id: DISCORD_CLIENT_ID,
    redirect_uri: DISCORD_REDIRECT_URI,
    response_type: 'code',
    scope: 'identify email guilds guilds.join',
  });

  window.location.href = `https://discord.com/api/oauth2/authorize?${params}`;
};

export const handleDiscordCallback = async (code: string) => {
  try {
    const mockUser = {
      id: '123456789',
      username: 'DemoUser',
      discriminator: '0001',
      avatar: null,
      email: 'demo@example.com',
    };

    localStorage.setItem('discord_user', JSON.stringify(mockUser));
    return mockUser;
  } catch (error) {
    console.error('Discord authentication failed:', error);
    throw error;
  }
};

export const getStoredUser = () => {
  const stored = localStorage.getItem('discord_user');
  return stored ? JSON.parse(stored) : null;
};

export const fastLogin = (username: string) => {
  const fastUser = {
    id: `fast_${Date.now()}`,
    username: username,
    discriminator: '0000',
    avatar: null,
    email: null,
  };

  localStorage.setItem('discord_user', JSON.stringify(fastUser));
  return fastUser;
};

export const logout = () => {
  localStorage.removeItem('discord_user');
};