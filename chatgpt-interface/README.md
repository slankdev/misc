# ChatGPT-like Interface

A TypeScript web application that provides a chat interface similar to ChatGPT's UI, connecting to the OpenAI Chat Completion API.

## Features

- Web-based chat interface with a clean, responsive design
- Backend server built with Express and TypeScript
- Integration with OpenAI Chat Completion API
- Support for custom OpenAI proxy URL
- Real-time chat with typing indicators
- Markdown-like formatting support in messages

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/slankdev/misc.git
   cd misc/chatgpt-interface
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Build the application:
   ```
   npm run build
   ```

## Usage

Run the application with your OpenAI API key:

```
node dist/server.js --api-key YOUR_OPENAI_API_KEY
```

If you want to use a custom OpenAI proxy URL:

```
node dist/server.js --api-key YOUR_OPENAI_API_KEY --proxy-url YOUR_PROXY_URL
```

Then open your browser and navigate to:

```
http://localhost:7000
```

## Development

To run the application in development mode with hot reloading:

```
npm run dev
```

## Project Structure

- `src/server.ts` - Express server and API endpoints
- `src/public/index.html` - HTML structure for the chat interface
- `src/public/styles.css` - CSS styling for the chat interface
- `src/public/script.js` - Client-side JavaScript for the chat interface

## License

ISC
