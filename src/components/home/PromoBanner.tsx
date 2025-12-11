import { Link } from "react-router-dom";

interface PromoBannerProps {
    variant?: "quality" | "support";
}

const PromoBanner = ({ variant = "quality" }: PromoBannerProps) => {
    if (variant === "quality") {
        // Banner between Products and Features - about quality
        return (
            <section className="py-4 md:py-6">
                <div className="container mx-auto px-4">
                    <Link to="/products" className="block">
                        <div className="relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group">
                            <img
                                src="/banner-quality.png"
                                alt="جودة عالمية - ضمان شامل"
                                className="w-full h-auto object-cover max-h-[150px] md:max-h-[200px] lg:max-h-[250px]"
                            />
                            {/* Hover overlay */}
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
                        </div>
                    </Link>
                </div>
            </section>
        );
    }

    // Support variant - Banner between Testimonials and CTA
    return (
        <section className="py-4 md:py-6">
            <div className="container mx-auto px-4">
                <Link to="/contact" className="block">
                    <div className="relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group">
                        <img
                            src="/banner-support.png"
                            alt="فريقنا جاهز لمساعدتك"
                            className="w-full h-auto object-cover max-h-[150px] md:max-h-[200px] lg:max-h-[250px]"
                        />
                        {/* Hover overlay */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
                    </div>
                </Link>
            </div>
        </section>
    );
};

export default PromoBanner;
