import { useState } from "react";
import EmailInput from "../components/resetPassword/EmailInput";
import { verifyEmail } from "../services/ResetPasswordService";
import { useNavigate } from "react-router-dom";

const ResetPasswordPage = () => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const onSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        verifyEmail(email)
            .then(() => {
                navigate(`/reset-password/new`, { state: { email } });
            })
            .catch((error) => {
                const errorMessage =
                error.response?.data?.properties?.errors?.[0]?.error ||
                error.response?.data?.message ||
                "An unexpected error occurred."; 
                setError(errorMessage);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <div className="page-background">
            <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg px-20 py-6 mt-10 text-gray-700">
                {error && <p className="text-red-600 text-sm">{error}</p>}
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <EmailInput onSubmit={onSubmit} setEmail={setEmail} />
                )}
            </div>
        </div>
    );
};

export default ResetPasswordPage;
