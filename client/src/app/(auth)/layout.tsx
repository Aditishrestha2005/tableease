import { ReactNode } from "react";

export default function AuthLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <main className="grid min-h-screen lg:grid-cols-2">
      {/* Left Side */}
      <div
        className="hidden bg-cover bg-center lg:block"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop')",
        }}
      >
        <div className="flex h-full items-center justify-center bg-black/60 p-10">
          <div className="max-w-lg text-white">
            <p className="mb-4 text-sm uppercase tracking-[0.4em] text-yellow-400">
              Welcome to Lumina
            </p>

            <h1 className="mb-6 text-5xl font-bold leading-tight">
              Experience Fine Dining
              <br />
              With Every Visit
            </h1>

            <p className="text-lg leading-8 text-gray-200">
              Join Lumina to reserve tables, manage your bookings,
              personalize your profile, and enjoy a seamless dining
              experience.
            </p>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center justify-center bg-stone-100 p-8">
        {children}
      </div>
    </main>
  );
}