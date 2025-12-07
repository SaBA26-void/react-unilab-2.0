import { Link } from 'react-router-dom';

const MegaMenu = () => {
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
      title: 'PARTY SUPPLIES',
      links: ['Event & Party', 'Christmas', 'Artificial Decorations', 'Wedding'],
    },
    {
      title: 'CLOTHES',
      links: ['Bottoms', 'Women\'s Clothing', 'T-Shirts and Tops', 'Dresses', 'Outerwear', 'Formal Wear', 'Casual Wear', 'Seasonal Collections', 'Sports Bras', 'Workout Tops', 'Fall Wardrobe'],
    },
    {
      title: 'LUXURY & DESIGNER',
      links: ['Towels', 'Bathroom Scales', 'Bath Mats', 'Shower Caps'],
    },
    {
      title: 'COSMETICS',
      links: ['Shampoo and Conditioner', 'Styling Products', 'Hair Accessories', 'Men\'s Grooming'],
    },
    {
      title: 'SPORT & OUTDOORS',
      links: ['Team Sports', 'Water Sports', 'Outdoor Recreation', 'Fitness Equipment'],
    },
  ];

  return (
    <div className="absolute top-full left-0 w-[1000px] bg-card shadow-lg border border-border animate-fade-in z-50">
      <div className="flex">
        {/* Menu Content */}
        <div className="flex-1 p-8">
          <div className="grid grid-cols-4 gap-x-8 gap-y-6">
            {/* First row - 4 columns */}
            {menuSections.slice(0, 4).map((section) => (
              <div key={section.title}>
                <h3 className="font-bold text-foreground mb-4 text-sm tracking-wide">{section.title}</h3>
                <ul className="space-y-2.5">
                  {section.links.map((link) => (
                    <li key={link}>
                      <Link
                        to="/women"
                        className="text-sm text-muted-foreground hover:text-accent transition-colors"
                      >
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            
            {/* Second row - remaining columns */}
            {menuSections.slice(4).map((section) => (
              <div key={section.title}>
                <h3 className="font-bold text-foreground mb-4 text-sm tracking-wide">{section.title}</h3>
                <ul className="space-y-2.5">
                  {section.links.map((link) => (
                    <li key={link}>
                      <Link
                        to="/women"
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
        
        {/* Featured Image - Hidden on tablets */}
        <div className="hidden xl:block w-[220px] flex-shrink-0">
          <div className="h-full">
            <img
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300&h=500&fit=crop"
              alt="Featured fashion"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MegaMenu;
