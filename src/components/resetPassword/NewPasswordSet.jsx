import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { resetPassword } from "../../services/ResetPasswordService";

function NewPasswordSet() {
    const location = useLocation();
    const { email } = location.state || {};
    const [error, setError] = useState(null);

    const {register, handleSubmit, watch, formState: { errors }} = useForm();

    const navigate = useNavigate();

    const onSubmit = async(data) => {
        await resetPassword({
            email, 
            resetCode: data.resetCode, 
            newPassword: data.newPassword,
        })
        .then(() => {
            navigate(`/login`);
        })
        .catch((error) => {
            const errorMessage =
            error.response?.data?.properties?.errors?.[0]?.error ||
            error.response?.data?.message ||
            "An unexpected error occurred."; 
            setError(errorMessage);
        });
    };

    const newPassword = watch("newPassword");

    return (
        <div className="page-background">
            <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg px-12 py-8 mt-10 text-gray-700">
                <h2 className="text-3xl font-bold text-center text-green-700 mb-6">Set New Password</h2>
                {error && <p className="text-red-600 text-sm">{error}</p>}
                <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-base font-medium text-gray-600 mb-1">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            readOnly
                            className="w-full border rounded-lg p-2 bg-gray-100 text-gray-500 focus:outline-none"
                        />
                    </div>

                    <div>
                        <label htmlFor="resetCode" className="block text-base font-medium text-gray-600 mb-1">
                            Reset Code
                        </label>
                        <input
                            type="text"
                            id="resetCode"
                            className={`w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-700 ${
                                errors.resetCode ? "border-red-500" : ""
                            }`}
                            placeholder="Enter your reset code"
                            {...register("resetCode", {
                                required: "Reset code is required",
                            })}
                        />
                        {errors.resetCode && (
                            <p className="text-red-500 text-sm mt-1">{errors.resetCode.message}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="newPassword" className="block text-base font-medium text-gray-600 mb-1">
                            New Password
                        </label>
                        <input
                            type="password"
                            id="newPassword"
                            className={`w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-700 ${
                                errors.newPassword ? "border-red-500" : ""
                            }`}
                            placeholder="Enter your new password"
                            {...register("newPassword", {
                                required: "New password is required",
                                minLength: {
                                    value: 6,
                                    message: "Password must be at least 6 characters long",
                                },
                            })}
                        />
                        {errors.newPassword && (
                            <p className="text-red-500 text-sm mt-1">{errors.newPassword.message}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="repeatPassword" className="block text-base font-medium text-gray-600 mb-1">
                            Repeat New Password
                        </label>
                        <input
                            type="password"
                            id="repeatPassword"
                            className={`w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-700 ${
                                errors.repeatPassword ? "border-red-500" : ""
                            }`}
                            placeholder="Repeat your new password"
                            {...register("repeatPassword", {
                                required: "Please confirm your password",
                                validate: (value) =>
                                    value === newPassword || "Passwords do not match",
                            })}
                        />
                        {errors.repeatPassword && (
                            <p className="text-red-500 text-sm mt-1">{errors.repeatPassword.message}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 transition duration-200"
                    >
                        Set Password
                    </button>
                </form>
            </div>
        </div>
    );
}

export default NewPasswordSet;
