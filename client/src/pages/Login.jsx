import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { AuthContext } from '../context/AuthContext';
import logo from '../icons/logo-text.svg';

export default function Login() {
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.email.trim() || !form.password.trim()) {
      setError('Please fill in both email and password.');
      return;
    }

    setError('');
    login({ email: form.email });
    alert('Login successful!');
    navigate('/chat');
  };

  return (
    <>
      <Header />
      <main className="min-h-screen flex items-center justify-center px-4 bg-gray-950">
        <div className="w-full max-w-md">
          <div className="bg-black/30 backdrop-blur-md shadow-2xl rounded-3xl px-8 py-14 sm:px-10 border border-gray-700">
            <div className="text-center mb-10">
              <img src={logo} alt="AS13.ai Logo" className="mx-auto h-10 w-auto" />
              <h2 className="mt-4 text-3xl font-bold text-white">Sign in to AS13.ai</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <p className="text-red-400 text-sm text-center">{error}</p>
              )}
              <input
                type="email"
                placeholder="you@example.com"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-gray-900 text-white placeholder-gray-400 border border-gray-700 focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="password"
                placeholder="••••••••"
                required
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-gray-900 text-white placeholder-gray-400 border border-gray-700 focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-xl text-white font-medium"
              >
                Login
              </button>
            </form>

            <p className="mt-8 text-center text-sm text-gray-400">
              Don’t have an account?{' '}
              <a href="/signup" className="text-blue-500 hover:text-blue-400">Sign up</a>
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
