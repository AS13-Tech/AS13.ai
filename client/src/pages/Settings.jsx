import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

export default function Settings({ dark, setDark }) {
  return (
    <div className="flex flex-col h-screen bg-white dark:bg-black text-black dark:text-white">
      {/* Header */}
      <Header />

      <div className="flex flex-1 pt-16 overflow-hidden">
        {/* Sidebar */}
        <div className="w-full md:w-64 flex-shrink-0 border-r border-zinc-200 dark:border-zinc-800">
          <Sidebar dark={dark} setDark={setDark} />
        </div>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto px-6 py-8">
          <div className="max-w-xl mx-auto">
            <h1 className="text-3xl font-bold text-blue-500 mb-6">Settings</h1>

            <div className="bg-zinc-100 dark:bg-zinc-800 rounded-2xl shadow p-6 space-y-6">

              {/* API URL */}
              <div>
                <label className="block text-sm font-medium mb-1 text-zinc-600 dark:text-zinc-300">
                  API URL
                </label>
                <input
                  type="text"
                  value="http://localhost:5000/api"
                  readOnly
                  className="w-full p-3 rounded-lg bg-zinc-200 dark:bg-zinc-700 border border-zinc-300 dark:border-zinc-600 text-sm text-gray-500 cursor-not-allowed"
                />
              </div>

              {/* Username */}
              <div>
                <label className="block text-sm font-medium mb-1 text-zinc-600 dark:text-zinc-300">
                  Username
                </label>
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full p-3 rounded-lg bg-white dark:bg-zinc-700 text-black dark:text-white border border-zinc-300 dark:border-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium mb-1 text-zinc-600 dark:text-zinc-300">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full p-3 rounded-lg bg-white dark:bg-zinc-700 text-black dark:text-white border border-zinc-300 dark:border-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium mb-1 text-zinc-600 dark:text-zinc-300">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="********"
                  className="w-full p-3 rounded-lg bg-white dark:bg-zinc-700 text-black dark:text-white border border-zinc-300 dark:border-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Save Button */}
              <div className="pt-4 text-right">
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition font-medium"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
