import React, { useState, useEffect } from "react";
import '../../css/signup.css';
import { getAllSicknesses } from "../../services/SicknessRepository";
import { createPatientAccount } from "../../services/PatientRepository";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

function PatientSignUp({ baseUserId, handleSuccessfulCreation }) {

    const { register, control, handleSubmit, formState: { errors } } = useForm();
    const [sicknesses, setSicknesses] = useState([]);
    const [selectedSicknesses, setSelectedSicknesses] = useState([]);
    const [error, setError] = useState(""); 

    useEffect(() => {
        const fetchSicknesses = async () => {
            const response = await getAllSicknesses();
            setSicknesses(response.data);
        };
        fetchSicknesses();
    }, []);

    const handleSelectSickness = (sickness) => {
        if (!selectedSicknesses.some((s) => s.id === sickness.id)) {
            setSelectedSicknesses([...selectedSicknesses, sickness]);
        }
    };

    const handleRemoveSickness = (sicknessId) => {
        setSelectedSicknesses(selectedSicknesses.filter((s) => s.id !== sicknessId));
    };

    const onSubmit = async (data) => {
        setError(null);

        if (selectedSicknesses.length === 0) {
            setError("Please select at least one sickness.");
            return;
        }

        console.log(data);
        try {
            await createPatientAccount({
                baseUserId,
                personalDescription: data.personalDescription,
                sicknesses: selectedSicknesses.map(s => s.id)
            });
            handleSuccessfulCreation();
        } catch (err) {
            setError(err.response?.data?.detail || "An error occurred");
        }
    };

    return (
        <div className="signup-container">
            <h2 className="text-2xl font-bold text-center text-green-700 mb-6">Sign Up as Patient</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                    <label htmlFor="description" className="form-label text-lg text-gray-700 font-semibold mb-2">
                        Personal Description
                    </label>
                    <input
                        type="text"
                        id="description"
                        placeholder="Write something about you..."
                        className="w-full input-field"
                        {...register("personalDescription", { 
                            required: "Personal description is required", 
                            maxLength: {
                                value: 500,
                                message: "Personal description cannot exceed 500 characters"
                            } 
                        })}
                    />
                    {errors.personalDescription && <p className="text-red-600 text-sm">{errors.personalDescription.message}</p>}
                </div>

                <div className="mb-4">
                    <label className="form-label text-lg text-gray-700 font-semibold mb-2">
                        Select Sicknesses
                    </label>
                    <div className="max-h-32 overflow-y-auto bg-gray-50 border border-gray-200 rounded-lg p-2">
                        <div className="grid grid-cols-2 gap-2">
                            {sicknesses.map((sickness) => (
                                <button
                                    key={sickness.id}
                                    type="button"
                                    onClick={() => handleSelectSickness(sickness)}
                                    className={`px-2 py-1 rounded-lg text-sm font-medium text-gray-800 border ${
                                        selectedSicknesses.some((s) => s.id === sickness.id)
                                            ? "bg-blue-200 border-blue-400"
                                            : "bg-gray-100 border-gray-300 hover:bg-gray-200"
                                    }`}
                                >
                                    {sickness.name}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {selectedSicknesses.length > 0 && (
                    <div className="mb-4">
                        <label className="form-label text-lg text-gray-700 font-semibold mb-2">Selected Sicknesses</label>
                        <div className="flex flex-wrap gap-2">
                            {selectedSicknesses.map((sickness) => (
                                <div
                                    key={sickness.id}
                                    className="flex items-center px-2 py-0.5 bg-blue-100 text-blue-700 rounded-md border border-blue-300 text-sm"
                                >
                                    <span className="mr-2">{sickness.name}</span>
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveSickness(sickness.id)}
                                        className="text-blue-500 hover:text-blue-700 font-bold text-xs"
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {error && <p className="text-red-600 text-sm mt-2">{error}</p>}

                <button
                    type="submit"
                    className="submit-button w-full py-3 mt-6"
                >
                    Sign Up
                </button>
            </form>
            
            <DevTool control={control} />
        </div>
    );
}

export default PatientSignUp;
