// src/components/ThemeToggle.jsx
import { useEffect } from 'react';

export default function ThemeToggle({ dark, setDark }) {
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={() => setDark(!dark)}
        className="bg-zinc-900 hover:bg-zinc-800 text-white dark:text-yellow-300 p-3 rounded-full shadow-lg transition-all duration-300 focus:outline-none"
        title={dark ? 'Light Mode' : 'Dark Mode'}
      >
        {dark ? '🌞' : '🌙'}
      </button>
    </div>
  );
}
