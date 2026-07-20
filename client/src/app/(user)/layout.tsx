import type { ReactNode } from "react";

import Navbar from "../(public)/_components/Navbar";
import UserSidebar from "@/components/layout/UserSidebar";
import AuthGuard from "@/components/AuthGuard";
export default function UserLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <Navbar />

      <div className="flex min-h-[calc(100vh-80px)] bg-neutral-50">
        <UserSidebar />

       <main className="flex-1 overflow-y-auto p-8">
  <AuthGuard>{children}</AuthGuard>
</main>
      </div>
    </>
  );
}