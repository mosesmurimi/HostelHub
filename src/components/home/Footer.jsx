import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaHeart,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white mt-20">

      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-4 gap-10">

        {/* Brand */}

        <div>

          <h2 className="text-3xl font-bold text-green-400">
            HostelHub
          </h2>

          <p className="text-gray-400 mt-5 leading-7">

            Helping university students discover safe,
            affordable and verified hostels across Kenya.

          </p>

        </div>

        {/* Quick Links */}

        <div>

          <h3 className="font-bold text-xl mb-5">
            Quick Links
          </h3>

          <ul className="space-y-3 text-gray-400">

            <li className="hover:text-white cursor-pointer">Home</li>

            <li className="hover:text-white cursor-pointer">Hostels</li>

            <li className="hover:text-white cursor-pointer">Universities</li>

            <li className="hover:text-white cursor-pointer">Become a Partner</li>

          </ul>

        </div>

        {/* Contact */}

        <div>

          <h3 className="font-bold text-xl mb-5">

            Contact

          </h3>

          <div className="space-y-4 text-gray-400">

            <p className="flex gap-3 items-center">

              <FaEnvelope />

              support@hostelhub.co.ke

            </p>

          </div>

        </div>

        {/* Socials */}

        <div>

          <h3 className="font-bold text-xl mb-5">

            Follow Us

          </h3>

          <div className="flex gap-5 text-2xl">

            <FaGithub className="hover:text-green-400 cursor-pointer transition"/>

            <FaLinkedin className="hover:text-green-400 cursor-pointer transition"/>

          </div>

        </div>

      </div>

      <div className="border-t border-slate-700 py-6">

        <p className="text-center text-gray-400">

          Built with <FaHeart className="inline text-red-500"/> by Moses Murimi <br/>
          © 2026 HostelHub. Empowering students to find safe, affordable accommodation.

        </p>

      </div>

    </footer>
  );
};

export default Footer;