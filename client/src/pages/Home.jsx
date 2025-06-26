import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">
      {/* Header */}
      <header className="w-full p-4 border-b border-gray-800 text-center text-2xl font-bold text-blue-500">
        AS13.ai
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 text-center">
        <h1 className="text-4xl font-extrabold mb-6">Welcome to AS13.ai</h1>
        <p className="text-gray-400 text-lg mb-10">Your intelligent assistant, powered by AI.</p>

        <div className="space-x-4">
          <Link
            to="/login"
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-md text-white font-semibold"
          >
            Log In
          </Link>
          <Link
            to="/signup"
            className="bg-gray-800 hover:bg-gray-700 px-6 py-3 rounded-md text-white font-semibold border border-gray-600"
          >
            Sign Up
          </Link>
        </div>
      </main>
    </div>
  );
}
