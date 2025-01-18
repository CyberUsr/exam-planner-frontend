/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import Link from "next/link";
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
import { registerUser } from "../api/services/loginService";

export default function RegisterForm() {
  const [email, setEmail] = useState<string>(""); // State for email
  const [password, setPassword] = useState<string>(""); // State for password
  const [errorMessage, setErrorMessage] = useState<string>(""); // Error message
  const [isLoading, setIsLoading] = useState<boolean>(false); // Loading state
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setIsLoading(true);

    if (!email || !password) {
      setErrorMessage("Please fill in all fields.");
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long.");
      setIsLoading(false);
      return;
    }

    try {
      // Call the registration API
      const response = await registerUser(email, password);

      if (response && response.user && response.user.role) {
        const { role } = response.user;

        if (role === "Student") {
          // Redirect to adaugare-studenti with email
          router.push(`/adaugare-studenti?email=${encodeURIComponent(email)}`);
        } else {
          // Redirect to login for other roles
          router.push("/login");
        }
      } else {
        throw new Error("Unexpected response format.");
      }
    } catch (error: any) {
      console.error("Registration error:", error);
      setErrorMessage(
        error.response?.data?.message || error.message || "Registration failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your email and password to create an account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-4">
          {/* Email Input */}
          <div>
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
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              required
            />
          </div>

          {/* Error Message */}
          {errorMessage && (
            <p className="text-red-600 text-center text-sm">{errorMessage}</p>
          )}

          {/* Submit Button */}
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Registering..." : "Sign Up"}
          </Button>
        </form>

        {/* Redirect to Login */}
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link
            href="/login"
            className="underline text-blue-600 hover:text-blue-800"
          >
            Login
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
