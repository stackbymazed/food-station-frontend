"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { authClient } from "@/lib/auth-client";
import { RegisterFormData } from "@/types/FormType/type";
import { toast } from "sonner";

import { Eye, EyeOff } from "lucide-react";

export default function RegisterForm() {

  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<RegisterFormData>()

  const onSubmit = async (value: RegisterFormData) => {

    const tosting = toast.loading("Creating account...")

    try {

      const { data, error } = await authClient.signUp.email({
        email: value.email,
        password: value.password,
        name: value.name
      })

      if (error) {
        toast.error(error.message, { id: tosting })
      }

      if (data) {
        toast.success("Account created successfully", { id: tosting })
      }

    } catch (error: unknown) {
      toast.error((error as Error).message, { id: tosting })
    }

    reset()
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-muted">
      <Card className="w-[400px]">

        <CardHeader>
          <CardTitle>Create Account</CardTitle>
          <CardDescription>
            Enter your details to create an account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

            {/* Name */}
            <div className="space-y-2">
              <Label>Name</Label>
              <Input
                {...register("name", {
                  required: "Name is required",
                  minLength: {
                    value: 3,
                    message: "Name must be at least 3 characters"
                  }
                })}
                placeholder="John Doe"
              />

              {errors.name && (
                <p className="text-red-500 text-sm">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email address"
                  }
                })}
                placeholder="john@example.com"
              />

              {errors.email && (
                <p className="text-red-500 text-sm">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label>Password</Label>

              <div className="relative">

                <Input
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters"
                    }
                  })}
                  placeholder="********"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>

              </div>

              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}

            </div>

            <Button type="submit" className="w-full">
              Register
            </Button>

          </form>
        </CardContent>

      </Card>
    </div>
  )
}