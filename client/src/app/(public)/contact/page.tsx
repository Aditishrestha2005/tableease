"use client";



export default function ContactPage() {
  return (
    <>
      {/* Main container in unified solid white */}
      <main className="bg-white pt-16">
        
        {/* Hero Banner - Elegant, spacious vertical padding */}
        <section className="bg-white py-16 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-yellow-600">
            Contact Us
          </p>

          <h1 className="text-4xl font-extrabold text-neutral-900 sm:text-5xl tracking-tight">
            We'd Love to Hear From You
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base md:text-lg text-neutral-600 font-light leading-relaxed">
            Whether you're planning a special evening, have a question about
            reservations, or simply want to say hello, our team is always happy
            to help.
          </p>
        </section>

        {/* Contact Content Grid - Spacious padding, balanced gaps */}
        <section className="mx-auto grid max-w-7xl gap-16 px-8 py-16 lg:grid-cols-2 items-start bg-white">
          
          {/* Left Side: Local Contact Details */}
          <div className="lg:pr-8">
            <h2 className="mb-8 text-3xl font-bold text-neutral-900 tracking-tight">
              Get in Touch
            </h2>

            <div className="space-y-8">
              <div>
                <h3 className="font-semibold text-yellow-600 flex items-center gap-2">
                  <span>📍</span> Address
                </h3>
                <p className="mt-2 text-neutral-600 font-light leading-relaxed">
                  Lumina Restaurant
                  <br />
                  Thamel, Kathmandu, Nepal
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-yellow-600 flex items-center gap-2">
                  <span>📞</span> Phone
                </h3>
                <p className="mt-2 text-neutral-600 font-light">
                  +977 97543108642
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-yellow-600 flex items-center gap-2">
                  <span>✉️</span> Email
                </h3>
                <p className="mt-2 text-neutral-600 font-light">
                  info@lumina.com
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-yellow-600 flex items-center gap-2">
                  <span>🕒</span> Opening Hours
                </h3>
                <div className="mt-2 space-y-1 text-neutral-600 font-light leading-relaxed">
                  <p><span className="font-medium text-neutral-800">Monday – Friday:</span> 12:00 PM – 10:00 PM</p>
                  <p><span className="font-medium text-neutral-800">Saturday – Sunday:</span> 11:00 AM – 11:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Contact Form - Comfortable sizing and padding */}
          <div className="rounded-xl bg-neutral-50 p-8 shadow-sm border border-neutral-100/85">
            <h2 className="mb-8 text-3xl font-bold text-neutral-900 tracking-tight">
              Send a Message
            </h2>

            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div>
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full rounded-md border border-neutral-200 bg-white px-4 py-3 text-neutral-900 placeholder-neutral-400 outline-none transition focus:border-yellow-600 focus:ring-1 focus:ring-yellow-600 text-sm"
                />
              </div>

              <div>
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full rounded-md border border-neutral-200 bg-white px-4 py-3 text-neutral-900 placeholder-neutral-400 outline-none transition focus:border-yellow-600 focus:ring-1 focus:ring-yellow-600 text-sm"
                />
              </div>

              <div>
                <textarea
                  rows={5}
                  placeholder="Your Message"
                  className="w-full rounded-md border border-neutral-200 bg-white px-4 py-3 text-neutral-900 placeholder-neutral-400 outline-none transition focus:border-yellow-600 focus:ring-1 focus:ring-yellow-600 text-sm resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-md bg-neutral-950 py-3 text-sm font-semibold text-white tracking-wide transition hover:bg-yellow-600 active:bg-yellow-700 shadow-sm"
              >
                Send Message
              </button>
            </form>
          </div>
        </section>
      </main>

   
    </>
  );
}