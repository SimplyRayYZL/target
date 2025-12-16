import React, { useState, useEffect } from "react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    id: 1,
    name: "أحمد محمد",
    location: "مدينة نصر",
    rating: 5,
    text: "ممتازين جداً! ركبت تكييف شارب انفرتر من تارجت وفرق فاتورة الكهرباء واضح. الفريق محترم والتركيب كان سريع واحترافي.",
    date: "منذ أسبوع",
  },
  {
    id: 2,
    name: "منى السيد",
    location: "المعادي",
    rating: 5,
    text: "أفضل تجربة شراء تكييف. الأسعار أحسن من السوق والضمان 5 سنين. تكييف كاريير 2.25 حصان شغال زي الفل.",
    date: "منذ أسبوعين",
  },
  {
    id: 3,
    name: "عمر حسين",
    location: "الهرم",
    rating: 5,
    text: "اشتريت 4 تكييفات للشركة من تارجت. التوصيل كان في نفس اليوم والتركيب مجاني. خدمة عملاء ممتازة ومتابعة بعد البيع.",
    date: "منذ شهر",
  },
  {
    id: 4,
    name: "نورهان أحمد",
    location: "مصر الجديدة",
    rating: 5,
    text: "جربت أماكن كتير قبل ما ألاقي تارجت. صراحة الفرق واضح في الأسعار والمعاملة. الفني اللي جه كان محترف جداً.",
    date: "منذ 3 أسابيع",
  },
  {
    id: 5,
    name: "كريم عبدالله",
    location: "الشيراتون",
    rating: 5,
    text: "تكييف ميديا انفرتر ممتاز وموفر في الكهرباء. تارجت قدموا أحسن سعر وضمان شامل. شكراً للفريق المحترم.",
    date: "منذ أسبوعين",
  },
  {
    id: 6,
    name: "ياسمين فؤاد",
    location: "الدقي",
    rating: 5,
    text: "خدمة صيانة ممتازة! التكييف كان عنده مشكلة بسيطة وجم في نفس اليوم وصلحوه. بنصح الكل يتعامل مع تارجت.",
    date: "منذ شهر",
  },
];

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-play every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-16 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="section-title">آراء عملائنا</h2>
          <p className="text-muted-foreground text-lg">
            ماذا يقول عملاؤنا عن تجربتهم معنا
          </p>
        </div>

        <div className="max-w-2xl mx-auto relative">
          {/* Navigation Arrows */}
          <Button
            variant="outline"
            size="icon"
            onClick={goToPrevious}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 sm:translate-x-12 z-10 rounded-full bg-background shadow-lg hover:bg-secondary hover:text-secondary-foreground"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={goToNext}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 sm:-translate-x-12 z-10 rounded-full bg-background shadow-lg hover:bg-secondary hover:text-secondary-foreground"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          {/* Testimonial Card */}
          <div className="card-dream flex flex-col items-center text-center mx-8 sm:mx-0 transition-all duration-500">
            <Quote className="h-10 w-10 text-secondary/30 mb-6" />

            <div className="flex items-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${i < currentTestimonial.rating
                      ? "fill-dream-gold text-dream-gold"
                      : "text-muted"
                    }`}
                />
              ))}
            </div>

            <p className="text-foreground text-lg leading-relaxed mb-6">
              "{currentTestimonial.text}"
            </p>

            <div className="border-t pt-4 w-full">
              <p className="font-bold text-foreground text-lg">{currentTestimonial.name}</p>
              <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                <span>{currentTestimonial.location}</span>
                <span>•</span>
                <span>{currentTestimonial.date}</span>
              </div>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${index === currentIndex
                    ? "bg-secondary w-6"
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
