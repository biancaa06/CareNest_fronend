import { useNavigate } from "react-router-dom";

function Unauthorized_GoToLogin({ message }) {
    const navigate = useNavigate();

    const handleGoToLogin = () => {
        navigate("/login");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-md w-full bg-white shadow-md rounded-lg p-6 text-center">
                <h2 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h2>
                <p className="text-gray-700 mb-6">{message || "You do not have permission to access this page."}</p>
                <button
                    onClick={handleGoToLogin}
                    className="px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 transition duration-200"
                >
                    Go to Login
                </button>
            </div>
        </div>
    );
}

export default Unauthorized_GoToLogin;
