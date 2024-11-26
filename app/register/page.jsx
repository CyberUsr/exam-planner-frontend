"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "../services/loginService";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await registerUser(email, password);
      const { message, user } = response; // Access assigned role from user

      setSuccessMessage(
        `${message}. Your role is ${user.role}. Redirecting to login...`
      );
      setErrorMessage("");

      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Registration failed");
      setSuccessMessage("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 sm:p-8">
        <header className="text-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-semibold">Register</h1>
        </header>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium mb-2 text-gray-800 dark:text-gray-100"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 border rounded-lg"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-2 text-gray-800 dark:text-gray-100"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 border rounded-lg"
            />
          </div>

          {errorMessage && (
            <p className="text-red-500 text-sm text-center">{errorMessage}</p>
          )}
          {successMessage && (
            <p className="text-green-500 text-sm text-center">
              {successMessage}
            </p>
          )}

          <button
            type="submit"
            className="px-8 py-3 bg-blue-600 text-white rounded-lg shadow-md"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
