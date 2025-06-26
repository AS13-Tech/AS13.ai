import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';

export default function Settings() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-900 text-black dark:text-white transition-colors duration-300">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 sm:px-8 pt-24 pb-12">
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-6 text-blue-500">
          Settings
        </h1>

        <div className="bg-zinc-100 dark:bg-zinc-800 p-6 rounded-xl shadow space-y-6">
          {/* Profile Settings */}
          <section>
            <h2 className="text-xl font-semibold mb-2">Profile</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Manage your user information.
            </p>
            <div className="mt-4 space-y-2">
              <input
                type="text"
                placeholder="Your name"
                className="w-full p-3 rounded-lg bg-white dark:bg-zinc-700 text-black dark:text-white border border-zinc-300 dark:border-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="email"
                placeholder="Email address"
                className="w-full p-3 rounded-lg bg-white dark:bg-zinc-700 text-black dark:text-white border border-zinc-300 dark:border-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </section>

          {/* Preferences */}
          <section>
            <h2 className="text-xl font-semibold mb-2">Preferences</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Customize your experience. (Coming soon!)
            </p>
          </section>

          {/* Actions */}
          <div className="pt-4 flex justify-end">
            <button
              onClick={() => navigate(-1)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition font-medium"
            >
              ← Back
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
