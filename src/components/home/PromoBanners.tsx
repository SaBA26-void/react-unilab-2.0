import { Link } from "react-router-dom";

const PromoBanners = () => {
  const bannerSets = [
    {
      banners: [
        {
          title: "Never-Ending Summer",
          subtitle: "Throwback Shirts & all-day dressed",
          bgClass: "bg-destructive",
          image: "public/red.png",
        },
        {
          title: "The most famous sport brands",
          subtitle: "Get in gym essentials",
          bgClass: "bg-teal",
          image: "public/green.png",
        },
      ],
    },
  ];

  return (
    <div className="space-y-8">
      {bannerSets.map((set, setIndex) => (
        <section key={setIndex} className="grid md:grid-cols-2 gap-6">
          {set.banners.map((banner, index) => (
            <Link
              key={index}
              to="/women"
              className="overflow-hidden relative group hover-lift rounded-lg"
            >
              <div className="flex min-h-[200px] md:min-h-[280px]">
                {/* Text Side */}
                <div
                  className={`${banner.bgClass} p-6 md:p-8 flex flex-col justify-center w-1/2`}
                >
                  <h3 className="text-xl md:text-2xl font-bold text-primary-foreground mb-2">
                    {banner.title}
                  </h3>
                  <p className="text-primary-foreground/80 mb-4 text-sm md:text-base">
                    {banner.subtitle}
                  </p>
                  <span className="text-primary-foreground underline underline-offset-4 group-hover:no-underline transition-all text-sm">
                    Explore all category
                  </span>
                </div>
                {/* Image Side */}
                <div className="w-1/2 overflow-hidden">
                  <img
                    src={banner.image}
                    alt={banner.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </Link>
          ))}
        </section>
      ))}
    </div>
  );
};

export default PromoBanners;
