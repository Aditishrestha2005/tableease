import type { ReactNode } from "react";

import Navbar from "../(public)/_components/Navbar";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AuthGuard from "@/components/AuthGuard";
export default function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex h-screen flex-col overflow-hidden">
      {/* Navbar stays fixed right at the top layout entry */}
      <div className="shrink-0">
        <Navbar />
      </div>

      {/* This wrapper locks to the exact remaining screen space */}
      <div className="flex h-[calc(100vh-80px)] w-full overflow-hidden bg-neutral-50">
        {/* Admin Sidebar stays locked on the left, never scrolling */}
        <AdminSidebar />

        {/* ONLY the main contents section will handle vertical scrolling */}
       <main className="flex-1 overflow-y-auto p-8">
  <AuthGuard>{children}</AuthGuard>
</main>
      </div>
    </div>
  );
}