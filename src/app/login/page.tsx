"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LoginForm() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-muted">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Enter your email and password to login
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form className="space-y-4">

            <div className="space-y-2">
              <Label>Email</Label>
              <Input type="email" placeholder="john@example.com" />
            </div>

            <div className="space-y-2">
              <Label>Password</Label>
              <Input type="password" placeholder="********" />
            </div>

            <Button className="w-full">
              Login
            </Button>

          </form>
        </CardContent>
      </Card>
    </div>
  )
}