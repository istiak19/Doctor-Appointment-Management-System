import { useState } from "react";
import { Link } from "react-router";
import { Menu, X } from "lucide-react";
import Logo from "@/assets/icon/Logo";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const userStr = localStorage.getItem("user");
    const user = userStr ? JSON.parse(userStr) : null;
    const role = user?.role;

    return (
        <nav className="bg-blue-500 text-white shadow-md">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">

                <Link
                    to="/"
                    className="flex items-center gap-2 text-2xl font-bold"
                >
                    <Logo className="w-8 h-8" />
                    <span>Doctor Appointment</span>
                </Link>

                <div className="hidden md:flex items-center gap-6">
                    <Link to="/" className="hover:underline">Home</Link>
                    <Link to="/about" className="hover:underline">About</Link>
                    <Link to="/services" className="hover:underline">Services</Link>
                    <Link to="/contact" className="hover:underline">Contact</Link>

                    {role === "PATIENT" && (
                        <Link to="/patient/dashboard" className="hover:underline">
                            Dashboard
                        </Link>
                    )}
                    {role === "DOCTOR" && (
                        <Link to="/doctor/dashboard" className="hover:underline">
                            Dashboard
                        </Link>
                    )}
                    <Link
                        to="/login"
                        className="bg-white text-blue-500 px-4 py-2 rounded-lg font-medium hover:bg-blue-100 transition"
                    >
                        Login
                    </Link>
                </div>

                <button
                    className="md:hidden"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle menu"
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {isOpen && (
                <div className="md:hidden bg-blue-600 px-6 py-4 flex flex-col gap-4">
                    <Link to="/" className="hover:underline" onClick={() => setIsOpen(false)}>Home</Link>
                    <Link to="/about" className="hover:underline" onClick={() => setIsOpen(false)}>About</Link>
                    <Link to="/services" className="hover:underline" onClick={() => setIsOpen(false)}>Services</Link>
                    <Link to="/contact" className="hover:underline" onClick={() => setIsOpen(false)}>Contact</Link>

                    {role === "PATIENT" && (
                        <Link to="/patient/dashboard" className="hover:underline" onClick={() => setIsOpen(false)}>
                            Dashboard
                        </Link>
                    )}
                    {role === "DOCTOR" && (
                        <Link to="/doctor/dashboard" className="hover:underline" onClick={() => setIsOpen(false)}>
                            Dashboard
                        </Link>
                    )}
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