import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-8 py-16 md:grid-cols-4">
        {/* Logo */}
        <div>
          <h2 className="mb-4 text-3xl font-bold tracking-[0.2em]">
            LUMINA
          </h2>

          <p className="leading-7 text-gray-400">
            Experience exceptional dining, warm hospitality, and effortless
            online reservations in an elegant atmosphere.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="mb-5 text-lg font-semibold">Quick Links</h3>

          <ul className="space-y-3 text-gray-400">
            <li>
              <Link href="/home" className="hover:text-yellow-400">
                Home
              </Link>
            </li>

            <li>
              <Link href="/about" className="hover:text-yellow-400">
                About Us
              </Link>
            </li>

            <li>
              <Link href="/reservations" className="hover:text-yellow-400">
                Reservations
              </Link>
            </li>

            <li>
              <Link href="/contact" className="hover:text-yellow-400">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Opening Hours */}
        <div>
          <h3 className="mb-5 text-lg font-semibold">
            Opening Hours
          </h3>

          <div className="space-y-2 text-gray-400">
            <p>Monday – Friday</p>
            <p>12:00 PM – 10:00 PM</p>

            <br />

            <p>Saturday – Sunday</p>
            <p>11:00 AM – 11:00 PM</p>
          </div>
        </div>

        {/* Contact */}
        <div>
          <h3 className="mb-5 text-lg font-semibold">
            Contact
          </h3>

          <div className="space-y-3 text-gray-400">
            <p>📍 Lumina Restaurant</p>
            <p>Thamel,Kathmandu</p>

            <br />

            <p>📞 +977 97543108642</p>
            <p>✉️ info@lumina.com</p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Lumina. All Rights Reserved.
      </div>
    </footer>
  );
}