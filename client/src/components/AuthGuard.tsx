"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getCurrentUser } from "@/app/lib/api";

export default function AuthGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const [checking, setChecking] = useState(true);

  useEffect(() => {
    async function verify() {
      const token = localStorage.getItem("token");

      if (!token) {
        router.replace("/login");
        return;
      }

      try {
        const result = await getCurrentUser();

        // Optional role protection
        if (
          pathname.startsWith("/admin") &&
          result.data.role !== "admin"
        ) {
          router.replace("/login");
          return;
        }

        if (
          pathname.startsWith("/user") &&
          result.data.role !== "user"
        ) {
          router.replace("/login");
          return;
        }

        setChecking(false);
      } catch {
        localStorage.removeItem("token");
        router.replace("/login");
      }
    }

    verify();
  }, [pathname, router]);

  if (checking) {
    return (
      <div className="flex h-screen items-center justify-center">
        Checking authentication...
      </div>
    );
  }

  return <>{children}</>;
}