import { useState } from "react";
import { Link } from "react-router";
import { Menu, X } from "lucide-react";
import Logo from "@/assets/icon/Logo";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-blue-500 text-white shadow-md">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                {/* Brand Logo */}
                <Link
                    to="/"
                    className="flex items-center gap-2 text-2xl font-bold"
                >
                    <Logo className="w-8 h-8" />
                    <span>Doctor Appointment</span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-6">
                    <Link to="/" className="hover:underline">
                        Home
                    </Link>
                    <Link to="/about" className="hover:underline">
                        About
                    </Link>
                    <Link to="/services" className="hover:underline">
                        Services
                    </Link>
                    <Link to="/contact" className="hover:underline">
                        Contact
                    </Link>
                    <Link
                        to="/login"
                        className="bg-white text-blue-500 px-4 py-2 rounded-lg font-medium hover:bg-blue-100 transition"
                    >
                        Login
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle menu"
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-blue-600 px-6 py-4 flex flex-col gap-4">
                    <Link to="/" className="hover:underline" onClick={() => setIsOpen(false)}>
                        Home
                    </Link>
                    <Link to="/about" className="hover:underline" onClick={() => setIsOpen(false)}>
                        About
                    </Link>
                    <Link to="/services" className="hover:underline" onClick={() => setIsOpen(false)}>
                        Services
                    </Link>
                    <Link to="/contact" className="hover:underline" onClick={() => setIsOpen(false)}>
                        Contact
                    </Link>
                    <Link
                        to="/login"
                        className="bg-white text-blue-500 px-4 py-2 rounded-lg font-medium hover:bg-blue-100 transition text-center"
                        onClick={() => setIsOpen(false)}
                    >
                        Login
                    </Link>
                </div>
            )}
        </nav>
    );
};

export default Navbar;