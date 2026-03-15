"use client";
import { useForm } from "react-hook-form"
// import { authClient } from "@/lib/auth-client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { authClient } from "@/lib/auth-client"
import { RegisterFormData } from "@/types/FormType/type";
import { toast } from "sonner";

export default function RegisterForm() {

  const { register, handleSubmit, reset } = useForm()

  const onSubmit = async (value: RegisterFormData) => {
    // console.log(value);
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
      // console.error("Registration error:", error)
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

            <div className="space-y-2">
              <Label>Name</Label>
              <Input
                {...register("name")}
                placeholder="John Doe"
              />
            </div>

            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                type="email"
                {...register("email")}
                placeholder="john@example.com"
              />
            </div>

            <div className="space-y-2">
              <Label>Password</Label>
              <Input
                type="password"
                {...register("password")}
                placeholder="********"
              />
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