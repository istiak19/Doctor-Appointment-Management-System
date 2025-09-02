import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router";

const Home = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <Helmet>
                <title>Doctor Appointment</title>
                <meta name="description" content="Welcome to Doctor Appointment home page" />
            </Helmet>

            {/* Hero Section */}
            <section className="bg-blue-500 text-white py-20">
                <div className="container mx-auto px-6 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        Welcome to Doctor Appointment
                    </h1>
                    <p className="text-lg md:text-xl mb-6 max-w-2xl mx-auto">
                        A modern platform to connect Patients and Doctors easily.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Link to="/login">
                            <Button className="bg-white text-blue-500 hover:bg-gray-200">
                                Login
                            </Button>
                        </Link>
                        <Link to="/register">
                            <Button className="bg-transparent border border-white hover:bg-white hover:text-blue-500">
                                Register
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 container mx-auto px-6">
                <h2 className="text-3xl font-bold text-center mb-12 text-blue-500">
                    Why Choose Us?
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <Card className="shadow-lg border border-blue-100">
                        <CardContent className="p-6 text-center">
                            <h3 className="text-xl font-semibold mb-2 text-blue-500">
                                Easy Appointment
                            </h3>
                            <p className="text-gray-600">
                                Book your appointment with doctors in just a few clicks.
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="shadow-lg border border-blue-100">
                        <CardContent className="p-6 text-center">
                            <h3 className="text-xl font-semibold mb-2 text-blue-500">
                                Verified Doctors
                            </h3>
                            <p className="text-gray-600">
                                Connect with highly qualified and trusted medical professionals.
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="shadow-lg border border-blue-100">
                        <CardContent className="p-6 text-center">
                            <h3 className="text-xl font-semibold mb-2 text-blue-500">
                                Secure Platform
                            </h3>
                            <p className="text-gray-600">
                                Your data is safe with our encrypted system and secure login.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-blue-50 py-16">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-2xl md:text-3xl font-bold mb-4 text-blue-500">
                        Start your journey with us today
                    </h2>
                    <p className="text-gray-600 mb-6">
                        Whether you are a patient or a doctor, MediCare is here to help you
                        connect.
                    </p>
                    <Link to="/register">
                        <Button className="bg-blue-500 text-white hover:bg-blue-600">
                            Get Started
                        </Button>
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Home;