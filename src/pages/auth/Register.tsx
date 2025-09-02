import { Link } from "react-router";
import DRegister from "@/assets/images/registerPic.jpg";
import { Helmet } from "react-helmet-async";
import Logo from "@/assets/icon/Logo";
import RegisterForm from "@/components/modules/RegisterForm";

const Register = () => {
    return (
        <div className="grid min-h-screen lg:grid-cols-2">
            <Helmet>
                <title>Register | Doctor Appointment</title>
                <meta name="description" content="Welcome to Doctor Appointment register page" />
            </Helmet>

            <div className="relative hidden lg:block">
                <img
                    src={DRegister}
                    alt="Register background"
                    className="absolute inset-0 h-full w-full brightness-95 dark:brightness-75"
                />
                <div className="absolute inset-0 bg-black/30" />
                <div className="absolute bottom-62 left-10 text-white max-w-md space-y-3">
                    <h2 className="text-3xl font-bold">Book Your Doctor Easily</h2>
                    <p className="text-lg opacity-90">
                        Fast, secure, and reliable appointment scheduling—built for you.
                    </p>
                </div>
            </div>

            <div className="flex flex-col justify-center px-6 sm:px-8 md:px-16 py-10 bg-background">
                <div className="mb-12 flex justify-center md:justify-start">
                    <Link
                        to="/"
                        className="flex items-center gap-3 text-lg font-semibold hover:opacity-90 transition-opacity"
                        aria-label="Go to homepage"
                    >
                        <Logo className="w-12 h-12 text-blue-500" />
                        <span className="sr-only">Go to homepage</span>
                        <p className="text-xl font-bold text-blue-500">Doctor Appointment</p>
                    </Link>
                </div>

                <div>
                    <div className="rounded-2xl border border-border p-8 shadow-lg">
                        <RegisterForm />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;