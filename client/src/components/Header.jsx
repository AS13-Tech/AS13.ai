import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import logo from '../icons/logo.svg';

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  const [dark, setDark] = useState(() => {
    const stored = localStorage.getItem('theme');
    return stored ? stored === 'dark' : true;
  });

  useEffect(() => {
    const forceDark = isAuthPage || dark;
    if (forceDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    if (!isAuthPage) {
      localStorage.setItem('theme', dark ? 'dark' : 'light');
    }
  }, [dark, isAuthPage]);

  const handleLogoClick = () => {
    localStorage.removeItem('messages');
    sessionStorage.removeItem('visited');
    navigate('/chat');
  };

  return (
    <header className="bg-white dark:bg-zinc-900 text-black dark:text-white p-4 shadow-md fixed top-0 w-full z-40 transition-colors duration-300">
      <div className="flex items-center gap-3 ml-9">
        <button
          onClick={handleLogoClick}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <img src={logo} alt="AS13.ai Logo" className="h-8 w-auto" />
          <span className="text-xl font-bold text-blue-500">AS13.ai</span>
        </button>
      </div>
    </header>
  );
}  