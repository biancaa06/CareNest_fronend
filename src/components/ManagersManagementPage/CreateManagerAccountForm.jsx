import { useState } from "react";
import { createBaseUser } from "../../services/UserRepository";
import { generateRandomCode } from "../../services/Functions";
import { createManagerAccount } from "../../services/ManagerRepository";

function CreateManagerAccountForm({positions}) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const [position, setPosition] = useState(0);
  const [password, setPassword] = useState("");

  const [error, setError] = useState(""); 

  const genders = [
    { id: 1, name: "MALE" },
    { id: 2, name: "FEMALE" },
    { id: 3, name: "OTHER" }
  ];

  function handleSubmit(e) {
        e.preventDefault();
        createBaseUser({
            firstName,
            lastName,
            email,
            phoneNumber,
            gender,
            password
        })
        .then(response => {
            // Proceed with creating the manager account
            return createManagerAccount({ baseUserId: response.data.id, position });
        })
        .then(managerResponse => {
            console.log("Manager account created successfully", managerResponse.data);
            //!!!! make function to send email with temporart password
        })
        .catch(error => {
            const errorMessage = error.response?.data || "An unexpected error occurred.";
            setError(errorMessage);
        });
    }

  const handleGeneratePassword = (e) =>{
    e.preventDefault();
    setPassword(generateRandomCode(8));
  }

  return (
    <>
      <div className="bg-white shadow-md rounded-lg p-8 max-w-lg w-full">
        <h2 className="text-2xl font-bold text-center text-green-700 mb-6">Create a new manager account</h2>
        {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
        <form onSubmit={handleSubmit}>
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
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
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
            </div>
            <div>
              <label htmlFor="position" className="form-label text-lg text-gray-700">
                Position
              </label>
              <select
                id="position"
                className="form-control input-field"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                required
              >
                <option value="">Select a position</option>
                {positions.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
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
      </div>
    </>
  );
}

export default CreateManagerAccountForm;
