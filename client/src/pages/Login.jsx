import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import logoText from '../icons/logo-text.svg';
import googleIcon from '../icons/google.svg';
import microsoftIcon from '../icons/microsoft.svg';
import Header from '../components/Header';
import { Eye, EyeOff } from 'lucide-react';

export default function Login() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const passwordValid = (pwd) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{9,}$/;
    return regex.test(pwd);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (!passwordValid(password)) {
      setError(
        'Password must be at least 9 characters long and include uppercase, lowercase, number, and symbol.'
      );
      return;
    }

    try {
      const res = await fetch('http://localhost:5001/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.message || data.error || 'Login failed');
        return;
      }

      login(data);
      navigate('/chat');
    } catch (err) {
      setError('Login failed. Please try again.');
    }
  };

  const redirectToOAuth = (provider) => {
    window.location.href = `http://localhost:5001/auth/${provider}?state=login`;
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col items-center justify-center px-4">
      <Header />
      <div className="bg-zinc-900 p-8 rounded-lg shadow-md w-full max-w-md mt-20">
        <div className="flex justify-center mb-4">
          <img src={logoText} alt="AS13.ai" className="h-10" />
        </div>
        <h2 className="text-center text-2xl font-bold mb-6">Log in to your account</h2>

        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 rounded bg-zinc-800 border border-zinc-700 text-white"
          />

          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 rounded bg-zinc-800 border border-zinc-700 text-white pr-10"
              minLength={9}
              pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{9,}"
              title="Must be at least 9 characters, with uppercase, lowercase, number, and symbol."
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-400 hover:text-white"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded text-white font-semibold transition"
          >
            Log In
          </button>
        </form>

        <div className="flex flex-col gap-2 mt-4">
          <button
            onClick={() => redirectToOAuth('google')}
            className="flex items-center justify-center gap-3 w-full text-center bg-white text-black py-2 rounded-md hover:bg-gray-100 transition"
          >
            <img src={googleIcon} alt="Google" className="h-5" />
            Continue with Google
          </button>
          <button
            onClick={() => redirectToOAuth('microsoft')}
            className="flex items-center justify-center gap-3 w-full text-center bg-blue-700 text-white py-2 rounded-md hover:bg-blue-800 transition"
          >
            <img src={microsoftIcon} alt="Microsoft" className="h-5" />
            Continue with Microsoft
          </button>
        </div>

        <p className="text-center text-sm mt-4">
          Don’t have an account?{' '}
          <Link to="/signup" className="text-blue-400 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
