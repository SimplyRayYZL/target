import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Mail, Phone, Lock, UserPlus, User, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const Register = () => {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const { signUp } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            toast.error("كلمة المرور غير متطابقة");
            return;
        }

        if (formData.password.length < 6) {
            toast.error("كلمة المرور يجب أن تكون 6 أحرف على الأقل");
            return;
        }

        setIsLoading(true);

        const { error, data } = await signUp(formData.email, formData.password, {
            full_name: formData.fullName,
            phone: formData.phone,
        });

        if (error) {
            // Check for existing account error
            const errorMessage = error.message?.toLowerCase() || '';
            if (errorMessage.includes("مسجل بالفعل") ||
                errorMessage.includes("already registered") ||
                errorMessage.includes("already exists") ||
                errorMessage.includes("user already") ||
                errorMessage.includes("email already")) {
                toast.error("هذا البريد الإلكتروني مسجل بالفعل! سجّل دخولك من صفحة تسجيل الدخول", { duration: 5000 });
            } else {
                toast.error(error.message || "فشل إنشاء الحساب");
            }
            setIsLoading(false);
            return;
        }

        // Show confirmation screen only on success
        setShowConfirmation(true);
        setIsLoading(false);
    };

    if (showConfirmation) {
        return (
            <>
                <Helmet>
                    <title>تأكيد البريد الإلكتروني | Dream For Trade</title>
                </Helmet>

                <Navbar />

                <div className="min-h-screen bg-gradient-to-b from-muted to-background py-20">
                    <div className="container max-w-md mx-auto px-4">
                        <Card className="shadow-xl border-0 text-center">
                            <CardHeader>
                                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <CheckCircle className="h-10 w-10 text-green-600" />
                                </div>
                                <CardTitle className="text-2xl">تم إنشاء الحساب!</CardTitle>
                                <CardDescription className="text-base mt-2">
                                    تم إرسال رابط تأكيد إلى بريدك الإلكتروني
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <p className="text-muted-foreground">
                                    يرجى فتح بريدك الإلكتروني والضغط على رابط التأكيد لتفعيل حسابك
                                </p>
                                <div className="bg-muted p-4 rounded-lg">
                                    <p className="text-sm font-medium">{formData.email}</p>
                                </div>
                            </CardContent>
                            <CardFooter className="justify-center">
                                <Link to="/login">
                                    <Button variant="outline">العودة لتسجيل الدخول</Button>
                                </Link>
                            </CardFooter>
                        </Card>
                    </div>
                </div>

                <Footer />
            </>
        );
    }

    return (
        <>
            <Helmet>
                <title>إنشاء حساب | Dream For Trade</title>
                <meta name="description" content="أنشئ حسابك في Dream For Trade للاستمتاع بتجربة تسوق مميزة" />
            </Helmet>

            <Navbar />

            <div className="min-h-screen bg-gradient-to-b from-muted to-background py-20">
                <div className="container max-w-md mx-auto px-4">
                    <Card className="shadow-xl border-0">
                        <CardHeader className="text-center pb-2">
                            <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                <UserPlus className="h-8 w-8 text-secondary" />
                            </div>
                            <CardTitle className="text-2xl">إنشاء حساب جديد</CardTitle>
                            <CardDescription>
                                أنشئ حسابك للاستمتاع بتجربة تسوق مميزة
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="fullName">الاسم الكامل</Label>
                                    <div className="relative">
                                        <User className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="fullName"
                                            name="fullName"
                                            type="text"
                                            placeholder="أحمد محمد"
                                            value={formData.fullName}
                                            onChange={handleChange}
                                            className="pr-10"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email">البريد الإلكتروني</Label>
                                    <div className="relative">
                                        <Mail className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="email"
                                            name="email"
                                            type="email"
                                            placeholder="example@email.com"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="pr-10"
                                            required
                                            dir="ltr"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="phone">رقم الهاتف <span className="text-muted-foreground text-xs">(اختياري)</span></Label>
                                    <div className="relative">
                                        <Phone className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="phone"
                                            name="phone"
                                            type="tel"
                                            placeholder="01xxxxxxxxx"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="pr-10"
                                            dir="ltr"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="password">كلمة المرور</Label>
                                    <div className="relative">
                                        <Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="password"
                                            name="password"
                                            type="password"
                                            placeholder="6 أحرف على الأقل"
                                            value={formData.password}
                                            onChange={handleChange}
                                            className="pr-10"
                                            required
                                            minLength={6}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="confirmPassword">تأكيد كلمة المرور</Label>
                                    <div className="relative">
                                        <Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            type="password"
                                            placeholder="أعد كتابة كلمة المرور"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            className="pr-10"
                                            required
                                        />
                                    </div>
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground gap-2"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                    ) : (
                                        <UserPlus className="h-4 w-4" />
                                    )}
                                    {isLoading ? "جاري إنشاء الحساب..." : "إنشاء الحساب"}
                                </Button>
                            </form>
                        </CardContent>
                        <CardFooter className="justify-center">
                            <p className="text-sm text-muted-foreground">
                                لديك حساب بالفعل؟{" "}
                                <Link to="/login" className="text-secondary hover:underline font-medium">
                                    سجّل الدخول
                                </Link>
                            </p>
                        </CardFooter>
                    </Card>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default Register;
