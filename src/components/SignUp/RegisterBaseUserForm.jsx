import { useState } from "react";
import { createBaseUser } from "../../services/UserRepository";

function RegisterBaseUserForm({ handleBaseUserCreated, handleContinueAsPatient, handleContinueAsCaretaker}) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [gender, setGender] = useState("");
    const [password, setPassword] = useState("");
    const [confirmedPassword, setConfirmedPassword] = useState("");

    const [createPatient, setCreatePatient] = useState(false);
    const [createCaretaker, setCreateCaretaker] = useState(false);

    const [errors, setErrors] = useState({});

    const genders = [
        { id: 1, name: "MALE" },
        { id: 2, name: "FEMALE" },
        { id: 3, name: "OTHER" }
    ];

    const handlePatientAccountCreation = () =>{
        setCreatePatient(true);
        setCreateCaretaker(false);
    }
    const handleCaretakerAccountCreation = () =>{
        setCreateCaretaker(true);
        setCreatePatient(false);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await createBaseUser({
                firstName,
                lastName,
                email,
                phoneNumber,
                gender,
                password
            });
            handleBaseUserCreated(response.data.id);

            if (createPatient) {
                handleContinueAsPatient(true);
            } else if (createCaretaker) {
                handleContinueAsCaretaker(true);
            }

        } catch (error) {
            setErrors({ general: error.response.data.detail });
        }
    };
    

    return (
        <>
            <h2 className="text-center mb-4 text-green-700">Sign Up for CareNest</h2>
            {errors.general && <p className="text-red-500 text-sm">{errors.general}</p>}

            <form onSubmit={handleSubmit}>
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
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                        {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
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
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                        />
                        {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
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
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
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
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            required
                        />
                        {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}
                    </div>
                    <div>
                        <label htmlFor="gender" className="form-label text-lg text-gray-700">
                            Gender
                        </label>
                        <select
                            id="gender"
                            className="form-control input-field"
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                            required
                        >
                            <option value="">Select your gender</option>
                            {genders.map((g) => (
                                <option key={g.id} value={g.name}>
                                    {g.name}
                                </option>
                            ))}
                        </select>
                        {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
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
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
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
                            value={confirmedPassword}
                            onChange={(e) => setConfirmedPassword(e.target.value)}
                            required
                        />
                        {errors.confirmedPassword && <p className="text-red-500 text-sm">{errors.confirmedPassword}</p>}
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
