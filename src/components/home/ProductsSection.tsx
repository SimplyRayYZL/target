import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart, Eye, Star, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useProducts } from "@/hooks/useProducts";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ProductCard from "@/components/products/ProductCard";

const ProductsSection = () => {
  const { data: products = [], isLoading } = useProducts();
  const { addToCart } = useCart();

  // Get first 8 products for homepage
  const featuredProducts = products.slice(0, 8);

  return (
    <section className="py-16 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header with animation */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 opacity-0 animate-[slide-up_0.8s_ease-out_forwards]">
          <div className="text-center md:text-right mb-6 md:mb-0">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              أحدث <span className="text-secondary">المنتجات</span>
            </h2>
            <p className="text-muted-foreground max-w-xl">
              اكتشف مجموعتنا الواسعة من التكييفات العصرية بأفضل الأسعار
            </p>
          </div>
          <Link to="/products">
            <Button variant="outline" className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground transition-all duration-300 hover:scale-105">
              عرض جميع المنتجات
            </Button>
          </Link>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="h-10 w-10 animate-spin text-secondary" />
          </div>
        ) : (
          <>
            {/* Mobile Carousel */}
            <div className="md:hidden">
              <Carousel
                opts={{
                  align: "center",
                  loop: true,
                }}
                className="w-full"
              >
                <CarouselContent className="-ml-2">
                  {featuredProducts.map((product, index) => (
                    <CarouselItem key={product.id} className="pl-2 basis-[75%]">
                      <ProductCard product={product} index={index} showCompare={false} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>

            {/* Desktop Grid */}
            <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default ProductsSection;
