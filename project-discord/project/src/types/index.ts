export interface User {
  id: string;
  username: string;
  discriminator: string;
  avatar: string | null;
  email?: string;
}

export interface Message {
  id: string;
  content: string;
  author: User;
  timestamp: Date;
  isBot?: boolean;
  imageUrl?: string;
  isImageGeneration?: boolean;
}

export interface Channel {
  id: string;
  name: string;
  type: 'text' | 'voice';
  category?: string;
}