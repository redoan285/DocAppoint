"use client";
import { FcGoogle } from "react-icons/fc";
import { Card, Separator } from "@heroui/react";
import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { Stethoscope, Mail, Lock, LogIn } from "lucide-react";

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    const { data, error } = await authClient.signIn.email({
      email: user.email,
      password: user.password,
    });

    setIsLoading(false);

    if (data) {
      redirect("/");
    }

    if (error) {
      setErrorMessage(error.message || "Invalid email or password. Please try again.");
    }
  };

  const handleGoogleSignin = async () => {
    setIsLoading(true);
    await authClient.signIn.social({
      provider: "google",
    });
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 via-white to-blue-50 py-12 px-4">
      <div className="w-full max-w-md mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-500 to-teal-600 text-white shadow-lg mb-4">
            <Stethoscope className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Welcome Back</h1>
          <p className="text-slate-500">Sign in to continue your healthcare journey</p>
        </div>

        {/* Main Card */}
        <Card className="border-0 shadow-xl rounded-2xl overflow-hidden bg-white/80 backdrop-blur-sm">
          <div className="p-8">
            {/* Error Message */}
            {errorMessage && (
              <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600 text-center">{errorMessage}</p>
              </div>
            )}

            {/* Sign In Form */}
            <Form onSubmit={onSubmit} className="flex flex-col gap-5">
              <TextField
                isRequired
                name="email"
                type="email"
                validate={(value) => {
                  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                    return "Please enter a valid email address";
                  }
                  return null;
                }}
              >
                <Label className="text-sm font-semibold text-slate-700">Email Address</Label>
                <Input 
                  placeholder="doctor@docappoint.com" 
                  className="rounded-lg"
                  type="email"
                />
                <FieldError />
              </TextField>

              <TextField
                isRequired
                name="password"
                type="password"
              >
                <Label className="text-sm font-semibold text-slate-700">Password</Label>
                <Input 
                  placeholder="Enter your password" 
                  className="rounded-lg"
                  type="password"
                 
                />
                <FieldError />
              </TextField>

              {/* Forgot Password Link */}
              <div className="text-right">
                <Link 
                  href="/forgot-password" 
                  className="text-xs text-teal-600 hover:text-teal-700 hover:underline transition-colors"
                >
                  Forgot Password?
                </Link>
              </div>

              <Button 
                className="rounded-lg w-full bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-semibold py-3 transition-all duration-200 shadow-md hover:shadow-lg"
                type="submit"
                isLoading={isLoading}
                spinner={
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                }
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </Form>

            {/* Divider */}
            <div className="flex items-center justify-center gap-3 my-6">
              <Separator className="flex-1" />
              <span className="text-xs text-slate-400 uppercase tracking-wider">Or continue with</span>
              <Separator className="flex-1" />
            </div>

            {/* Social Login */}
            <Button 
              onClick={handleGoogleSignin} 
              variant="bordered" 
              className="w-full rounded-lg border-2 border-slate-200 hover:border-teal-500 hover:bg-teal-50 transition-all duration-200 py-3"
              disabled={isLoading}
            >
              <FcGoogle className="w-5 h-5" />
              <span className="font-semibold text-slate-700">Sign in with Google</span>
            </Button>

            {/* Sign Up Link */}
           <p className="text-center text-sm text-slate-500 mt-6">
  Do not have an account?{' '}
  <Link 
    href="/register"    // ← "register" এ পরিবর্তন করুন
    className="font-semibold text-teal-600 hover:text-teal-700 hover:underline transition-colors"
  >
    Create Account
  </Link>
</p>

            {/* Demo Credentials (Development only) */}
            <div className="mt-8 p-4 bg-slate-50 rounded-lg border border-slate-200">
              <p className="text-xs text-slate-500 text-center mb-2">Demo Credentials</p>
              <div className="flex justify-center gap-4 text-xs">
                <div>
                  <span className="font-semibold text-slate-700">Email:</span>
                  <span className="text-slate-500 ml-1">demo@docappoint.com</span>
                </div>
                <div>
                  <span className="font-semibold text-slate-700">Password:</span>
                  <span className="text-slate-500 ml-1">Demo@123</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;