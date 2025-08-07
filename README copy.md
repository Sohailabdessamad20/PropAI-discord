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
git clone https://github.com/yourusername/propai-discord.git
cd propai-discord

# Install dependencies
npm install

# Setup environment variables
cp .env .env.local
# Edit .env.local with your API keys (see Environment Setup below)

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Environment Setup

Create a `.env.local` file in the root directory with the following variables:

```env
VITE_SHAPES_API_KEY=your_shapes_api_key_here
VITE_DISCORD_CLIENT_ID=your_discord_client_id_here
VITE_DISCORD_REDIRECT_URI=your_redirect_uri_here
```

### Getting Your Shapes API Key
1. Go to [shapes.inc/developer](https://shapes.inc/developer)
2. Sign up or log in to your account
3. Generate a new API key
4. In the Application option, select the AI model you want to use
5. Copy the generated API key to your `.env.local` file

### Discord OAuth Setup (Optional)
1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Create a new application
3. Get your Client ID from the OAuth2 section
4. Set your redirect URI (e.g., `http://localhost:5173` for local development)

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

