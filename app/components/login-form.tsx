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
import { loginUser } from "../services/loginService"; // Ensure this service exists and is correctly imported

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(""); // Reset error messages
    console.log("Form submitted. Email:", email, "Password:", password); // Debug log

    try {
      const response = await loginUser(email, password);
      console.log("API Response:", response); // Debug log

      const { token, user } = response; // Extract token and user
      localStorage.setItem("token", token); // Save the token locally

      // Redirect based on the user's role
      switch (user.role) {
        case "Profesor":
          router.push("/dashboard/teacher");
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Error during login:", error); // Debug log
      setErrorMessage(
        error.response?.data?.message || "Login failed. Please try again."
      );
    }
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="m@example.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <a href="#" className="ml-auto inline-block text-sm underline">
                Forgot your password?
              </a>
            </div>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {errorMessage && (
            <p className="text-red-600 text-sm text-center">{errorMessage}</p>
          )}
          <Button type="submit" className="w-full">
            Login
          </Button>
          <Button variant="outline" className="w-full">
            Login with Google
          </Button>
        </form>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <a href="#" className="underline">
            Sign up
          </a>
        </div>
      </CardContent>
    </Card>
  );
}
