import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In - Autocast",
  description: "Sign in to your Autocast account.",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
