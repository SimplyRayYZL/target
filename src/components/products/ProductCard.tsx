import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart, Scale, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { useCompare } from "@/contexts/CompareContext";
import { toast } from "sonner";
import type { Product } from "@/hooks/useProducts";

// Fallback images
import acProduct1 from "@/assets/products/ac-white-1.png";
import acProduct2 from "@/assets/products/ac-white-2.png";
import acProduct3 from "@/assets/products/ac-white-3.png";
import acProduct4 from "@/assets/products/ac-white-4.png";

const fallbackImages = [acProduct1, acProduct2, acProduct3, acProduct4];

interface ProductCardProps {
  product: Product;
  index?: number;
  showCompare?: boolean;
}

const ProductCard = ({ product, index = 0, showCompare = true }: ProductCardProps) => {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { addToCompare, removeFromCompare, isInCompare } = useCompare();

  const getProductImage = () => {
    if (product.image_url) {
      return product.image_url;
    }
    return fallbackImages[index % fallbackImages.length];
  };

  const productIdNum = parseInt(product.id) || index + 1;

  const createCompatibleProduct = () => ({
    id: productIdNum,
    name: product.name,
    brand: product.brand,
    price: product.price,
    oldPrice: product.oldPrice || undefined,
    rating: product.rating,
    reviews: product.reviews,
    capacity: product.capacity || "",
    type: product.type || "",
    features: product.features,
    model: product.model || undefined,
    image: product.image_url || fallbackImages[index % fallbackImages.length],
  });

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(createCompatibleProduct());
    toast.success("تمت الإضافة إلى السلة");
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isInWishlist(productIdNum)) {
      removeFromWishlist(productIdNum);
      toast.success("تمت الإزالة من المفضلة");
    } else {
      addToWishlist(createCompatibleProduct());
      toast.success("تمت الإضافة للمفضلة");
    }
  };

  const handleCompareToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isInCompare(productIdNum)) {
      removeFromCompare(productIdNum);
      toast.success("تمت الإزالة من المقارنة");
    } else {
      addToCompare(createCompatibleProduct());
    }
  };

  return (
    <div
      className="group card-dream overflow-hidden opacity-0 animate-[slide-up_0.6s_ease-out_forwards]"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <Link to={`/product/${product.id}`}>
        <div className="relative aspect-[4/3] bg-gradient-to-br from-muted to-background rounded-xl mb-4 overflow-hidden">
          {product.oldPrice && (
            <div className="absolute top-3 right-3 bg-destructive text-destructive-foreground px-3 py-1 rounded-full text-sm font-bold z-10">
              خصم {Math.round((1 - product.price / product.oldPrice) * 100)}%
            </div>
          )}
          <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
            <button
              onClick={handleWishlistToggle}
              className={`w-9 h-9 rounded-full shadow-md flex items-center justify-center transition-all ${isInWishlist(productIdNum)
                ? "bg-destructive text-white"
                : "bg-card hover:bg-destructive hover:text-white"
                }`}
            >
              <Heart className={`h-4 w-4 ${isInWishlist(productIdNum) ? "fill-current" : ""}`} />
            </button>
            {showCompare && (
              <button
                onClick={handleCompareToggle}
                className={`w-9 h-9 rounded-full shadow-md flex items-center justify-center transition-all ${isInCompare(productIdNum)
                  ? "bg-secondary text-secondary-foreground"
                  : "bg-card hover:bg-secondary hover:text-secondary-foreground"
                  }`}
              >
                <Scale className="h-4 w-4" />
              </button>
            )}
          </div>
          <img
            src={getProductImage()}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-contain p-4 transition-all duration-500 group-hover:scale-110"
            onError={(e) => {
              e.currentTarget.src = fallbackImages[index % fallbackImages.length];
            }}
          />
          <div className="absolute bottom-3 right-3 bg-card/90 backdrop-blur-sm px-3 py-1 rounded-lg text-sm font-medium z-10">
            {product.brand}
          </div>
        </div>
      </Link>
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? "fill-dream-gold text-dream-gold" : "text-muted"}`} />
            ))}
          </div>
          <span className="text-sm text-muted-foreground">({product.reviews})</span>
        </div>
        <Link to={`/product/${product.id}`}>
          <h3 className="font-bold text-lg text-foreground group-hover:text-secondary transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>
        <div className="flex flex-wrap gap-2">
          {product.features.slice(0, 3).map((feature) => (
            <span key={feature} className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-md">
              {feature}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-2 pt-2">
          {product.price > 0 ? (
            <>
              <span className="text-2xl font-bold text-secondary">{product.price.toLocaleString()}</span>
              <span className="text-sm text-muted-foreground">ج.م</span>
              {product.oldPrice && (
                <span className="text-sm text-muted-foreground line-through">{product.oldPrice.toLocaleString()}</span>
              )}
            </>
          ) : (
            <span className="text-lg font-bold text-secondary">اتصل للسعر</span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <a
            href={`https://wa.me/201289006310?text=${encodeURIComponent(
              `🛒 *استفسار عن منتج*\n\n` +
              `📦 *المنتج:* ${product.name}\n` +
              `🏷️ *الماركة:* ${product.brand}\n` +
              `💰 *السعر:* ${product.price > 0 ? `${product.price.toLocaleString()} ج.م` : 'اتصل للسعر'}\n` +
              (product.oldPrice ? `🔥 *السعر قبل الخصم:* ${product.oldPrice.toLocaleString()} ج.م\n` : '') +
              `⭐ *التقييم:* ${product.rating}/5 (${product.reviews} تقييم)\n` +
              (product.features.length > 0 ? `✨ *المميزات:* ${product.features.slice(0, 3).join('، ')}\n` : '') +
              `\nأريد الاستفسار عن هذا المنتج`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="w-full"
          >
            <Button
              className="w-full bg-green-500 hover:bg-green-600 text-white border-green-500 hover:border-green-600 h-10 gap-2"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              تواصل واتساب
            </Button>
          </a>
          <Button
            onClick={handleAddToCart}
            className="w-full bg-secondary hover:bg-accent text-secondary-foreground gap-2 transition-all duration-300 hover:scale-[1.02] h-10"
          >
            <ShoppingCart className="h-4 w-4" />
            أضف للسلة
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
