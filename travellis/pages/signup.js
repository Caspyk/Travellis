import { useState } from "react";
import { auth } from "../lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/router";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push("/dashboard");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Sign Up</h1>
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="block mb-2 p-2 border" />
      <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" className="block mb-2 p-2 border" />
      <button onClick={handleSignup} className="bg-green-500 text-white px-4 py-2">Sign Up</button>
    </div>
  );
}
