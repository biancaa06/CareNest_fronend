import { useState } from "react";
import { createBaseUser } from "../../services/UserRepository";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

function RegisterBaseUserForm({ handleBaseUserCreated, handleContinueAsPatient, handleContinueAsCaretaker }) {
    const { register, control, handleSubmit, formState: { errors } } = useForm();

    const [createPatient, setCreatePatient] = useState(false);
    const [createCaretaker, setCreateCaretaker] = useState(false);

    const genders = [
        { id: 1, name: "MALE" },
        { id: 2, name: "FEMALE" },
        { id: 3, name: "OTHER" }
    ];

    const handlePatientAccountCreation = () => {
        setCreatePatient(true);
        setCreateCaretaker(false);
    }

    const handleCaretakerAccountCreation = () => {
        setCreateCaretaker(true);
        setCreatePatient(false);
    }

    const onSubmit = async (data) => {
        try {
            const response = await createBaseUser(data);
            handleBaseUserCreated(response.data.id);

            if (createPatient) {
                handleContinueAsPatient(true);
            } else if (createCaretaker) {
                handleContinueAsCaretaker(true);
            }

        } catch (error) {
            console.error("Error creating user:", error);
        }
    };

    return (
        <>
            <h2 className="text-center mb-4 text-green-700">Sign Up for CareNest</h2>

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                        <label htmlFor="firstname" className="form-label text-lg text-gray-700">
                            First Name
                        </label>
                        <input
                            type="text"
                            className="form-control input-field"
                            id="firstname"
                            placeholder="Enter your first name"
                            {...register("firstName", { required: "First name is required" })}
                        />
                        {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
                    </div>
                    <div>
                        <label htmlFor="lastname" className="form-label text-lg text-gray-700">
                            Last Name
                        </label>
                        <input
                            type="text"
                            className="form-control input-field"
                            id="lastname"
                            placeholder="Enter your last name"
                            {...register("lastName", { required: "Last name is required" })}
                        />
                        {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
                    </div>
                    <div>
                        <label htmlFor="email" className="form-label text-lg text-gray-700">
                            Email Address
                        </label>
                        <input
                            type="email"
                            className="form-control input-field"
                            id="email"
                            placeholder="Enter your email"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                    message: "Invalid email format"
                                }
                            })}
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                    </div>
                    <div>
                        <label className="form-label text-lg text-gray-700">
                            Phone Number
                        </label>
                        <input
                            type="text"
                            className="form-control input-field"
                            id="phoneNumber"
                            placeholder="Enter your phone number"
                            {...register("phoneNumber", {
                                required: "Phone number is required",
                                pattern: {
                                    value: /^(\+?\d{1,3})?[-. (]*\d{3}[-. )]*\d{3}[-. ]*\d{4}$/,
                                    message: "Invalid phone number format"
                                }
                            })}
                        />
                        {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>}
                    </div>
                    <div>
                        <label htmlFor="gender" className="form-label text-lg text-gray-700">
                            Gender
                        </label>
                        <select
                            id="gender"
                            className="form-control input-field"
                            {...register("gender", { required: "Please select your gender" })}
                        >
                            <option value="">Select your gender</option>
                            {genders.map((g) => (
                                <option key={g.id} value={g.name}>
                                    {g.name}
                                </option>
                            ))}
                        </select>
                        {errors.gender && <p className="text-red-500 text-sm">{errors.gender.message}</p>}
                    </div>
                    <div>
                        <label htmlFor="password" className="form-label text-lg text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            className="form-control input-field"
                            id="password"
                            placeholder="Create a password"
                            {...register("password", { required: "Password is required" })}
                        />
                        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                    </div>
                    <div>
                        <label htmlFor="confirmPassword" className="form-label text-lg text-gray-700">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            className="form-control input-field"
                            id="confirmPassword"
                            placeholder="Confirm your password"
                            {...register("confirmedPassword", { required: "Please repeat your password" })}
                        />
                        {errors.confirmedPassword && <p className="text-red-500 text-sm">{errors.confirmedPassword.message}</p>}
                    </div>
                </div>

                <button type="submit" className="btn btn-success w-full mt-4 submit-button"
                    onClick={handlePatientAccountCreation}
                >
                    <i className="fas fa-user-plus"></i> Sign Up as Patient
                </button>

                <button type="submit" className="btn btn-outline-success w-full mt-4 secondary-button"
                    onClick={handleCaretakerAccountCreation}
                >
                    <i className="fas fa-user-nurse"></i> Sign Up as Caretaker
                </button>
            </form>
            <DevTool control={control} />
            <div className="text-center mt-4">
                <span>Already have an account? </span>
                <a href="/login" className="text-green-600 hover:text-green-700">
                    Log in
                </a>
            </div>
        </>
    );
}

export default RegisterBaseUserForm;
