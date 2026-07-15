import { Utensils, CalendarDays, Sparkles, HeartHandshake } from "lucide-react";

export default function WhyChooseUs() {
  const features = [
    {
      title: "Premium Cuisine",
      description:
        "Our chefs prepare every dish using the freshest ingredients and exceptional culinary techniques.",
      icon: Utensils,
    },
    {
      title: "Easy Reservations",
      description:
        "Reserve your table online in just a few clicks, anytime and anywhere.",
      icon: CalendarDays,
    },
    {
      title: "Elegant Ambience",
      description:
        "Experience a sophisticated atmosphere designed for unforgettable dining moments.",
      icon: Sparkles,
    },
    {
      title: "Exceptional Service",
      description:
        "Our dedicated team ensures every guest enjoys a memorable experience from start to finish.",
      icon: HeartHandshake,
    },
  ];

  return (
    // Reduced pt-24 down to pt-12 to drastically close the gap below Our Story
    <section className="bg-neutral-50 pt-12 pb-24 md:pb-32">
      <div className="w-full px-8 md:px-16">
        
        {/* Header Block - Adjusted margin slightly for tighter pacing */}
        <div className="mb-14 text-center">
          <span className="inline-block mb-4 text-xs font-bold uppercase tracking-[0.35em] text-yellow-600">
            Why Choose Lumina
          </span>

          <h2 className="text-4xl font-extrabold tracking-tight text-neutral-900 sm:text-5xl md:leading-[1.15]">
            An Experience You'll
            <br />
            Always Remember
          </h2>
        </div>

        {/* Features Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={feature.title}
              
                className="group flex flex-col items-center justify-center min-h-[320px] rounded-xl border border-neutral-100 bg-white p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                {/* Icon Wrapper */}
                <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-yellow-50 text-yellow-600 transition-colors duration-300 group-hover:bg-yellow-600 group-hover:text-white">
                  <IconComponent className="h-6 w-6 stroke-[1.75]" />
                </div>

                {/* Title */}
                <h3 className="mb-4 text-xl font-bold text-neutral-900">
                  {feature.title}
                </h3>

                {/* Paragraph */}
                <p className="text-sm md:text-base leading-relaxed text-neutral-600 font-light">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}