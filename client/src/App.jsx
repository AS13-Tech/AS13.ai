import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AuthProvider } from './context/AuthContext';

import Chat from './components/Chat';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProtectedRoute from './components/ProtectedRoute';
import Settings from './pages/Settings';

function App() {
  const [dark, setDark] = useState(() => {
    const stored = localStorage.getItem('theme');
    return stored ? stored === 'dark' : true;
  });

  useEffect(() => {
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }, [dark]);

  return (
    <AuthProvider>
      <Router>
        <AppContent dark={dark} setDark={setDark} />
      </Router>
    </AuthProvider>
  );
}

function AppContent({ dark, setDark }) {
  const location = useLocation();
  const isAuthPage =
    location.pathname === '/' ||
    location.pathname === '/login' ||
    location.pathname === '/signup';

  // Apply dark theme only if not on login/signup
  useEffect(() => {
    if (!isAuthPage) {
      document.documentElement.classList.toggle('dark', dark);
    } else {
      document.documentElement.classList.add('dark'); // force dark on login/signup
    }
  }, [dark, isAuthPage]);

  return (
    <div className="flex w-full min-h-screen">
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/settings"
            element={<Settings dark={dark} setDark={setDark} />}
          />
          <Route
            path="/chat"
            element={
              <ProtectedRoute>
                <Chat dark={dark} setDark={setDark} />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
