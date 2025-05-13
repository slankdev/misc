"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const openai_1 = require("openai");
const args = process.argv.slice(2);
let proxyUrl = '';
let apiKey = '';
for (let i = 0; i < args.length; i++) {
    if (args[i] === '--proxy-url' && i + 1 < args.length) {
        proxyUrl = args[i + 1];
        i++;
    }
    else if (args[i] === '--api-key' && i + 1 < args.length) {
        apiKey = args[i + 1];
        i++;
    }
}
if (!apiKey) {
    console.error('Error: OpenAI API key is required. Use --api-key <your-api-key>');
    process.exit(1);
}
const app = (0, express_1.default)();
const PORT = 7000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
const openai = new openai_1.OpenAI({
    apiKey: apiKey,
    baseURL: proxyUrl || undefined,
});
app.post('/api/chat', (req, res) => {
    const handleChat = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { messages } = req.body;
            if (!messages || !Array.isArray(messages)) {
                return res.status(400).json({ error: 'Invalid request. Messages array is required.' });
            }
            const completion = yield openai.chat.completions.create({
                model: 'gpt-3.5-turbo',
                messages: messages,
            });
            res.json(completion);
        }
        catch (error) {
            console.error('Error calling OpenAI API:', error);
            res.status(500).json({
                error: 'Error processing your request',
                details: error instanceof Error ? error.message : String(error)
            });
        }
    });
    handleChat();
});
app.get('/', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, 'public', 'index.html'));
});
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Using OpenAI API Key: ${apiKey.substring(0, 3)}...${apiKey.substring(apiKey.length - 3)}`);
    if (proxyUrl) {
        console.log(`Using OpenAI Proxy URL: ${proxyUrl}`);
    }
});
//# sourceMappingURL=server.js.map