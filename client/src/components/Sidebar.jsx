import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Menu,
  X,
  Plus,
  LogOut,
  Settings,
  Sparkles,
  Sun,
  Moon,
} from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

export default function Sidebar({ dark, setDark }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleNewChat = () => {
    localStorage.removeItem('messages');
    sessionStorage.removeItem('visited');
    navigate('/chat');
    setIsOpen(false);
  };

  const handleLogout = () => {
    logout();
    alert('You have logged out.');
    navigate('/login');
    setIsOpen(false);
  };

  const goToSettings = () => {
    navigate('/settings');
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={toggleSidebar}
          className="bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 p-2 rounded-lg shadow-md text-black dark:text-white"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed md:static
        top-0 left-0
        h-full md:h-screen w-64
        bg-white dark:bg-zinc-900 
        border-r border-zinc-200 dark:border-zinc-800 
        z-50 md:z-auto
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 md:block
        p-3 md:p-4
        overflow-hidden
      `}
      >
        <div className="h-full flex flex-col p-3 overflow-hidden">
          {/* New Chat */}
          <button
            onClick={handleNewChat}
            className="flex items-center gap-2 px-3 py-2 mb-3 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-lg text-sm font-medium transition"
          >
            <Plus className="w-4 h-4" />
            New Chat
          </button>

          {/* Chat History */}
          <div className="mb-3 flex-1 overflow-hidden">
            <p className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 mb-2">
              Recent
            </p>
            <div className="space-y-2">
              {[...Array(1)].map((_, idx) => (
                <div
                  key={idx}
                  className="px-3 py-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-sm cursor-pointer transition"
                >
                  Chat session {idx + 1}
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="space-y-2 border-t border-zinc-200 dark:border-zinc-800 pt-3">
            <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition text-sm">
              <Sparkles className="w-4 h-4 text-yellow-400" />
              Upgrade to Pro
            </button>

            <button
              onClick={goToSettings}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition text-sm"
            >
              <Settings className="w-4 h-4" />
              Settings
            </button>

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-3 py-2 text-red-500 hover:bg-red-100 dark:hover:bg-red-950 rounded-lg transition text-sm"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>

            <button
              onClick={() => setDark(!dark)}
              className="w-full flex items-center gap-2 px-3 py-2 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-lg transition text-sm"
            >
              {dark ? (
                <>
                  <Sun className="w-4 h-4 text-yellow-400" />
                  Light Mode
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4" />
                  Dark Mode
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
