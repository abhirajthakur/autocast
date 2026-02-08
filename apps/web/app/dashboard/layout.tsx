import ProtectedRoute from "@/components/auth/protected-route";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard - Autocast",
  description: "View and manage your content processing jobs.",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}
