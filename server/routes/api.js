// routes/api.js
const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const router = express.Router();

// 🔐 Signup (local)
router.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  try {
    if (await User.findOne({ email })) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashed = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      email,
      password: hashed,
      provider: 'local',
    });

    req.login(newUser, (err) => {
      if (err) return res.status(500).json({ message: 'Login after signup failed' });
      res.status(201).json({ email: newUser.email, role: newUser.role });
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 🔑 Login (local)
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || user.provider !== 'local') {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

    req.login(user, (err) => {
      if (err) return res.status(500).json({ error: 'Login failed' });
      res.json({ email: user.email, role: user.role });
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 👤 Session Check
router.get('/me', (req, res) => {
  if (req.isAuthenticated()) {
    const { email, role } = req.user;
    res.json({ email, role });
  } else {
    res.status(401).json({ error: 'Not authenticated' });
  }
});

module.exports = router;
