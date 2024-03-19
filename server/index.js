import express from 'express';
import OpenAI from 'openai';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Serve static files from the React app build directory
app.use(express.static(path.join(__dirname, '../../translator-chat/build')));

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post('/translate', async (req, res) => {
  const { text, targetLanguage } = req.body;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content:
            'You are an assistant that provides translations. When given a sentence and a target language, respond with only the translated text.',
        },
        {
          role: 'user',
          content: `Translate '${text}' to ${targetLanguage}.`,
        },
      ],
      temperature: 0,
    });

    res.json({ translation: completion.choices[0].message.content });
  } catch (error) {
    console.error('Error translating text:', error);
    res.status(500).send('Error processing translation request');
  }
});

// All other GET requests not handled before will return the React app
app.get('*', (req, res) => {
  res.sendFile(
    path.join(__dirname, '../../translator-chat/build', 'index.html')
  );
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
