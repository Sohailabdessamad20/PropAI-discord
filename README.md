# PropAI Discord

A modern Discord-inspired chat application with real-time messaging and bot integration.

## Features

- **Channel-based Chat** - Organized channels with category groupings
- **Bot Integration** - Interactive bot responses with image generation
- **Multiple Auth Options** - Discord OAuth or quick username login  
- **Real-time Messaging** - Instant message delivery with typing indicators
- **Image Generation** - Create images using `/generate [prompt]` commands
- **Responsive Design** - Works on desktop and mobile devices

## Quick Start

```bash
# Clone the repository
git clone https://github.com/PropAI-discord/propai-discord.git
cd propai-discord

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Usage

### Authentication
- **Discord Login** - Connect with your Discord account
- **Fast Login** - Enter a username and start chatting immediately

### Channels
Navigate between organized channels:

**Information Channels**
- rules, announcements, giveaways, updates, partnership, reaction-roles

**Community Channels** 
- chat, talk-to-ai, activity, levels

### Bot Commands
In the `talk-to-ai` channel:
- Chat normally for conversation with ai
- Use `/generate [prompt]` to create images

## Tech Stack

- React 18 + TypeScript
- Tailwind CSS
- Vite
- Lucide React Icons


## Project Structure

```
src/
├── components/     
├── services/      
├── types/          
└── App.tsx        
```

