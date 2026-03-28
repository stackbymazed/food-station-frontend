"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Lottie from "lottie-react";
import { Eye, EyeOff, Mail, Lock, LogIn } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";

type LoginFormData = {
  email: string;
  password: string;
};

// URL for a nice food/cooking animation
const LOGIN_ANIMATION_URL = "https://lottie.host/7e0c90c7-2c9c-448c-9a4f-a99f14798b71/gZAnG1Y5aV.json";

export default function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [animationData, setAnimationData] = useState<any>(null);

  // Fetch Lottie JSON
  useState(() => {
    fetch(LOGIN_ANIMATION_URL)
      .then((res) => res.json())
      .then((data) => setAnimationData(data));
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<LoginFormData>();

  const onSubmit = async (value: LoginFormData) => {
    const loadingToast = toast.loading("Logging in to your account...");

    try {
      const { data, error } = await authClient.signIn.email({
        email: value.email,
        password: value.password
      });

      if (error) {
        toast.error(error.message, { id: loadingToast });
      }

      if (data) {
        toast.success("Welcome back! Login successful", { id: loadingToast });
        router.push("/");
      }
    } catch (error: unknown) {
      toast.error((error as Error).message, { id: loadingToast });
    }

    reset();
  };

  const handleGoogleSignIn = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: window.location.origin
      });
    } catch (error) {
       toast.error("Failed to sign in with Google");
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 overflow-hidden">
      
      {/* Left: Animation Section (Visible on LG up) */}
      <div className="hidden lg:flex flex-1 flex-col items-center justify-center bg-orange-50/50 p-12 relative">
        <div className="max-w-md text-center space-y-6 z-10">
          <h1 className="text-4xl font-extrabold text-slate-900 leading-tight">
            Deliciousness <span className="text-orange-500">Wait Inside!</span>
          </h1>
          <p className="text-slate-600 text-lg">
            Login to explore our premium collection of award-winning meals and specialized cuisines.
          </p>
          <div className="w-full max-w-sm mx-auto">
            {animationData && <Lottie animationData={animationData} loop={true} />}
          </div>
        </div>
        {/* Background Decorative Blob */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-200/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-300/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
      </div>

      {/* Right: Form Section */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12">
        <Card className="w-full max-w-[450px] border-none shadow-2xl shadow-slate-200/50 rounded-2xl">
          <CardHeader className="space-y-2 pb-8">
            <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center mb-4">
              <LogIn className="text-white" size={24} />
            </div>
            <CardTitle className="text-3xl font-bold tracking-tight">Login</CardTitle>
            <CardDescription className="text-slate-500">
              Welcome back! Please enter your details.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              
              <div className="space-y-2">
                <Label className="text-sm font-semibold flex items-center gap-2">
                  <Mail size={16} className="text-slate-400" /> Email
                </Label>
                <Input
                  className="rounded-xl border-slate-200 focus-visible:ring-orange-500 h-11"
                  type="email"
                  placeholder="name@example.com"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Invalid email"
                    }
                  })}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs font-medium">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label className="text-sm font-semibold flex items-center gap-2">
                    <Lock size={16} className="text-slate-400" /> Password
                  </Label>
                  <button type="button" className="text-xs text-orange-500 font-bold hover:underline">
                    Forgot Password?
                  </button>
                </div>
                
                <div className="relative">
                  <Input
                    className="rounded-xl border-slate-200 focus-visible:ring-orange-500 h-11 pr-10"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    {...register("password", {
                      required: "Password is required"
                    })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-xs font-medium">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="space-y-4">
                 <Button 
                  type="submit" 
                  className="w-full h-11 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl transition-all active:scale-[0.98] shadow-lg shadow-orange-500/20"
                >
                  Sign In
                </Button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-slate-200" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-slate-500">Or continue with</span>
                  </div>
                </div>

                <Button 
                  type="button"
                  variant="outline"
                  onClick={handleGoogleSignIn}
                  className="w-full h-11 border-slate-200 hover:bg-slate-50 font-semibold rounded-xl flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      style={{ fill: "#4285F4" }}
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      style={{ fill: "#34A853" }}
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.84z"
                      style={{ fill: "#FBBC05" }}
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                      style={{ fill: "#EA4335" }}
                    />
                  </svg>
                  Google
                </Button>
              </div>

              <div className="text-center pt-4">
                <p className="text-slate-500 text-sm">
                  Don&apos;t have an account?{" "}
                  <Link href="/register" className="text-orange-500 font-extrabold hover:underline">
                    Sign up for free
                  </Link>
                </p>
              </div>

            </form>
          </CardContent>
        </Card>
      </div>

    </div>
  );
}