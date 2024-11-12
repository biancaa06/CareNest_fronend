import { useEffect, useState } from "react";
import { getAllSicknesses } from "../../services/SicknessRepository";
import { createCaretakerAccount } from "../../services/CaretakerRepository";
import { DevTool } from "@hookform/devtools";
import { useForm } from "react-hook-form";

function CaretakerSignUp({ baseUserId, handleSuccessfulCreation }) {
    const { register, control, handleSubmit, formState: { errors } } = useForm();
    
    const [sicknesses, setSicknesses] = useState([]);
    const [personalDescription, setPersonalDescription] = useState("");
    const [salary, setSalary] = useState(0);
    const [availability, setAvailability] = useState(0);
    const [selectedSicknesses, setSelectedSicknesses] = useState([]);
    const [error, setError] = useState(""); 

    const availabilityTypes = [
        { id: 1, name: "FULL_TIME" },
        { id: 2, name: "PART_TIME" }
    ];

    const fetchSicknesses = async () => {
        const response = await getAllSicknesses();
        setSicknesses(response.data);
    };

    useEffect(() => {
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
            setError("At least one specialisation is required.");
            return;
        }

        try {
            await createCaretakerAccount({
                baseUserId,
                personalDescription : data.personalDescription,
                salaryPerHour: parseFloat(data.salary),
                availabilityId: data.availability,
                specialisations: selectedSicknesses.map(s => s.id)
            });
            handleSuccessfulCreation();
        } catch (err) {
            const errorMessage = err.response?.data?.message || "An unexpected error occurred.";
            setError(errorMessage);
        }
    };

    return (
        <>
        <div className="signup-container">
            <h2 className="text-2xl font-bold text-center text-green-700 mb-6">Sign Up as Caretaker</h2>

            {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
            
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
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
                    {errors.personalDescription && <p className="text-red-500 text-sm">{errors.personalDescription.message}</p>}
                </div>

                <div className="mb-4">
                    <label htmlFor="salary" className="form-label text-lg text-gray-700 font-semibold mb-2">
                        Salary per hour
                    </label>
                    <input
                        type="number"
                        id="salary"
                        placeholder="Enter your hourly salary"
                        className="w-full input-field"
                        {...register("salary", { 
                            required: "Salary value is required" ,
                            min:{
                                value: 0,
                                message: "Salary must be between 0 and 100"
                            },
                            max: {
                                value:100,
                                message: "alary must be between 0 and 100"
                            }
                        })}
                        step="0.01"
                        min="0"
                        pattern="^\d+(\.\d{1,2})?$"
                    />
                    {errors.salary && <p className="text-red-500 text-sm">{errors.salary.message}</p>}
                </div>

                <div>
                    <label htmlFor="availability" className="form-label text-lg text-gray-700">
                        Availability
                    </label>
                    <select
                        id="availability"
                        className="form-control input-field"
                        
                        {...register("availability", { required: "Availability required" })}
                    >
                        <option value="">Select your availability</option>
                        {availabilityTypes.map((a) => (
                            <option key={a.id} value={a.id}>
                                {a.name}
                            </option>
                        ))}
                    </select>
                    {errors.availability && <p className="text-red-500 text-sm">{errors.availability.message}</p>}
                </div>

                <div className="mb-4">
                    <label className="form-label text-lg text-gray-700 font-semibold mb-2">
                        Select you specialisations
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
                        <label className="form-label text-lg text-gray-700 font-semibold mb-2">Selected specialisations</label>
                        <div className="flex flex-wrap max-h-10 overflow-y-auto gap-2">
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

                <button
                    type="submit"
                    className="submit-button w-full py-3 mt-6"
                >
                    Sign Up
                </button>
            </form>
            <DevTool control={control} />
        </div>
        </>
    )
}

export default CaretakerSignUp