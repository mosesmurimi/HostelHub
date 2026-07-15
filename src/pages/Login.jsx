import { Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginUser } from "../services/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    // Login with Firebase Authentication
    const userCredential = await loginUser(email, password);

    const user = userCredential.user;

    // Read the user's Firestore document
    const userDoc = await getDoc(doc(db, "users", user.uid));

    if (!userDoc.exists()) {
      alert("User profile not found.");
      return;
    }

    const userData = userDoc.data();

    // Redirect based on role
    if (userData.role === "student") {
      navigate("/dashboard");
    } else if (userData.role === "landlord") {
      navigate("/landlord-dashboard");
    } else {
      alert("Unknown user role.");
    }

  } catch (error) {
    alert(error.message);
  }
};

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">

      <div className="bg-white shadow-xl rounded-3xl p-10 w-full max-w-md">

        <h1 className="text-4xl font-bold text-center mb-2">
          Welcome Back
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Login to HostelHub
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <input
            type="email"
            placeholder="Email Address"
            className="w-full border rounded-xl p-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border rounded-xl p-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-bold transition"
          >
            Login
          </button>

          <div className="text-center mt-6">
  <p className="text-gray-600">
    Don't have an account?{" "}
    <Link
      to="/register"
      className="text-green-600 font-semibold hover:underline"
    >
      Create Account
    </Link>
  </p>
</div>

        </form>

      </div>

    </div>
  );
};

export default Login;