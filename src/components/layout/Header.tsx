import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  ShoppingCart,
  User,
  Heart,
  ChevronDown,
  Menu,
  Instagram,
  Facebook,
  Send,
  X,
  ChevronRight,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import MegaMenu from "./MegaMenu";
import MobileMenu from "./MobileMenu";

const Header = () => {
  const { getItemCount } = useCart();
  const [isWomenHovered, setIsWomenHovered] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const itemCount = getItemCount();

  const categories = [
    { name: "Woman", href: "/women", hasMegaMenu: true },
    { name: "Male", href: "/women" },
    { name: "Mother-Child", href: "/women" },
    { name: "Home & Furniture", href: "/women" },
    { name: "Super market", href: "/women" },
    { name: "Cosmetics", href: "/women" },
    { name: "Shoe & Bag", href: "/women" },
    { name: "Electronic", href: "/women" },
    { name: "Sport & Outdoor", href: "/women" },
    { name: "Best seller", href: "/women" },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-card">
        {/* Mobile Header */}
        <div className="lg:hidden border-b border-border">
          <div className="container mx-auto px-4 py-3 flex items-center justify-between">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 -ml-2"
            >
              <Menu className="h-6 w-6 text-foreground" />
            </button>

            <Link to="/" className="flex items-center gap-2">
              <div className="text-primary">
                <img src="\public\Logo.svg" />
              </div>
              <span className="font-lato font-bold text-[32px] leading-[20px] tracking-[0px] align-middle">
                Luminae
              </span>
            </Link>

            <Link to="/cart" className="relative p-2 -mr-2">
              <ShoppingCart className="h-6 w-6 text-foreground" />
              {itemCount > 0 && (
                <Badge className="absolute top-0 right-0 h-5 w-5 flex items-center justify-center p-0 bg-primary text-primary-foreground text-xs font-medium rounded-full border-0">
                  {itemCount}
                </Badge>
              )}
            </Link>
          </div>

          {/* Mobile Search */}
          <div className="container mx-auto px-4 pb-3">
            <div className="flex w-full border border-border rounded-md overflow-hidden bg-card">
              <Input
                type="search"
                placeholder="Search Products"
                className="flex-1 border-0 focus-visible:ring-0 h-10 bg-transparent"
              />
              <div className="flex items-center border-l border-border px-3 bg-card cursor-pointer">
                <span className="text-sm text-muted-foreground whitespace-nowrap">
                  All categories
                </span>
                <ChevronDown className="h-4 w-4 ml-1 text-muted-foreground" />
              </div>
              <button className="px-3 bg-card border-l border-border">
                <Search className="h-5 w-5 text-foreground" />
              </button>
            </div>
          </div>
        </div>

        {/* Desktop Header */}
        <div className="hidden lg:block">
          {/* Top Bar - White with navigation */}
          <div className="border-b border-border">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between gap-6">
              {/* Logo */}
              <Link to="/" className="flex items-center gap-2 flex-shrink-0">
                <div className="text-primary">
                  <img src="\public\Logo.svg" />
                </div>
                <span className="font-lato font-bold text-[32px] leading-[20px] tracking-[0px] align-middle">
                  Luminae
                </span>
              </Link>

              {/* Search Bar */}
              <div className="flex-1 max-w-lg">
                <div className="flex w-full border border-border rounded-md overflow-hidden bg-card">
                  <Input
                    type="search"
                    placeholder="Search Products"
                    className="flex-1 border-0 focus-visible:ring-0 h-10 bg-transparent"
                  />
                  <div className="flex items-center border-l border-border px-3 bg-card cursor-pointer hover:bg-secondary transition-colors">
                    <span className="text-sm text-muted-foreground whitespace-nowrap">
                      All categories
                    </span>
                    <ChevronDown className="h-4 w-4 ml-1 text-muted-foreground" />
                  </div>
                  <button className="px-4 bg-card hover:bg-secondary transition-colors border-l border-border">
                    <Search className="h-5 w-5 text-foreground" />
                  </button>
                </div>
              </div>

              {/* Navigation Links */}
              <nav className="hidden xl:flex items-center gap-8">
                <Link
                  to="/about"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  About us
                </Link>
                <Link
                  to="/blog"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Blog
                </Link>
                <Link
                  to="/user"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Contact us
                </Link>
                <Link
                  to="/help"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Help & support
                </Link>
              </nav>

              {/* Social Icons */}
              <div className="hidden xl:flex items-center gap-4">
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

          {/* Middle Bar - Navy with categories and user actions */}
          <div className="bg-navy text-primary-foreground">
            <div className="container mx-auto px-4 py-2.5 flex items-center justify-between">
              {/* Left side - Categories dropdown */}
              <div className="flex items-center gap-6">
                <button className="flex items-center gap-2 font-medium">
                  <Menu className="h-5 w-5" />
                  <span className="text-sm">Categories</span>
                </button>
                <div className="flex items-center gap-4 text-sm text-primary-foreground/80">
                  <div className="flex items-center gap-1 cursor-pointer hover:text-primary-foreground transition-colors">
                    <span>USD</span>
                    <ChevronDown className="h-4 w-4" />
                  </div>
                  <div className="flex items-center gap-1 cursor-pointer hover:text-primary-foreground transition-colors">
                    <span>English</span>
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </div>
              </div>

              {/* Center - Promotional banner */}
              <div className="hidden xl:flex items-center gap-3">
                <img src="public\Men cosmetic.png" alt="" />
                <div>
                  <p className="font-semibold text-sm">
                    Weekly Men's Toiletries Coupons.
                  </p>
                  <p className="text-xs text-primary-foreground/60">
                    We extend exclusive discounts to our male clientele
                  </p>
                </div>
              </div>

              {/* Right side - User actions */}
              <div className="flex items-center gap-5">
                <Link
                  to="/user"
                  className="flex items-center gap-2 text-sm hover:text-primary-foreground/80 transition-colors"
                >
                  <User className="h-5 w-5" />
                  <span>Sign in</span>
                </Link>
                <button className="flex items-center gap-2 text-sm hover:text-primary-foreground/80 transition-colors">
                  <Heart className="h-5 w-5" />
                  <span>Favorites</span>
                </button>
                <Link
                  to="/cart"
                  className="flex items-center gap-2 text-sm hover:text-primary-foreground/80 transition-colors"
                >
                  <div className="relative">
                    <ShoppingCart className="h-5 w-5" />
                    {itemCount > 0 && (
                      <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-success text-primary-foreground text-xs font-medium rounded-full border-0">
                        {itemCount}
                      </Badge>
                    )}
                  </div>
                  <span>Card</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom Bar - Category Navigation */}
          <div className="bg-card border-b border-border">
            <div className="container mx-auto px-4">
              <nav className="flex items-center gap-8 overflow-x-auto">
                {categories.map((category) => (
                  <div
                    key={category.name}
                    className="relative"
                    onMouseEnter={() =>
                      category.hasMegaMenu && setIsWomenHovered(true)
                    }
                    onMouseLeave={() =>
                      category.hasMegaMenu && setIsWomenHovered(false)
                    }
                  >
                    <Link
                      to={category.href}
                      className={`flex items-center gap-1 py-3 text-sm font-medium whitespace-nowrap transition-colors ${
                        category.hasMegaMenu && isWomenHovered
                          ? "text-accent"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {category.name}
                    </Link>
                    {category.hasMegaMenu && isWomenHovered && <MegaMenu />}
                  </div>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
};

export default Header;
