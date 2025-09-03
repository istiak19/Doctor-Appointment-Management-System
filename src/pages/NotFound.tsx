import { Helmet } from "react-helmet-async";
import { Link } from "react-router";

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen text-center">
            <Helmet>
                <title>Not Found | Doctor Appointment</title>
                <meta name="description" content="Welcome to Doctor Appointment Not Found page" />
            </Helmet>

            <h1 className="text-6xl font-bold text-red-500">404</h1>
            <p className="text-xl mt-4 text-gray-600">Page Not Found</p>
            <Link
                to="/"
                className="mt-6 bg-blue-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-600 transition"
            >
                Go Home
            </Link>
        </div>
    );
};

export default NotFound;