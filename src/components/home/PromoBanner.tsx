import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Percent, Truck } from "lucide-react";

interface PromoBannerProps {
    variant?: "deals" | "installation";
}

const PromoBanner = ({ variant = "deals" }: PromoBannerProps) => {
    if (variant === "deals") {
        return (
            <section className="py-8 md:py-12">
                <div className="container mx-auto px-4">
                    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary via-primary/90 to-secondary/80 shadow-2xl">
                        {/* Background decorations */}
                        <div className="absolute top-0 left-0 w-40 h-40 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
                        <div className="absolute bottom-0 right-0 w-60 h-60 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3" />
                        <div className="absolute top-1/2 left-1/4 w-20 h-20 bg-secondary/20 rounded-full blur-xl" />

                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between p-6 md:p-10 gap-6">
                            {/* Text Content */}
                            <div className="text-center md:text-right space-y-4 max-w-xl">
                                <div className="inline-flex items-center gap-2 bg-secondary/20 backdrop-blur-sm px-4 py-2 rounded-full">
                                    <Percent className="h-5 w-5 text-secondary" />
                                    <span className="text-sm font-medium text-white">عروض حصرية</span>
                                </div>
                                <h2 className="text-2xl md:text-4xl font-bold text-white leading-tight">
                                    وفّر حتى <span className="text-secondary">30%</span>
                                    <br />
                                    على تكييفات الموسم
                                </h2>
                                <p className="text-white/80 text-sm md:text-base">
                                    استمتع بأقوى العروض على أفضل ماركات التكييفات العالمية مع ضمان شامل وتركيب مجاني
                                </p>
                                <Link to="/products">
                                    <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold gap-2 h-12 px-8">
                                        تسوق الآن
                                        <ArrowLeft className="h-5 w-5" />
                                    </Button>
                                </Link>
                            </div>

                            {/* Image/Icon */}
                            <div className="flex-shrink-0">
                                <div className="w-32 h-32 md:w-48 md:h-48 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center">
                                    <div className="text-center">
                                        <span className="text-4xl md:text-6xl font-bold text-secondary">30%</span>
                                        <p className="text-white/80 text-sm">خصم</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    // Installation variant
    return (
        <section className="py-8 md:py-12">
            <div className="container mx-auto px-4">
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-50 via-blue-50 to-slate-100 shadow-xl border border-blue-100">
                    {/* Background decorations */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full translate-x-1/3 -translate-y-1/3" />
                    <div className="absolute bottom-0 left-0 w-40 h-40 bg-secondary/10 rounded-full -translate-x-1/3 translate-y-1/3" />

                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between p-6 md:p-10 gap-6">
                        {/* Icon/Image */}
                        <div className="flex-shrink-0 order-2 md:order-1">
                            <div className="w-28 h-28 md:w-40 md:h-40 bg-primary/10 rounded-2xl flex items-center justify-center">
                                <Truck className="h-14 w-14 md:h-20 md:w-20 text-primary" />
                            </div>
                        </div>

                        {/* Text Content */}
                        <div className="text-center md:text-right space-y-4 max-w-xl order-1 md:order-2">
                            <div className="inline-flex items-center gap-2 bg-green-100 px-4 py-2 rounded-full">
                                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                <span className="text-sm font-medium text-green-700">خدمة مجانية</span>
                            </div>
                            <h2 className="text-2xl md:text-4xl font-bold text-primary leading-tight">
                                تركيب مجاني
                                <br />
                                <span className="text-secondary">لجميع المحافظات</span>
                            </h2>
                            <p className="text-muted-foreground text-sm md:text-base">
                                فريق متخصص للتركيب والصيانة في جميع أنحاء الجمهورية
                            </p>
                            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
                                    <span className="w-2 h-2 bg-primary rounded-full" />
                                    <span className="text-sm font-medium">فنيين محترفين</span>
                                </div>
                                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
                                    <span className="w-2 h-2 bg-secondary rounded-full" />
                                    <span className="text-sm font-medium">ضمان على التركيب</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PromoBanner;
