import { FaWhatsapp, FaShieldAlt, FaInfoCircle } from "react-icons/fa";

const Settings = () => {
  return (
    <div className="min-h-screen bg-slate-100">

      {/* Header */}

      <div className="bg-green-600 text-white py-12">

        <div className="max-w-5xl mx-auto px-6">

          <h1 className="text-5xl font-bold">
            Settings
          </h1>

          <p className="mt-3 text-green-100">
            Help, privacy and application information.
          </p>

        </div>

      </div>

      <div className="max-w-5xl mx-auto px-6 py-10 space-y-8">

        {/* Support */}

        <div className="bg-white rounded-3xl shadow-lg p-8">

          <div className="flex items-center gap-4 mb-6">

            <FaWhatsapp className="text-3xl text-green-600" />

            <h2 className="text-2xl font-bold">

              Support

            </h2>

          </div>

          <p className="text-gray-600">

            Need help using HostelHub?

          </p>

          <p className="mt-3">

            📧 support@hostelhub.co.ke

          </p>

          <p>

            📱 +254 781 125 439

          </p>

        </div>

        {/* Privacy */}

        <div className="bg-white rounded-3xl shadow-lg p-8">

          <div className="flex items-center gap-4 mb-6">

            <FaShieldAlt className="text-3xl text-blue-600" />

            <h2 className="text-2xl font-bold">

              Privacy Policy

            </h2>

          </div>

          <p className="text-gray-600">

            HostelHub only stores information required to help students
            discover and book hostels. Your personal information is never
            shared with third parties without your permission.

          </p>

        </div>

        {/* About */}

        <div className="bg-white rounded-3xl shadow-lg p-8">

          <div className="flex items-center gap-4 mb-6">

            <FaInfoCircle className="text-3xl text-purple-600" />

            <h2 className="text-2xl font-bold">

              About HostelHub

            </h2>

          </div>

          <p>

            <strong>Version:</strong> 1.0

          </p>

          <p className="mt-3 text-gray-600">

            HostelHub helps university students discover, compare and book
            verified hostels near their campuses.

          </p>

          <p className="mt-5 text-gray-500 text-sm">

            © 2026 HostelHub. All Rights Reserved.

          </p>

        </div>

      </div>

    </div>
  );
};

export default Settings;