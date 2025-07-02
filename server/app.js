const express = require('express');
const passport = require('passport');

const router = express.Router();

// --- Google ---
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    const redirectPath = req.user.role === 'admin' ? '/admin' : '/chat';
    res.redirect(redirectPath);
  }
);

// --- Microsoft ---
router.get('/microsoft', passport.authenticate('microsoft'));
router.get('/microsoft/callback', passport.authenticate('microsoft', { failureRedirect: '/login' }),
  (req, res) => {
    const redirectPath = req.user.role === 'admin' ? '/admin' : '/chat';
    res.redirect(redirectPath);
  }
);

// --- Logout ---
router.get('/logout', (req, res) => {
  req.logout(err => {
    if (err) return res.status(500).send('Logout error');
    res.clearCookie('connect.sid');
    res.redirect('/login');
  });
});

module.exports = router;
