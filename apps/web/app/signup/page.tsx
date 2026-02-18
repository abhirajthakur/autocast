"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signUp } from "@/lib/auth-client";
import { Button } from "@autocast/ui/components/button";
import { Input } from "@autocast/ui/components/input";
import { Label } from "@autocast/ui/components/label";
import { Card, CardContent } from "@autocast/ui/components/card";
import { Zap, Loader2, Mail, Lock, User, AlertCircle } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";

const signUpSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "Name is required" })
    .max(100, { message: "Name must be less than 100 characters" }),
  email: z.email({ message: "Please enter a valid email address" }).trim(),
  password: z
    .string()
    .trim()
    .min(6, { message: "Password must be at least 6 characters" }),
});

export default function SignUpPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSignUp = async (e: React.SubmitEvent) => {
    e.preventDefault();

    const result = signUpSchema.safeParse({ name, email, password });
    if (!result.success) {
      setError(result.error.message);
      return;
    }

    setIsLoading(true);
    setError(null);

    const { error: signUpError } = await signUp.email({
      name,
      email,
      password,
    });

    if (signUpError) {
      if (signUpError.message?.includes("User already registered")) {
        setError(
          "An account with this email already exists. Please sign in instead.",
        );
      } else {
        setError(signUpError.message || "Sign up failed");
      }
      setIsLoading(false);
      return;
    }

    toast.success("Account created!");
    setIsLoading(false);
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <Card className="w-full max-w-md border-border/50 bg-card/95 backdrop-blur-xl">
        <CardContent className="p-6">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 mb-6"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary-glow shadow-lg shadow-primary/20">
              <Zap className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-semibold text-foreground">
              Autocast
            </span>
          </Link>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-destructive/10 border border-destructive/30 flex items-start gap-2">
              <AlertCircle className="h-4 w-4 text-destructive mt-0.5 shrink-0" />
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          <form onSubmit={handleSignUp} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="name"
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-10 bg-background border-border"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-background border-border"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 bg-background border-border"
                  disabled={isLoading}
                />
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                "Create Account"
              )}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Already have an account?{" "}
            <Link
              href="/signin"
              className="text-primary hover:underline font-medium"
            >
              Sign In
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
