const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const MicrosoftStrategy = require('passport-microsoft').Strategy;
const User = require('../models/User');

// 🔐 Serialize user to session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// 🔐 Deserialize user from session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

// 🌐 Google Strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: 'http://localhost:5001/auth/google/callback',
  passReqToCallback: true
}, async (req, accessToken, refreshToken, profile, done) => {
  try {
    const email = profile.emails[0].value;
    const state = req.query.state;

    let user = await User.findOne({ email });
    if (!user && state === 'signup') {
      user = await User.create({ email, provider: 'google' });
    } else if (!user && state === 'login') {
      return done(null, false, { message: 'Account not found. Please sign up.' });
    }

    return done(null, user);
  } catch (err) {
    return done(err, null);
  }
}));

// 💼 Microsoft Strategy
passport.use(new MicrosoftStrategy({
  clientID: process.env.MICROSOFT_CLIENT_ID,
  clientSecret: process.env.MICROSOFT_CLIENT_SECRET,
  callbackURL: 'http://localhost:5001/auth/microsoft/callback',
  tenant: process.env.MICROSOFT_TENANT_ID,
  scope: ['user.read'],
  passReqToCallback: true
}, async (req, accessToken, refreshToken, profile, done) => {
  try {
    const email = profile.emails[0].value;
    const state = req.query.state;

    let user = await User.findOne({ email });
    if (!user && state === 'signup') {
      user = await User.create({ email, provider: 'microsoft' });
    } else if (!user && state === 'login') {
      return done(null, false, { message: 'Account not found. Please sign up.' });
    }

    return done(null, user);
  } catch (err) {
    return done(err, null);
  }
}));
