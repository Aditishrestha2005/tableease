"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  CalendarDays,
  User,
  LogOut,
} from "lucide-react";
import { logoutUser } from "@/app/lib/api";

export default function UserSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const links = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "My Reservations",
      href: "/my-reservations",
      icon: CalendarDays,
    },
    {
      name: "Profile",
      href: "/profile",
      icon: User,
    },
  ];

 async function handleLogout() {
  try {
    await logoutUser();
    router.push("/login");
} catch (error) {
  console.error("Logout failed:", error);
  alert(String(error));
}
}

  return (
    <aside className="flex h-screen w-64 flex-col border-r border-neutral-200 bg-white">

      {/* Navigation */}
      <nav className="flex-1 space-y-2 p-4">
        {links.map(({ name, href, icon: Icon }) => {
          const active = pathname === href;

          return (
            <Link
              key={name}
              href={href}
              className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition ${
                active
                  ? "bg-yellow-500 text-white"
                  : "text-neutral-700 hover:bg-neutral-100"
              }`}
            >
              <Icon size={20} />
              {name}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="border-t border-neutral-200 p-4">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-red-600 transition hover:bg-red-50"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
}