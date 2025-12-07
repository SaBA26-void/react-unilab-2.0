import { Link } from "react-router-dom";
import { Heart, Star, ShoppingBag } from "lucide-react";
import { Product } from "@/types/product";
import { Badge } from "@/components/ui/badge";
import CountdownTimer from "./CountdownTimer";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
  showCountdown?: boolean;
  variant?: "default" | "compact" | "featured" | "top100";
}

const ProductCard = ({
  product,
  showCountdown = false,
  variant = "default",
}: ProductCardProps) => {
  const placeholderImage =
    "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=500&fit=crop";
  const imageUrl = product.images?.[0] || placeholderImage;
  const starRating = Math.round(product.rating / 20);

  const [countdownExpired, setCountdownExpired] = useState(false);

  // Featured variant - New Arrivals card with dark bottom bar
  if (variant === "featured") {
    return (
      <Link
        to={`/product/${product.id}`}
        className="group block relative overflow-hidden rounded-xl w-[320px] h-[420px]"
      >
        {/* Image */}
        <img
          src={imageUrl}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            (e.target as HTMLImageElement).src = placeholderImage;
          }}
        />

        {/* New Arrivals Badge */}
        {product.isNew && (
          <Badge className="absolute top-4 left-4 bg-success text-primary-foreground text-xs px-3 py-1.5 flex items-center gap-1.5 rounded-md">
            <ShoppingBag className="h-3.5 w-3.5" />
            New Arrivals
          </Badge>
        )}

        {/* Bottom Dark Bar */}
        <div className="absolute inset-x-0 bottom-0 p-5 bg-foreground/95 rounded-b-xl">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-primary-foreground font-semibold text-lg mb-1">
                {product.title}
              </p>
              <p className="text-primary-foreground/60 text-sm">
                {product.short_description?.slice(0, 25)}
              </p>
            </div>
            <button className="bg-card text-foreground px-4 py-2.5 text-sm font-medium rounded-lg hover:bg-secondary transition-colors whitespace-nowrap">
              ${product.price.toFixed(0)} Shop Now
            </button>
          </div>
        </div>
      </Link>
    );
  }

  // Top100 variant - card with heart icon and star ratings
  if (variant === "top100") {
    return (
      <Link
        to={`/product/${product.id}`}
        className="group block bg-card rounded-xl overflow-hidden hover-lift w-full"
      >
        {/* Image Container */}
        <div className="relative aspect-[3/4] overflow-hidden bg-muted">
          <img
            src={imageUrl}
            alt={product.title}
            className="max-w-[300px] max-h-[327px] min-h-[327px] object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              (e.target as HTMLImageElement).src = placeholderImage;
            }}
          />
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex items-start justify-between gap-2 mb-1">
            <p className="font-semibold text-foreground">{product.brand}</p>
            <button
              className="p-1.5 border border-border rounded-full hover:bg-secondary transition-colors flex-shrink-0"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              <Heart className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>

          <p className="text-sm text-muted-foreground line-clamp-1 mb-2">
            {product.short_description}
          </p>

          {/* Star Rating */}
          <div className="flex items-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < starRating
                    ? "fill-yellow text-yellow"
                    : "fill-muted text-muted"
                }`}
              />
            ))}
            <span className="text-sm text-muted-foreground ml-1">
              ({product.rating})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="font-bold text-accent">
              ${product.price.toFixed(0)}
            </span>
            {product.oldPrice && (
              <>
                <span className="text-sm text-muted-foreground line-through">
                  ${product.oldPrice.toFixed(0)}
                </span>
                <span className="text-sm text-accent font-medium">
                  -{product.discountPercent}%
                </span>
              </>
            )}
          </div>
        </div>
      </Link>
    );
  }

  // Default variant - Deal of the Day card with countdown
  return (
    <Link
      to={`/product/${product.id}`}
      className="group block bg-card rounded-xl overflow-hidden hover-lift border border-border w-[280px] p-4"
    >
      {/* Countdown Timer */}
      {showCountdown && !countdownExpired && (
        <CountdownTimer onExpire={() => setCountdownExpired(true)} />
      )}

      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-muted rounded-lg mb-4">
        <img
          src={imageUrl}
          alt={product.title}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            (e.target as HTMLImageElement).src = placeholderImage;
          }}
        />
      </div>

      {/* Content */}
      <div>
        <p className="font-bold text-foreground text-lg mb-1">
          {product.brand}
        </p>
        <p className="text-sm text-muted-foreground line-clamp-1 mb-3">
          {product.short_description}
        </p>

        {/* Star Rating */}
        <div className="flex items-center gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < starRating
                  ? "fill-yellow text-yellow"
                  : "fill-muted text-muted"
              }`}
            />
          ))}
          <span className="text-sm text-muted-foreground ml-1">
            ({product.rating})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="font-bold text-accent text-lg">
            ${product.price.toFixed(2)}
          </span>
          {!countdownExpired && product.oldPrice && (
            <>
              <span className="text-sm text-muted-foreground line-through">
                ${product.oldPrice.toFixed(2)}
              </span>
              <Badge className="bg-destructive text-destructive-foreground text-xs px-2 py-0.5">
                -{product.discountPercent}%
              </Badge>
            </>
          )}
        </div>

        {/* Deal Ended Badge */}
        {countdownExpired && (
          <Badge className="mt-2 bg-muted text-muted-foreground text-xs px-2 py-0.5">
            Deal Ended
          </Badge>
        )}
      </div>
    </Link>
  );
};

export default ProductCard;
