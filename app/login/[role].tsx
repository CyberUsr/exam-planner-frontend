/* eslint-disable @typescript-eslint/no-unused-vars */

import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function RoleBasedLoginPage() {
  const router = useRouter();
  const { role } = router.query;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Role:", role, "Email:", email, "Password:", password);
  };

  if (!role) {
    return <p>Loading...</p>; // Handle cases where the role isn't immediately available
  }

  const isValidRole = role === "teacher" || role === "student";

  if (!isValidRole) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-800">
        <p className="text-lg font-semibold">
          Invalid role: <strong>{role}</strong>. Please use a valid URL.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 sm:p-8">
        <header className="text-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-semibold">
            Logare {role === "teacher" ? "Profesor" : "Student"}
          </h1>
        </header>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 border rounded-lg bg-gray-50"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-2">
              Parolă
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 border rounded-lg bg-gray-50"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
          >
            Logare
          </button>
        </form>
      </div>
    </div>
  );
}
