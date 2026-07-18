"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  CalendarDays,
  UtensilsCrossed,
  TableProperties,
  ClipboardList,
  Activity,
  LogOut,
} from "lucide-react";

export default function AdminSidebar() {
  const pathname = usePathname();

  const links = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Tables", href: "/admin/tables", icon: TableProperties },
    { name: "Reservations", href: "/admin/reservations", icon: CalendarDays },
    { name: "Users", href: "/admin/users", icon: Users },
    { name: "Activity Logs", href: "/admin/activity-logs", icon: Activity },
    { name: "Reports", href: "/admin/reports", icon: ClipboardList },
  ];

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  }

  return (
    <aside className="w-64 h-[calc(100vh-80px)] border-r border-gray-200 bg-white flex flex-col justify-between p-4 shrink-0 sticky top-[80px]">
      {/* Upper Navigation Links Group */}
      <nav className="flex flex-col gap-1">
        {links.map((link) => {
          const Icon = link.icon;
          const active = pathname === link.href;

          return (
            <Link
              key={link.name}
              href={link.href}
              className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition shrink-0 ${
                active
                  ? "bg-yellow-500 text-white shadow-sm"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Icon size={18} className="shrink-0" />
              <span className="whitespace-nowrap">{link.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout Action pinned tightly to the bottom */}
      <button
        onClick={logout}
        className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-red-600 transition hover:bg-red-50 shrink-0 mb-2"
      >
        <LogOut size={18} className="shrink-0" />
        <span>Logout</span>
      </button>
    </aside>
  );
}