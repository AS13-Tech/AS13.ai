const express = require('express');
const passport = require('passport');
const router = express.Router();

// --- Google Login with forced re-auth ---
router.get('/google', (req, res, next) => {
  const state = req.query.state || 'login';
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    state,
    prompt: 'select_account consent' // ⬅ forces Google to show account selection every time
  })(req, res, next);
});

router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: 'http://localhost:3000/login',
    session: true
  }),
  (req, res) => {
    res.redirect('http://localhost:3000/chat');
  }
);

// --- Microsoft Login with forced re-auth ---
router.get('/microsoft', (req, res, next) => {
  const state = req.query.state || 'login';
  const authOptions = {
    state,
    prompt: 'select_account' // ⬅ force Microsoft re-login
  };
  passport.authenticate('microsoft', authOptions)(req, res, next);
});

router.get(
  '/microsoft/callback',
  passport.authenticate('microsoft', {
    failureRedirect: 'http://localhost:3000/login',
    session: true
  }),
  (req, res) => {
    res.redirect('http://localhost:3000/chat');
  }
);

// --- Logout Route ---
router.get('/logout', (req, res) => {
  req.logout(err => {
    if (err) return res.status(500).send('Logout error');
    req.session.destroy(() => {
      res.clearCookie('connect.sid', {
        path: '/',
        httpOnly: true,
        sameSite: 'lax',
        secure: false
      });
      res.send({ message: 'Logged out' });
    });
  });
});

module.exports = router;
