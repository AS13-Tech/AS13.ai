// App.js
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
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
  const isAuthPage = /^\/(login|signup)?$/.test(location.pathname);

  useEffect(() => {
    const el = document.documentElement;
    if (isAuthPage) {
      el.classList.add('dark');
    } else {
      dark ? el.classList.add('dark') : el.classList.remove('dark');
    }
  }, [dark, isAuthPage]);

  return (
    <div className="flex w-full min-h-screen">
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/settings" element={<Settings dark={dark} setDark={setDark} />} />
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
