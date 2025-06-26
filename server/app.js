const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

const users = [];

app.post('/api/signup', (req, res) => {
  const { email, password } = req.body;
  if (users.find(u => u.email === email)) return res.status(400).json({ error: 'User exists' });
  users.push({ email, password });
  res.json({ email });
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  res.json({ email });
});

app.post('/api/chat', (req, res) => {
  const { message } = req.body;
  const reply = `**You said:** ${message}

Here's a _Markdown_ reply with a list:

- Point 1
- Point 2
- Point 3`;
  res.json({ reply });
});

module.exports = app;