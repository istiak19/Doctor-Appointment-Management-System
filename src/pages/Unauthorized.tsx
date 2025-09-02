import { Link } from "react-router";

const Unauthorized = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-2xl p-8 text-center max-w-md">
                <h1 className="text-4xl font-bold text-red-600 mb-4">403</h1>
                <h2 className="text-2xl font-semibold mb-2">Unauthorized Access</h2>
                <p className="text-gray-600 mb-6">
                    Sorry, you don’t have permission to view this page.
                </p>

                <div className="flex gap-4 justify-center">
                    <Link
                        to="/"
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                        Go Home
                    </Link>
                    <Link
                        to="/login"
                        className="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
                    >
                        Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Unauthorized;