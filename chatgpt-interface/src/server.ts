import express from 'express';
import cors from 'cors';
import path from 'path';
import { OpenAI } from 'openai';

const args = process.argv.slice(2);
let proxyUrl = '';
let apiKey = '';

for (let i = 0; i < args.length; i++) {
  if (args[i] === '--proxy-url' && i + 1 < args.length) {
    proxyUrl = args[i + 1];
    i++;
  } else if (args[i] === '--api-key' && i + 1 < args.length) {
    apiKey = args[i + 1];
    i++;
  }
}

if (!apiKey) {
  console.error('Error: OpenAI API key is required. Use --api-key <your-api-key>');
  process.exit(1);
}

const app = express();
const PORT = 7000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const openai = new OpenAI({
  apiKey: apiKey,
  baseURL: proxyUrl || undefined,
});

app.post('/api/chat', (req, res) => {
  const handleChat = async () => {
    try {
      const { messages } = req.body;
      
      if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: 'Invalid request. Messages array is required.' });
      }

      const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: messages as any,
      });

      res.json(completion);
    } catch (error) {
      console.error('Error calling OpenAI API:', error);
      res.status(500).json({ 
        error: 'Error processing your request',
        details: error instanceof Error ? error.message : String(error)
      });
    }
  };
  
  handleChat();
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Using OpenAI API Key: ${apiKey.substring(0, 3)}...${apiKey.substring(apiKey.length - 3)}`);
  if (proxyUrl) {
    console.log(`Using OpenAI Proxy URL: ${proxyUrl}`);
  }
});
