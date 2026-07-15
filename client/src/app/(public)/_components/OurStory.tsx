import Link from "next/link";

export default function OurStory() {
  return (
    // Cleaned up padding: pt-16 gives a perfect intentional gap below your hero section
    <section className="bg-white pt-16 pb-24 md:pb-32">
      {/* 
        Added items-center to make sure the text container stays perfectly 
        vertically centered alongside the image 
      */}
      <div className="flex w-full flex-col items-center gap-16 px-8 md:px-16 lg:flex-row lg:gap-24">
        
        {/* Left Side: Image */}
        <div className="w-full lg:w-1/2">
          <img
            src="https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=1200&auto=format&fit=crop"
            alt="Restaurant Interior"
            className="h-[520px] w-full rounded-xl object-cover shadow-xl"
          />
        </div>

        {/* Right Side: Content */}
        <div className="flex w-full flex-col justify-center lg:w-1/2">
          <span className="inline-block mb-4 text-xs font-bold uppercase tracking-[0.35em] text-yellow-600">
            Our Story
          </span>

          <h2 className="mb-6 text-4xl font-extrabold tracking-tight text-neutral-900 sm:text-5xl md:leading-[1.15]">
            Where Every Meal
            <br />
            Becomes a Memory
          </h2>

          {/* 
            Divided into two descriptive paragraphs and dropped text-justify. 
            This fills out the horizontal layout seamlessly without awkward spacing.
          */}
          <div className="space-y-6 text-base md:text-lg leading-relaxed text-neutral-600 font-light">
            <p>
              At Lumina, we believe dining is more than just enjoying great food. 
              It is about creating unforgettable moments with family, friends, and 
              loved ones in a warm and elegant atmosphere. Our master culinary team prepares 
              every single dish with locally sourced, seasonal ingredients and immense passion, 
              ensuring every visit offers world-class flavours and outstanding hospitality.
            </p>
            <p>
              From our ambient lighting to our meticulously crafted seasonal menus, every detail 
              at Lumina is designed to evoke comfort and sophistication. Whether you are celebrating 
              a milestone life event or enjoying a quiet, intimate evening, we invite you to sit back, 
              unwind, and let us turn your evening into an unforgettable culinary journey.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}