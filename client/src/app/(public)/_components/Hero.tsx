import Link from "next/link";

export default function Hero() {
  return (
    <section
      className="relative flex h-[calc(100vh-80px)] items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop')",
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-4xl px-6 text-center text-white">
        <p className="mb-5 text-sm uppercase tracking-[0.5em] text-yellow-400">
          Welcome to Lumina
        </p>

        <h1 className="mb-6 text-5xl font-bold leading-tight md:text-7xl">
          Experience Fine Dining
          <br />
          Like Never Before
        </h1>

        <p className="mx-auto mb-10 max-w-2xl text-lg leading-8 text-gray-200">
          Discover an unforgettable dining experience where exceptional cuisine,
          elegant interiors, and warm hospitality come together to create
          lasting memories.
        </p>

        <div className="flex justify-center gap-5">
          <Link
            href="/reservations"
            className="rounded-md bg-yellow-500 px-8 py-3 text-lg font-semibold text-black transition hover:bg-yellow-400"
          >
            Reserve Now
          </Link>

          <Link
            href="/about"
            className="rounded-md border border-white px-8 py-3 text-lg font-semibold transition hover:bg-white hover:text-black"
          >
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
}