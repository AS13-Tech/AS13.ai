import { useState, useEffect, useRef } from 'react';
import { marked } from 'marked';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';

export default function Chat({ dark, setDark }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [initializing, setInitializing] = useState(true);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const applyTheme = () => {
      const isDark = localStorage.getItem('theme') === 'dark';
      document.documentElement.classList.toggle('dark', isDark);
    };
    applyTheme();
    window.addEventListener('storage', applyTheme);
    return () => window.removeEventListener('storage', applyTheme);
  }, []);

  useEffect(() => {
    const isReload = !sessionStorage.getItem('visited');
    sessionStorage.setItem('visited', 'true');

    if (isReload) {
      localStorage.removeItem('messages');
      setMessages([]);
    } else {
      const saved = localStorage.getItem('messages');
      if (saved) setMessages(JSON.parse(saved));
    }

    setInitializing(false);
  }, []);

  useEffect(() => {
    localStorage.setItem('messages', JSON.stringify(messages));
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (messageText) => {
    const text = typeof messageText === 'string' ? messageText : input;
    if (!text.trim()) return;

    setMessages((prev) => [...prev, { role: 'user', text }]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      });

      const data = await res.json();
      setMessages((prev) => [...prev, { role: 'ai', text: data.reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'ai', text: '⚠️ Something went wrong. Please try again.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const suggestedPrompts = [
    'Build a todo app in React using Tailwind',
    'Build a simple blog using Astro',
    'Create a dark/light theme toggle in React',
    'Write a REST API using Node.js',
  ];

  if (initializing) return null;

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors duration-300">
      {/* Top Header */}
      <Header />

      {/* Sidebar below Header (mobile = top, desktop = left) */}
      <div className="flex flex-col md:flex-row flex-1">
        <Sidebar dark={dark} setDark={setDark} />

        {/* Chat Area */}
        <div className="flex-1 px-4 sm:px-8 pt-4 md:pt-6">
          <div className="max-w-3xl mx-auto w-full">
            {/* Empty chat */}
            {messages.length === 0 ? (
              <div className="text-center max-w-xl mx-auto py-16 sm:py-24">
                <h1 className="text-4xl font-extrabold mb-2">
                  Where <span className="text-blue-400">ideas</span> begin
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm sm:text-base">
                  Bring ideas to life in seconds or get help with your projects.
                </p>

                <div className="relative">
                  <textarea
                    ref={inputRef}
                    rows={3}
                    placeholder="How can AS13 help you today?"
                    className="w-full p-4 pr-14 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-blue-600 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 resize-none"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        sendMessage();
                      }
                    }}
                  />
                  <button
                    onClick={sendMessage}
                    disabled={!input.trim()}
                    className="absolute top-2.5 right-2.5 w-10 h-10 bg-blue-600 hover:bg-blue-700 disabled:bg-zinc-700 rounded-lg flex items-center justify-center transition shadow"
                    title="Send"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 4l16 8-16 8V4z" />
                    </svg>
                  </button>
                </div>

                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {suggestedPrompts.map((prompt, index) => (
                    <button
                      key={index}
                      onClick={() => sendMessage(prompt)}
                      className="text-left px-5 py-4 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition text-sm sm:text-base font-medium"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`p-4 rounded-xl text-sm sm:text-base whitespace-pre-wrap ${
                      msg.role === 'user'
                        ? 'bg-blue-100 text-black'
                        : 'bg-zinc-800 text-white'
                    }`}
                    dangerouslySetInnerHTML={{ __html: marked.parse(msg.text) }}
                  />
                ))}
                {loading && (
                  <div className="p-4 rounded-xl bg-zinc-800 text-white text-sm italic animate-pulse">
                    AS13 is typing...
                  </div>
                )}
                <div ref={bottomRef} />
              </div>
            )}
          </div>

          {/* Input Area at Bottom */}
          {messages.length > 0 && (
            <div className="py-6 px-4 bg-white dark:bg-black transition-colors">
              <div className="max-w-2xl mx-auto relative">
                <textarea
                  ref={inputRef}
                  rows={2}
                  placeholder="Ask anything..."
                  className="w-full p-4 pr-14 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage();
                    }
                  }}
                />
                <button
                  onClick={sendMessage}
                  disabled={!input.trim()}
                  className="absolute top-3 right-2 w-12 h-12 bg-blue-600 hover:bg-blue-700 disabled:bg-zinc-700 rounded-lg flex items-center justify-center transition shadow"
                  title="Send"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4l16 8-16 8V4z" />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
