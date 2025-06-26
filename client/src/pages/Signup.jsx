import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import logo from '../icons/logo-text.svg';

export default function Signup() {
  const [form, setForm] = useState({ email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const { email, password, confirmPassword } = form;

    if (!email.trim() || !password.trim() || !confirmPassword.trim()) {
      setError('All fields are required.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setError('');
    alert('Signup Successful!');
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
              <h2 className="mt-4 text-3xl font-bold text-white">Create your account</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && <p className="text-sm text-red-500 text-center">{error}</p>}
              <input
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-gray-900 text-white placeholder-gray-400 border border-gray-700 focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-gray-900 text-white placeholder-gray-400 border border-gray-700 focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="password"
                placeholder="Confirm Password"
                value={form.confirmPassword}
                onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-gray-900 text-white placeholder-gray-400 border border-gray-700 focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-xl text-white font-medium"
              >
                Sign up
              </button>
            </form>

            <p className="mt-8 text-center text-sm text-gray-400">
              Already have an account?{' '}
              <a href="/login" className="text-blue-500 hover:text-blue-400">Log in</a>
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
