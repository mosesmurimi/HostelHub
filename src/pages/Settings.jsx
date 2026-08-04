import { useState } from "react";

const Settings = () => {

  const [notifications, setNotifications] = useState(true);

  return (

    <div className="min-h-screen bg-slate-100">

      <div className="bg-green-600 text-white py-12">

        <div className="max-w-5xl mx-auto px-6">

          <h1 className="text-5xl font-bold">
            Settings
          </h1>

          <p className="mt-3 text-green-100">
            Manage your account preferences.
          </p>

        </div>

      </div>

      <div className="max-w-5xl mx-auto p-6 space-y-8">

        <div className="bg-white rounded-3xl shadow-lg p-8">

          <h2 className="text-2xl font-bold mb-6">

            Notifications

          </h2>

          <div className="flex justify-between items-center">

            <span>Email Notifications</span>

            <input
              type="checkbox"
              checked={notifications}
              onChange={() =>
                setNotifications(!notifications)
              }
              className="w-5 h-5"
            />

          </div>

        </div>

        <div className="bg-white rounded-3xl shadow-lg p-8">

          <h2 className="text-2xl font-bold mb-6">

            Account

          </h2>

          <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl">

            Delete Account

          </button>

        </div>

      </div>

    </div>

  );

};

export default Settings;