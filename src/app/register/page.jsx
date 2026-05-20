"use client";
import { FcGoogle } from "react-icons/fc";
import { Card, Separator } from "@heroui/react";
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import { useState } from "react";

const SignUpPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    const { data, error } = await authClient.signUp.email({
      email: user.email,
      password: user.password,
      name: user.name,
      image: user.image,
    });

    setIsLoading(false);

    if (data) {
      redirect("/");
    }

    if (error) {
      setErrorMessage(error.message || "Something went wrong. Please try again.");
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-gray-100 py-12 px-4">
      <div className="w-full max-w-md mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-teal-500 text-white shadow-lg mb-4">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Create Account</h1>
          <p className="text-slate-500">Join Wanderlust and start your adventure today</p>
        </div>

        {/* Main Card */}
        <Card className="border-0 shadow-xl rounded-2xl overflow-hidden">
          <div className="p-8">
            {/* Error Message */}
            {errorMessage && (
              <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600 text-center">{errorMessage}</p>
              </div>
            )}

            {/* Sign Up Form */}
            <Form onSubmit={onSubmit} className="flex flex-col gap-5">
              <TextField isRequired name="name" type="text">
                <Label className="text-sm font-semibold text-slate-700">Full Name</Label>
                <Input 
                  placeholder="John Doe" 
                  className="rounded-lg"
                />
                <FieldError />
              </TextField>

              <TextField name="image" type="url">
                <Label className="text-sm font-semibold text-slate-700">Profile Picture URL</Label>
                <Input 
                  placeholder="https://example.com/avatar.jpg" 
                  className="rounded-lg"
                />
                <Description className="text-xs text-slate-400">
                  Optional: Add a profile picture URL
                </Description>
                <FieldError />
              </TextField>

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
                  placeholder="john@example.com" 
                  className="rounded-lg"
                />
                <FieldError />
              </TextField>

              <TextField
                isRequired
                minLength={8}
                name="password"
                type="password"
                validate={(value) => {
                  if (value.length < 8) {
                    return "Password must be at least 8 characters";
                  }
                  if (!/[A-Z]/.test(value)) {
                    return "Password must contain at least one uppercase letter";
                  }
                  if (!/[0-9]/.test(value)) {
                    return "Password must contain at least one number";
                  }
                  return null;
                }}
              >
                <Label className="text-sm font-semibold text-slate-700">Password</Label>
                <Input 
                  placeholder="Enter your password" 
                  className="rounded-lg"
                  type="password"
                />
                <Description className="text-xs text-slate-400">
                  Must be at least 8 characters with 1 uppercase letter and 1 number
                </Description>
                <FieldError />
              </TextField>

              <Button 
                className="rounded-lg w-full bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white font-semibold py-3 transition-all duration-200 shadow-md hover:shadow-lg"
                type="submit"
                isLoading={isLoading}
                spinner={
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                }
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>
            </Form>

            {/* Divider */}
            <div className="flex items-center justify-center gap-3 my-6">
              <Separator className="flex-1" />
              <span className="text-xs text-slate-400 uppercase tracking-wider">Or sign up with</span>
              <Separator className="flex-1" />
            </div>

            {/* Social Login */}
            <Button 
              onClick={handleGoogleSignin} 
              variant="bordered" 
              className="w-full rounded-lg border-2 border-slate-200 hover:border-cyan-500 hover:bg-cyan-50 transition-all duration-200 py-3"
              disabled={isLoading}
            >
              <FcGoogle className="w-5 h-5" />
              <span className="font-semibold text-slate-700">Sign in with Google</span>
            </Button>

            {/* Login Link */}
            <p className="text-center text-sm text-slate-500 mt-6">
              Already have an account?{' '}
              <a href="/signin" className="font-semibold text-cyan-600 hover:text-cyan-700 hover:underline transition-colors">
                Sign in here
              </a>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SignUpPage;