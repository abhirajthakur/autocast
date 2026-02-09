import { signIn, signUp } from "@/lib/auth-client";
import { Button } from "@autocast/ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@autocast/ui/components/dialog";
import { Input } from "@autocast/ui/components/input";
import { Label } from "@autocast/ui/components/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@autocast/ui/components/tabs";
import { AlertCircle, Loader2, Lock, Mail, User, Zap } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

const signInSchema = z.object({
  email: z.email({ message: "Please enter a valid email address" }).trim(),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" })
    .trim(),
});

const signUpSchema = signInSchema.extend({
  name: z
    .string()
    .trim()
    .min(1, { message: "Name is required" })
    .max(100, { message: "Name must be less than 100 characters" }),
});

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultTab?: "signin" | "signup";
  dismissible?: boolean;
}

const AuthModal = ({
  open,
  onOpenChange,
  defaultTab = "signin",
  dismissible = true,
}: AuthModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const resetForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    setError(null);
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      resetForm();
    }
    onOpenChange(newOpen);
  };

  const validateSignIn = () => {
    const result = signInSchema.safeParse({ email, password });
    if (!result.success && result.error.message) {
      setError(result.error.message);
      return false;
    }
    setError(null);
    return true;
  };

  const validateSignUp = () => {
    const result = signUpSchema.safeParse({ email, password });
    if (!result.success && result.error.message) {
      setError(result.error.message);
      return false;
    }
    setError(null);
    return true;
  };

  const handleSignIn = async (e: React.SubmitEvent) => {
    e.preventDefault();
    if (!validateSignIn()) return;

    setIsLoading(true);
    setError(null);

    const { error } = await signIn.email({ email, password });

    if (error && error.message) {
      if (error.message.includes("Invalid login credentials")) {
        setError("Invalid email or password. Please try again.");
      } else if (error.message.includes("Email not confirmed")) {
        setError("Please confirm your email address before signing in.");
      } else {
        setError(error.message);
      }
      setIsLoading(false);
      return;
    }

    toast.success("Welcome back!");
    setIsLoading(false);
    handleOpenChange(false);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateSignUp()) return;

    setIsLoading(true);
    setError(null);

    const { error } = await signUp.email({
      name,
      email,
      password,
      callbackURL: "/dashboard",
    });

    if (error && error.message) {
      if (error.message?.includes("User already registered")) {
        setError(
          "An account with this email already exists. Please sign in instead.",
        );
      } else {
        setError(error.message);
      }
      setIsLoading(false);
      return;
    }

    toast.success("Account created!");
    setIsLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        showCloseButton={dismissible}
        onInteractOutside={(e) => {
          if (!dismissible) e.preventDefault();
        }}
        onEscapeKeyDown={(e) => {
          if (!dismissible) e.preventDefault();
        }}
        className="sm:max-w-md p-0 gap-0 bg-card/95 backdrop-blur-xl border-border/50"
      >
        <DialogHeader className="p-6 pb-0">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Link href={"/"} className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary-glow shadow-lg shadow-primary/20">
                <Zap className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-semibold text-foreground">
                Autocast
              </span>
            </Link>
          </div>
        </DialogHeader>

        <Tabs defaultValue={defaultTab} className="w-full">
          <div className="px-12">
            <TabsList className="grid w-full grid-cols-2 bg-secondary">
              <TabsTrigger
                value="signin"
                className="
      data-[state=active]:!bg-primary
      data-[state=active]:!text-primary-foreground
      rounded-md
    "
              >
                Sign In
              </TabsTrigger>
              <TabsTrigger
                value="signup"
                className="
      data-[state=active]:!bg-primary
      data-[state=active]:!text-primary-foreground
      rounded-md
    "
              >
                Sign Up
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="p-6">
            {error && (
              <div className="mb-4 p-3 rounded-lg bg-destructive/10 border border-destructive/30 flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-destructive mt-0.5 shrink-0" />
                <p className="text-sm text-destructive">{error}</p>
              </div>
            )}

            <TabsContent value="signin" className="mt-0">
              <div className="space-y-1 mb-6">
                <DialogTitle className="text-xl">Welcome back</DialogTitle>
                <p className="text-sm text-muted-foreground">
                  Sign in to your account to continue
                </p>
              </div>
              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signin-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="signin-email"
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
                  <Label htmlFor="signin-password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="signin-password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 bg-background border-border"
                      disabled={isLoading}
                    />
                  </div>
                </div>
                <Button
                  type="submit"
                  variant="hero"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup" className="mt-0">
              <div className="space-y-1 mb-6">
                <DialogTitle className="text-xl">Create an account</DialogTitle>
                <p className="text-sm text-muted-foreground">
                  Get started with Autocast today
                </p>
              </div>
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-name">Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="signup-name"
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
                  <Label htmlFor="signup-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="signup-email"
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
                  <Label htmlFor="signup-password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 bg-background border-border"
                      disabled={isLoading}
                    />
                  </div>
                </div>
                <Button
                  type="submit"
                  variant="hero"
                  className="w-full"
                  disabled={isLoading}
                >
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
            </TabsContent>
          </div>
        </Tabs>

        <div className="px-6 pb-6">
          <p className="text-center text-xs text-muted-foreground">
            By continuing, you agree to our{" "}
            <a href="#" className="text-primary hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-primary hover:underline">
              Privacy Policy
            </a>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
