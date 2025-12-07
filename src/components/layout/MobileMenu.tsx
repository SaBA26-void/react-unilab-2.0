import { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, ChevronRight } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>('Woman');

  const menuSections = [
    {
      title: 'SHOE & BAG',
      links: ['Casual Shoes', 'Boots', 'Sandals', 'Slippers'],
    },
    {
      title: 'HOME TEXTILE',
      links: ['Bedding', 'Pillows', 'Handkerchief Towels', 'Curtain'],
    },
    {
      title: 'LUXURY & DESIGNER',
      links: ['Towels', 'Bathroom Scales', 'Bath Mats', 'Shower Caps'],
    },
    {
      title: 'PARTY SUPPLIES',
      links: ['Event & Party', 'Christmas', 'Artificial Decorations', 'Wedding'],
    },
    {
      title: 'SPORT & OUTDOORS',
      links: ['Team Sports', 'Water Sports', 'Outdoor Recreation', 'Fitness Equipment'],
    },
    {
      title: 'COSMETICS',
      links: ['Shampoo and Conditioner', 'Styling Products', 'Hair Accessories', 'Men\'s Grooming'],
    },
    {
      title: 'CLOTHES',
      links: ['Bottoms', 'Women\'s Clothing', 'T-Shirts and Tops', 'Dresses', 'Outerwear', 'Formal Wear', 'Casual Wear', 'Seasonal Collections', 'Sports Bras', 'Workout Tops', 'Fall Wardrobe'],
    },
  ];

  const mainCategories = [
    { name: 'Woman', hasSubmenu: true },
    { name: 'Male', hasSubmenu: false },
    { name: 'Mother-Child', hasSubmenu: false },
    { name: 'Home & Furniture', hasSubmenu: false },
    { name: 'Super market', hasSubmenu: false },
    { name: 'Cosmetics', hasSubmenu: false },
    { name: 'Shoe & Bag', hasSubmenu: false },
    { name: 'Electronic', hasSubmenu: false },
    { name: 'Sport & Outdoor', hasSubmenu: false },
    { name: 'Best seller', hasSubmenu: false },
  ];

  const footerLinks = [
    { name: 'Login/Register', hasArrow: true },
    { name: 'Help & Support', hasArrow: true },
    { name: 'About us', hasArrow: true },
    { name: 'Blog', hasArrow: true },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] lg:hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50" 
        onClick={onClose}
      />
      
      {/* Menu Panel */}
      <div className="absolute inset-y-0 left-0 w-full max-w-sm bg-card overflow-y-auto animate-slide-in-left">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <button onClick={onClose} className="p-1">
            <X className="h-6 w-6 text-foreground" />
          </button>
          <h2 className="text-lg font-semibold text-foreground">Menu</h2>
          <div className="w-6" /> {/* Spacer for centering */}
        </div>

        {/* Woman Category Header */}
        <div className="p-4 border-b border-border">
          <button
            onClick={() => setExpandedCategory(expandedCategory === 'Woman' ? null : 'Woman')}
            className="text-accent font-medium"
          >
            Woman
          </button>
        </div>

        {/* Woman Submenu */}
        {expandedCategory === 'Woman' && (
          <div className="bg-muted/30 p-4 border-b border-border">
            <div className="grid grid-cols-2 gap-x-6 gap-y-4">
              {menuSections.map((section) => (
                <div key={section.title}>
                  <h3 className="font-bold text-foreground text-xs tracking-wide mb-2">
                    {section.title}
                  </h3>
                  <ul className="space-y-1.5">
                    {section.links.map((link) => (
                      <li key={link}>
                        <Link
                          to="/women"
                          onClick={onClose}
                          className="text-sm text-muted-foreground hover:text-accent transition-colors"
                        >
                          {link}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Other Categories */}
        <div className="border-b border-border">
          {mainCategories.slice(1).map((category) => (
            <Link
              key={category.name}
              to="/women"
              onClick={onClose}
              className="flex items-center justify-between px-4 py-3 text-muted-foreground hover:bg-muted/50 transition-colors"
            >
              <span>{category.name}</span>
            </Link>
          ))}
        </div>

        {/* Footer Links */}
        <div className="border-t border-border mt-4">
          {footerLinks.map((link) => (
            <Link
              key={link.name}
              to="/user"
              onClick={onClose}
              className="flex items-center justify-between px-4 py-3.5 text-foreground font-medium hover:bg-muted/50 transition-colors border-b border-border"
            >
              <span>{link.name}</span>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </Link>
          ))}
        </div>

        {/* Footer */}
        <div className="bg-muted/30 p-6 mt-4">
          <div className="grid grid-cols-2 gap-x-8 gap-y-4 text-sm">
            <div>
              <h4 className="font-semibold text-foreground mb-2">Company</h4>
              <ul className="space-y-1.5 text-muted-foreground">
                <li>About Us</li>
                <li>Our Store</li>
                <li>Contact us</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2">Career Opportunities</h4>
              <ul className="space-y-1.5 text-muted-foreground">
                <li>Selling Programs</li>
                <li>Advertise</li>
                <li>Cooperation</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2">How to Buy</h4>
              <ul className="space-y-1.5 text-muted-foreground">
                <li>Making Payments</li>
                <li>Delivery Options</li>
                <li>Buyer Protection</li>
                <li>New User Guide</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2">Help</h4>
              <ul className="space-y-1.5 text-muted-foreground">
                <li>Contacts Us</li>
                <li>FAQ</li>
                <li>Privacy Policy</li>
              </ul>
            </div>
          </div>
          
          {/* Payment Methods */}
          <div className="flex items-center gap-4 mt-6 pt-4 border-t border-border">
            <span className="text-xs text-muted-foreground font-semibold">VISA</span>
            <span className="text-xs text-muted-foreground font-semibold">MasterCard</span>
            <span className="text-xs text-muted-foreground font-semibold">PayPal</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
