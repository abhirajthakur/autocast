"use client";

import { useSession } from "@/lib/auth-client";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import AuthModal from "./auth-modal";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { data: session, isPending } = useSession();
  const [authModalOpen, setAuthModalOpen] = useState(true);

  if (isPending && !session) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <AuthModal
          open={authModalOpen}
          onOpenChange={setAuthModalOpen}
          defaultTab="signin"
          dismissible={false}
        />
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
