import Link from "next/link";

export default function Navbar() {
  return (
    <header className="w-full border-b border-gray-100 bg-white">
      {/* Removed max-w-7xl & mx-auto, adjusted padding for wider screens */}
      <nav className="flex h-20 w-full items-center justify-between px-8 md:px-16">
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
            <Link href="/home" className="hover:text-yellow-600 transition-colors">
              Home
            </Link>
          </li>

          <li>
            <Link href="/about" className="hover:text-yellow-600 transition-colors">
              About Us
            </Link>
          </li>

          <li>
            <Link
              href="/reservations"
              className="hover:text-yellow-600 transition-colors"
            >
              Reservations
            </Link>
          </li>

          <li>
            <Link href="/contact" className="hover:text-yellow-600 transition-colors">
              Contact Us
            </Link>
          </li>
        </ul>

        {/* Login */}
        <Link
          href="/login"
          className="rounded-md border border-black px-5 py-2 text-sm font-medium text-black transition-colors hover:bg-black hover:text-white"
        >
          Login
        </Link>
      </nav>
    </header>
  );
}