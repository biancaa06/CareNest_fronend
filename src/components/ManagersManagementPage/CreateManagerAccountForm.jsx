import { useState } from "react";
import { createBaseUser } from "../../services/UserRepository";
import { generateRandomCode } from "../../services/Functions";
import { createManagerAccount } from "../../services/ManagerRepository";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

function CreateManagerAccountForm({positions}) {
  const { register, control, handleSubmit, formState: { errors }, setValue, reset } = useForm();

  // const [firstName, setFirstName] = useState("");
  // const [lastName, setLastName] = useState("");
  // const [email, setEmail] = useState("");
  // const [phoneNumber, setPhoneNumber] = useState("");
  // const [gender, setGender] = useState("");
  // const [position, setPosition] = useState(0);
  const [password, setPassword] = useState("");

  const [error, setError] = useState(""); 

  const genders = [
    { id: 1, name: "MALE" },
    { id: 2, name: "FEMALE" },
    { id: 3, name: "OTHER" }
  ];

  function onSubmit(data) {
    createBaseUser({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        gender: data.gender,
        password: data.password
    })
    .then(response => {
        return createManagerAccount({ 
          baseUserId: response.data.id, 
          position: data.position
        });
    })
    .then(managerResponse => {
        console.log("Manager account created successfully", managerResponse.data);
        reset();
    })
    .catch(error => {
        const errorMessage = error.response?.data || "An unexpected error occurred.";
        setError(errorMessage);
    });
  }

  const handleGeneratePassword = (e) =>{
    e.preventDefault();
    setValue("password", generateRandomCode(8));
  }

  return (
    <>
      <div className="bg-white shadow-md rounded-lg p-8 max-w-lg w-full">
        <h2 className="text-2xl font-bold text-center text-green-700 mb-6">Create a new manager account</h2>
        {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="grid grid-cols-2 gap-4">
            <div>
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
              <label htmlFor="position" className="form-label text-lg text-gray-700">
                Position
              </label>
              <select
                id="position"
                className="form-control input-field"
                {...register("position", { required: "Position is required" })}
              >
                <option value="">Select a position</option>
                {positions.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
              {errors.position && <p className="text-red-500 text-sm">{errors.position.message}</p>}
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
            <button
                className="btn btn-outline-success w-full mt-4 secondary-button"
                onClick={handleGeneratePassword}
            >
              Generate temporary password
            </button>
          </div>
          
          <button
            type="submit"
            className="btn btn-success w-full mt-4 submit-button"
          >
            <i className="fas fa-user-plus"></i> Create account
          </button>
        </form>
        <DevTool control={control} />
      </div>
    </>
  );
}

export default CreateManagerAccountForm;
