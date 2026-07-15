import Navbar from "../_components/Navbar";
import Footer from "../_components/Footer";
import { ShieldCheck, Leaf, Heart, Award } from "lucide-react";

export default function AboutPage() {
  const values = [
    { title: "Himalayan Integrity", desc: "From Upper Mustang apples to local organic ghee, we serve completely pure flavors.", icon: ShieldCheck },
    { title: "Locally Sourced", desc: "Partnering directly with local farmers from the hills and Terai plains for fresh seasonal crops.", icon: Leaf },
    { title: "Atithi Devo Bhava", desc: "Treating every visiting guest with the deep, heartfelt warmth of true Nepali hospitality.", icon: Heart },
    { title: "Modern Heritage", desc: "Reimagining traditional Nepali culinary secrets with progressive modern fine-dining techniques.", icon: Award },
  ];

  return (
    <>
      <Navbar />

      <main className="bg-white">
        
        {/* 1. JOURNEY SECTION (Asymmetric Responsive Layout) */}
        <section className="w-full px-8 pt-28 pb-20 md:px-16 md:pt-36 md:pb-24 bg-white">
          <div className="w-full flex flex-col gap-12 lg:flex-row lg:gap-20 items-stretch">
            
            {/* Left Side Column: Immersive Fine Dining Scene */}
            <div className="w-full lg:w-1/2 flex">
              <img
                src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&q=80&w=800"
                alt="Lumina Fine Dining Room"
                className="rounded-xl shadow-xl w-full h-[550px] lg:h-auto min-h-[500px] object-cover"
              />
            </div>

            {/* Right Side Column: Integrated Storytelling Narrative */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center">
              <span className="inline-block mb-3 text-xs font-bold uppercase tracking-[0.35em] text-yellow-600">
                Our Journey
              </span>
              
              <h1 className="mb-6 text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl md:text-5xl md:leading-[1.2]">
                The Heart, Heritage & Passion Behind Lumina
              </h1>

              <div className="space-y-6 text-base md:text-lg leading-relaxed text-neutral-600 font-light">
                <p>
                  Lumina was born out of a profound, collective dream — a desire to elevate the rich, 
                  untapped culinary tapestries of Nepal into a world-class, sophisticated fine-dining masterpiece. 
                  We set out to challenge the boundaries of what Himalayan gastronomy could be, transitioning 
                  traditional home-cooked flavors from local households onto an international, contemporary canvas. 
                  Our space is designed to act as an architectural and sensory bridge connecting our storied past 
                  with progressive culinary innovations.
                </p>
                <p>
                  Every single plate served within our walls honors the foundational elements of our roots. 
                  We work tirelessly alongside micro-farmers throughout the country, intentionally sourcing wild, 
                  aromatic herbs from high-altitude alpine terrain, hand-pressed mustard oils from the low Terai plains, 
                  and pristine, hand-churned dairy from regional valleys. By maintaining this strict, seasonal farm-to-table ecosystem, 
                  we preserve the nutritional integrity of our ingredients while offering crucial, direct economic support to our 
                  indigenous agricultural communities.
                </p>
                <p>
                  We blend these precious raw materials with centuries-old ancestral techniques—including traditional 
                  slow clay-pot roasting, sun-drying, and delicate Himalayan fermentation practices—refined under modern culinary physics. 
                  Whether you are joining us to share a milestone celebration with family, or introducing global travelers to the reimagined 
                  depths of progressive Nepalese dining, Lumina promises an unparalleled evening marked by unmatched warmth, cultural pride, 
                  and unforgettable flavor journeys.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* 2. OUR PILLARS & VALUES SECTION */}
        <section className="bg-neutral-50 py-20 md:py-24 w-full px-8 md:px-16">
          <div className="mb-16 text-center">
            <span className="inline-block mb-4 text-xs font-bold uppercase tracking-[0.35em] text-yellow-600">
              How We Cook & Serve
            </span>
            <h2 className="text-3xl font-extrabold text-neutral-900 sm:text-4xl">
              Our Core Philosophies
            </h2>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((val) => {
              const Icon = val.icon;
              return (
                <div key={val.title} className="bg-white p-8 rounded-xl border border-neutral-100 shadow-sm min-h-[260px] flex flex-col items-center justify-center text-center">
                  <div className="mb-4 text-yellow-600 bg-yellow-50 p-3 rounded-full">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-neutral-900">{val.title}</h3>
                  <p className="text-sm leading-relaxed text-neutral-600 font-light">{val.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

       {/* 3. MEET THE MASTERS */}
<section className="w-full px-8 py-20 md:py-24 md:px-16 bg-white">
  <div className="mb-16 text-center">
    <span className="inline-block mb-4 text-xs font-bold uppercase tracking-[0.35em] text-yellow-600">
      The Leadership
    </span>
    <h2 className="text-3xl font-extrabold text-neutral-900 sm:text-4xl">
      The Visionaries Behind Lumina
    </h2>
  </div>

  <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
    {/* Role 1: Managing Director & Co-Founder */}
    <div className="flex flex-col gap-4">
      <div className="w-full aspect-[3/4] md:aspect-[4/5] overflow-hidden rounded-xl shadow-md">
        <img 
          src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=600" 
          alt="Niranjan Shrestha - Co-Founder" 
          className="w-full h-full object-cover object-top"
        />
      </div>
      <div>
        <h3 className="text-xl font-bold text-neutral-900">Niranjan Shrestha</h3>
        <p className="text-xs text-yellow-600 font-semibold tracking-wider uppercase mb-2">Co-Founder & Managing Director</p>
        <p className="text-sm text-neutral-600 font-light leading-relaxed max-w-sm">
          Niranjan guides the strategic expansion and architectural vision of Lumina, ensuring our operations match global fine-dining luxury hospitality benchmarks.
        </p>
      </div>
    </div>

    {/* Role 2: Executive Head Chef */}
    <div className="flex flex-col gap-4">
      <div className="w-full aspect-[3/4] md:aspect-[4/5] overflow-hidden rounded-xl shadow-md">
        <img 
          src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80&w=600" 
          alt="Chef Pradip Adhikari preparing food plate" 
          className="w-full h-full object-cover"
        />
      </div>
      <div>
        <h3 className="text-xl font-bold text-neutral-900">Chef Pradip Adhikari</h3>
        <p className="text-xs text-yellow-600 font-semibold tracking-wider uppercase mb-2">Executive Head Chef & Partner</p>
        <p className="text-sm text-neutral-600 font-light leading-relaxed max-w-sm">
          With over 14 years refining alpine gastronomy, Chef Pradip spearheads our research kitchen, reinventing ancestral heritage food preparations.
        </p>
      </div>
    </div>

    {/* Role 3: Beverage Director / Lady Bartender (Your Premium Image Link Applied) */}
    <div className="flex flex-col gap-4">
      <div className="w-full aspect-[3/4] md:aspect-[4/5] overflow-hidden rounded-xl shadow-md">
        <img 
          src="https://plus.unsplash.com/premium_photo-1753199908754-18235d420c13?q=80&w=600&auto=format&fit=crop" 
          alt="Aayusha Thapa - Head Sommelier & Beverage Director crafting a cocktail" 
          className="w-full h-full object-cover"
        />
      </div>
      <div>
        <h3 className="text-xl font-bold text-neutral-900">Aayusha Thapa</h3>
        <p className="text-xs text-yellow-600 font-semibold tracking-wider uppercase mb-2">Head Sommelier & Beverage Director</p>
        <p className="text-sm text-neutral-600 font-light leading-relaxed max-w-sm">
          Aayusha curates our signature high-altitude pairing menus, meticulously balancing dynamic local fruit infusions alongside iconic international vintages.
        </p>
      </div>
    </div>
  </div>
</section>

      </main>

      <Footer />
    </>
  );
}