// "use client";

// import Link from "next/link";
// import { useEffect, useRef, useState } from "react";
// import { CircleUserRound } from "lucide-react";

// export default function Navbar() {
//   const [loggedIn, setLoggedIn] = useState(false);
//   const [menuOpen, setMenuOpen] = useState(false);

//   const menuRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     setLoggedIn(!!token);
//   }, []);

//   useEffect(() => {
//     function handleClickOutside(event: MouseEvent) {
//       if (
//         menuRef.current &&
//         !menuRef.current.contains(event.target as Node)
//       ) {
//         setMenuOpen(false);
//       }
//     }

//     document.addEventListener("mousedown", handleClickOutside);

//     return () =>
//       document.removeEventListener(
//         "mousedown",
//         handleClickOutside
//       );
//   }, []);

//   function logout() {
//     localStorage.removeItem("token");
//     window.location.href = "/login";
//   }

//   return (
//     <header className="relative z-50 w-full border-b border-gray-100 bg-white">
//       <nav className="flex h-20 items-center justify-between px-8 md:px-16">
//         {/* Logo */}
//         <Link
//           href="/home"
//           className="text-3xl font-bold tracking-[0.2em] text-black"
//         >
//           LUMINA
//         </Link>

//         {/* Navigation */}
//         <ul className="flex items-center gap-10 text-sm font-medium uppercase tracking-wider text-zinc-600">
//           <li>
//             <Link
//               href="/home"
//               className="transition-colors hover:text-yellow-600"
//             >
//               Home
//             </Link>
//           </li>

//           <li>
//             <Link
//               href="/about"
//               className="transition-colors hover:text-yellow-600"
//             >
//               About Us
//             </Link>
//           </li>

//           <li>
//             <Link
//               href="/book-table"
//               className="transition-colors hover:text-yellow-600"
//             >
//               Book a Table
//             </Link>
//           </li>

//           <li>
//             <Link
//               href="/contact"
//               className="transition-colors hover:text-yellow-600"
//             >
//               Contact Us
//             </Link>
//           </li>
//         </ul>

//         {/* Right Side */}
//         {!loggedIn ? (
//           <Link
//             href="/login"
//             className="rounded-md border border-black px-5 py-2 text-sm font-medium text-black transition hover:bg-black hover:text-white"
//           >
//             Login
//           </Link>
//         ) : (
//           <div className="relative" ref={menuRef}>
//             <button
//               onClick={() => setMenuOpen(!menuOpen)}
//               className="rounded-full p-1 transition hover:bg-gray-100"
//             >
//               <CircleUserRound
//                 size={36}
//                 className="text-neutral-700"
//               />
//             </button>

//             {menuOpen && (
//              <div className="absolute right-0 z-50 mt-3 w-56 rounded-xl border border-neutral-200 bg-white py-2 shadow-xl">
//                 <Link
//                   href="/dashboard"
//                   className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
//                 >
//                   Dashboard
//                 </Link>

//                 <Link
//                   href="/profile"
//                   className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
//                 >
//                   Profile
//                 </Link>

//                 <hr className="my-2 border-neutral-200" />

//                 <button
//                   onClick={logout}
//                   className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50"
//                 >
//                   Logout
//                 </button>
//               </div>
//             )}
//           </div>
//         )}
//       </nav>
//     </header>
//   );
// }

"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { CircleUserRound } from "lucide-react";

export default function Navbar() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dashboardLink, setDashboardLink] = useState("/dashboard");
  const [profileLink, setProfileLink] = useState("/profile");

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setLoggedIn(!!token);

    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");

      if (user.role === "admin") {
        setDashboardLink("/admin/dashboard");
        setProfileLink("/admin/profile");
      } else {
        setDashboardLink("/dashboard");
        setProfileLink("/profile");
      }
    } catch (error) {
      console.error("Failed to read user from localStorage:", error);
    }
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  }

  return (
    <header className="relative z-50 w-full border-b border-gray-100 bg-white">
      <nav className="flex h-20 items-center justify-between px-8 md:px-16">
        {/* Logo */}
        <Link
          href="/home"
          className="text-3xl font-bold tracking-[0.2em] text-black"
        >
          LUMINA
        </Link>

        {/* Navigation */}
        <ul className="flex items-center gap-10 text-sm font-medium uppercase tracking-wider text-zinc-600">
          <li>
            <Link
              href="/home"
              className="transition-colors hover:text-yellow-600"
            >
              Home
            </Link>
          </li>

          <li>
            <Link
              href="/about"
              className="transition-colors hover:text-yellow-600"
            >
              About Us
            </Link>
          </li>

          <li>
            <Link
              href="/book-table"
              className="transition-colors hover:text-yellow-600"
            >
              Book a Table
            </Link>
          </li>

          <li>
            <Link
              href="/contact"
              className="transition-colors hover:text-yellow-600"
            >
              Contact Us
            </Link>
          </li>
        </ul>

        {/* Right Side */}
        {!loggedIn ? (
          <Link
            href="/login"
            className="rounded-md border border-black px-5 py-2 text-sm font-medium text-black transition hover:bg-black hover:text-white"
          >
            Login
          </Link>
        ) : (
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className="rounded-full p-1 transition hover:bg-gray-100"
            >
              <CircleUserRound
                size={36}
                className="text-neutral-700"
              />
            </button>

            {menuOpen && (
              <div className="absolute right-0 z-50 mt-3 w-56 rounded-xl border border-neutral-200 bg-white py-2 shadow-xl">
                <Link
                  href={dashboardLink}
                  onClick={() => setMenuOpen(false)}
                  className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                >
                  Dashboard
                </Link>

                <Link
                  href={profileLink}
                  onClick={() => setMenuOpen(false)}
                  className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                >
                  Profile
                </Link>

                <hr className="my-2 border-neutral-200" />

                <button
                  onClick={logout}
                  className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}