import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    try {
      const resp = await signInWithEmailAndPassword(auth, email, password);
      toast.success("Logged in successfully!");

      navigate("/dashboard");
      return resp.user.uid;
    } catch (e) {
      toast.error((e as Error).message);
    }
  }
  return (
    <div className="mt-9">
      <h1 className="text-5xl font-extrabold dark:text-white text-center">
        Log In
        <small className="ms-2 font-semibold text-gray-500 dark:text-gray-400 block text-center">
          Enter to your account
        </small>
      </h1>
      <div className="mt-9">
        <form
          onSubmit={handleLogin}
          className="p-6 max-w-sm mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md space-y-4"
        >
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 p-2 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-300"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 p-2 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-300"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 dark:bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-600 dark:hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 dark:focus:ring-offset-gray-800"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
