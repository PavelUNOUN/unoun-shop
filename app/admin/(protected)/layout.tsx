import { redirect } from "next/navigation";
import { isAdminAuthenticated, isAdminConfigured } from "@/server/admin/auth";

export default async function ProtectedAdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  if (!isAdminConfigured()) {
    redirect("/admin/login?reason=not-configured");
  }

  const authenticated = await isAdminAuthenticated();

  if (!authenticated) {
    redirect("/admin/login");
  }

  return children;
}
