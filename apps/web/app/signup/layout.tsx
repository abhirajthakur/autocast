import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up - Autocast",
  description: "Create your Autocast account.",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
