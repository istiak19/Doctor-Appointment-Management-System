const Footer = () => {
    return (
        <footer className="bg-blue-500 text-white py-8 mt-12">
            <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
                {/* Brand */}
                <div className="text-center md:text-left">
                    <h2 className="text-2xl font-bold">Doctor Appointment</h2>
                    <p className="text-sm text-blue-100">
                        Connecting Patients and Doctors with Care
                    </p>
                </div>

                {/* Quick Links */}
                <div className="flex flex-wrap justify-center gap-6 text-sm">
                    <a href="/" className="hover:underline">
                        Home
                    </a>
                    <a href="/about" className="hover:underline">
                        About
                    </a>
                    <a href="/services" className="hover:underline">
                        Services
                    </a>
                    <a href="/contact" className="hover:underline">
                        Contact
                    </a>
                </div>

                {/* Copyright */}
                <div className="text-center md:text-right text-sm text-blue-100">
                    © {new Date().getFullYear()} Doctor Appointment. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;