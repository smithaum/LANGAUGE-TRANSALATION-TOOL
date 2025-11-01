// Simple free translation using MyMemory API (no key needed)
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

// Translation endpoint
app.post('/api/translate', async (req, res) => {
  const { text, source, target } = req.body;

  try {
    // MyMemory API: https://api.mymemory.translated.net/get?q=TEXT&langpair=en|hi
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${source}|${target}`;
    const response = await axios.get(url);

    const translatedText = response.data.responseData.translatedText;
    res.json({ translatedText });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Translation failed.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Free Translator running at http://localhost:${PORT}`));
