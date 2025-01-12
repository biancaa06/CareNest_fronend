import { useState, useEffect } from "react";
import { updateBaseUserAddress, uploadProfilePicture } from "../../services/UserRepository";

function PersonalData({ user }) {
    const [isEditing, setIsEditing] = useState(false);
    const [street, setStreet] = useState(user?.address?.street || "");
    const [number, setNumber] = useState(user?.address?.number || "");
    const [city, setCity] = useState(user?.address?.city || "");
    const [country, setCountry] = useState(user?.address?.country || "");
    
    const [profilePicture, setProfilePicture] = useState("");
    const [uploadedPicture, setUploadedPicture] = useState("");

    const [error, setError] = useState("");

    useEffect(() => {
        console.log("Profile Image:", user?.profileImage);
    
        if (user?.profileImage) {
            const base64Image = user.profileImage.startsWith("data:image")
                ? user.profileImage
                : `data:image/jpeg;base64,${user.profileImage}`;
            setProfilePicture(base64Image);
        } else {
            setProfilePicture(null);
        }
    
        if (user?.address) {
            setStreet(user.address.street);
            setNumber(user.address.number);
            setCity(user.address.city);
            setCountry(user.address.country);
        }
    }, [user]);
    

    const handleFileChange = (e) => {
        e.preventDefault();
        setUploadedPicture(e.target.files[0]);
    };

    const handleProfilePictureSave = async () => {
        if (!uploadedPicture) return;

        try {
            const formData = new FormData();
            formData.append("file", uploadedPicture);
            console.log("data:", uploadedPicture);

            await uploadProfilePicture({ userId: user.id, file: formData });

            const newImageUrl = URL.createObjectURL(uploadedPicture);
            setProfilePicture(newImageUrl);
            setUploadedPicture(null);
        } catch (error) {
            console.error("Error uploading profile picture", error);
            setError("Error uploading profile picture");
        }
    };

    const handleSave = async () => {
        setError("");
        try {
            await updateBaseUserAddress({ country, city, street, number, id: user.id });
            user.address = { street, number, city, country };
            setIsEditing(false);
        } catch (error) {
            const errorMessage = error.response?.data?.detail || "An unexpected error occurred.";
            setError(errorMessage);
            console.error(error);
        }
    };

    if (!user) {
        return <p>Loading...</p>;
    }

    return (
        <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg px-20 py-6 mt-10 text-gray-700">
            <div className="flex flex-col items-center mb-6">
            {profilePicture ? (
                    <img
                        src={profilePicture}
                        alt="Profile"
                        className="w-24 h-24 rounded-full object-cover"
                    />
                ) : (
                    <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-3xl font-semibold text-green-700">
                        {user.firstName?.[0]}{user.lastName?.[0]}
                    </div>
                )}
                <h2 className="text-2xl font-bold text-green-700 mt-4">{user.firstName} {user.lastName}</h2>
                <p className="text-gray-500">{user.gender}</p>
            </div>

            <div className="flex items-center space-x-4">
                <input
                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    aria-describedby="file_input_help"
                    id="file_input"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                />
                <button
                    onClick={handleProfilePictureSave}
                    className="px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 transition duration-200"
                >
                    Save Picture
                </button>
            </div>

            <div className="border-t border-gray-200 pt-4">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Contact Information</h3>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Phone:</strong> {user.phoneNumber}</p>
            </div>

            <div className="border-t border-gray-200 pt-4 mt-4">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Address</h3>
                {isEditing ? (
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-600">Street</label>
                            <input
                                type="text"
                                value={street}
                                onChange={(e) => setStreet(e.target.value)}
                                className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-700"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-600">Number</label>
                            <input
                                type="text"
                                value={number}
                                onChange={(e) => setNumber(e.target.value)}
                                className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-700"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-600">City</label>
                            <input
                                type="text"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-700"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-600">Country</label>
                            <input
                                type="text"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-700"
                            />
                        </div>
                    </div>
                ) : (
                    user.address ? (
                        <>
                            <p>{user.address.street} {user.address.number}</p>
                            <p>{user.address.city}, {user.address.country}</p>
                        </>
                    ) : (
                        <div className="text-red-500 text-sm mt-2">
                            No address available. <span className="font-semibold">Please update your address details.</span>
                        </div>
                    )
                )}
            </div>

            {error && (
                <div className="text-red-500 text-sm mt-4 text-center">
                    {error}
                </div>
            )}

            <div className="flex justify-center mt-6">
                {isEditing ? (
                    <>
                        <button
                            onClick={handleSave}
                            className="px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 transition duration-200"
                        >
                            Save
                        </button>
                        <button
                            onClick={() => setIsEditing(false)}
                            className="px-4 py-2 ml-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200"
                        >
                            Cancel
                        </button>
                    </>
                ) : (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 transition duration-200"
                    >
                        Edit Address
                    </button>
                )}
            </div>
        </div>
    );
}

export default PersonalData;
