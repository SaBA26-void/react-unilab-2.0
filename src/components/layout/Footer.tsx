import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { ChevronDown, Instagram, Facebook, Send } from "lucide-react";

const Footer = () => {
  return (
    <footer className="mt-auto relative">
      {/* Newsletter Section */}
      <div className="relative bottom-[-70px] z-[100] mt-[50px] bg-[#7296AB] py-6 px-4 rounded-md shadow-md max-w-md mx-auto">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-primary-foreground mb-2">
            Luminae <span className="text-accent">Store</span>
          </h3>
          <p className="text-primary-foreground/80 text-xs mb-4">
            Register your email not to miss the last minutes off + Free delivery
          </p>
          <div className="relative">
            <Input
              type="email"
              placeholder="Enter your email"
              className="w-full bg-primary-foreground border-0 h-10 pr-10 rounded-md text-foreground placeholder:text-muted-foreground"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-muted-foreground hover:text-foreground transition-colors">
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Links Section */}
      <div className="bg-[#D1E2EB] py-12 pt-[120px]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div>
              <h4 className="font-semibold text-foreground mb-4">Company</h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/about"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Our Store
                  </Link>
                </li>
                <li>
                  <Link
                    to="/user"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Contact us
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">
                Career Opportunities
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="#"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Selling Programs
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Advertise
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Cooperation
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">How to Buy</h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="#"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Making Payments
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Delivery Options
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Buyer Protection
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    New User Guide
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Help</h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/user"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Contacts Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-[#D1E2EB] border-t border-border">
        <div className="container mx-auto px-4 py-4">
          {/* Payment Methods */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-6">
              <span className="text-muted-foreground/60 font-bold text-xl tracking-wider">
                VISA
              </span>
              <div className="flex items-center gap-1">
                <div className="w-5 h-5 rounded-full bg-destructive/40"></div>
                <div className="w-5 h-5 rounded-full bg-yellow/60 -ml-2"></div>
              </div>
              <span className="text-muted-foreground/60 font-semibold flex items-center gap-1">
                <span className="text-lg font-bold">P</span> PayPal
              </span>
            </div>
            <div className="flex items-center gap-2 cursor-pointer hover:text-foreground transition-colors">
              <span className="text-sm text-muted-foreground">English</span>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>

          {/* Copyright and social */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-4 border-t border-border">
            <p className="text-sm text-muted-foreground">
              165-179 Forster Road City of Monash, Melbourne, Australia
            </p>
            <p className="text-sm text-muted-foreground">
              ©2023 Copyright in reserved for luminae shop
            </p>
            <div className="flex items-center gap-5">
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Send className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
