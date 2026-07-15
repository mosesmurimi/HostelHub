import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { registerUser } from "../services/auth";
import { useState } from "react";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");

  const handleSubmit = async (e) => {

  e.preventDefault();
  console.log("Form Submitted");

  try {
    const userCredential = await registerUser(email, password);

    const user = userCredential.user;

    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      name,
      email,
      role,
      createdAt: serverTimestamp(),
    });

    alert("Account Created Successfully!");

  } catch (error) {
    alert(error.message);
  }
};

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">

      <div className="bg-white rounded-3xl shadow-xl p-10 w-full max-w-md">

        <h1 className="text-4xl font-bold text-center mb-2">
          Create Account
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Join HostelHub today
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            type="text"
            placeholder="Full Name"
            className="w-full border rounded-xl p-4"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

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

          <div>

  <label className="font-semibold text-gray-700">

    I am a

  </label>

  <div className="flex gap-4 mt-3">

    <label className="flex items-center gap-2">

      <input
        type="radio"
        value="student"
        checked={role === "student"}
        onChange={(e) => setRole(e.target.value)}
      />

      Student

    </label>

    <label className="flex items-center gap-2">

      <input
        type="radio"
        value="landlord"
        checked={role === "landlord"}
        onChange={(e) => setRole(e.target.value)}
      />

      Landlord

    </label>

  </div>

</div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-bold transition"
          >
            Create Account
          </button>

        </form>

      </div>

    </div>
  );
};

export default Register;