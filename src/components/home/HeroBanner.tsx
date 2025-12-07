import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroBanner = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="grid md:grid-cols-2">
        {/* Left Side - Image with overlay card */}
        <div className="relative z-[10] min-h-[450px] md:min-h-[520px]">
          <img
            src="public\left.png"
            alt="Summer fashion models"
            className="w-full h-full object-cover"
          />
          {/* Overlay Card */}
          <div className="absolute z-[100] bottom-40 left-[10] md:right-8 bg-card shadow-lg max-w-[220px] overflow-hidden">
            <div className="p-5">
              <p className="font-semibold text-foreground text-lg mb-1">
                Summer Essentials
              </p>
              <p className="text-accent font-bold text-lg">20% off</p>
            </div>
            <div className="bg-navy text-primary-foreground text-center py-3 text-sm font-medium">
              19 Jul-30 Jul
            </div>
          </div>
        </div>

        {/* Right Side - Light blue promotional banner */}
        <div
          className="min-h-[450px] md:min-h-[520px] flex flex-col justify-center items-center text-center p-8 md:p-12"
          style={{
            background: "linear-gradient(180deg, #4172DC 0%, #6A8FE0 100%)",
            color: "#FFFFFF",
          }}
        >
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 tracking-wide">
            KIMONOS, CAFTANS & PAREOS
          </h1>
          <p className="text-lg md:text-xl text-white/80 mb-8">
            Poolside glam included From $4.99
          </p>
          <Link to="/women">
            <Button className="bg-[#4172DC] hover:bg-muted-foreground text-primary-foreground px-8 py-6 text-sm font-medium inline-flex items-center gap-2 rounded-md">
              <ShoppingCart className="h-5 w-5" />
              SHOP NOW
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
