/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginUser } from "../services/loginService";

export default function LoginForm() {
  const [email, setEmail] = useState<string>(""); // State for email
  const [password, setPassword] = useState<string>(""); // State for password
  const [errorMessage, setErrorMessage] = useState<string>(""); // State for error message
  const [isLoading, setIsLoading] = useState<boolean>(false); // State for loading
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission
    setErrorMessage(""); // Reset error message
    setIsLoading(true); // Show loading state

    try {
      // Call the login API
      const response = await loginUser(email, password);

      const { token, user } = response;

      // Generate username from email
      const username = email.split("@")[0];

      // Save the token and user details in localStorage
      localStorage.setItem("authToken", token);
      localStorage.setItem(
        "user",
        JSON.stringify({ ...user, username }) // Save username in user object
      );

      // Redirect based on the user's role
      switch (user.role) {
        case "Profesor":
          router.push("/dashboard/professor");
          break;
        case "Secretariat":
          router.push("/dashboard/secretary");
          break;
        case "Admin":
          router.push("/dashboard/admin");
          break;
        default:
          router.push("/dashboard/student");
      }
    } catch (error: any) {
      // Handle errors
      console.error("Login error:", error);
      setErrorMessage(
        error.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setIsLoading(false); // Stop loading state
    }
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email and password to access your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-4">
          {/* Email Input */}
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@domain.com"
              required
            />
          </div>

          {/* Password Input */}
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <a
                href="#"
                className="ml-auto inline-block text-sm underline text-blue-600"
              >
                Forgot your password?
              </a>
            </div>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Error Message */}
          {errorMessage && (
            <p className="text-red-600 text-sm text-center">{errorMessage}</p>
          )}

          {/* Submit Button */}
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </Button>

          {/* Google Login Button (Optional) */}
          <Button variant="outline" className="w-full">
            Login with Google
          </Button>
        </form>

        {/* Redirect to Registration */}
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <a href="/register" className="underline text-blue-600">
            Sign up
          </a>
        </div>
      </CardContent>
    </Card>
  );
}
