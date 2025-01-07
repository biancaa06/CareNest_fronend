import { useEffect, useState } from "react";
import DetailsModal from "./DetailsModal";
import { useNavigate } from "react-router-dom";

function CaretakerCard({ caretaker }) {
    const [profilePicture, setProfilePicture] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (caretaker?.baseUser?.profileImage) {
            const base64Image = `data:image/jpeg;base64,${caretaker.baseUser.profileImage}`;
            setProfilePicture(base64Image);
        } else {
            setProfilePicture(null);
        }
    }, [caretaker]);

    const handleSeeDetails = (e) => {
        e.preventDefault();
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleMessage = (e) => {
        e.preventDefault();
        navigate('/messages', {
            state: { 
                initialChat: { 
                    userId: caretaker.baseUser.id,
                    userName: `${caretaker.baseUser.firstName} ${caretaker.baseUser.lastName}`
                }
            }
        });
    };    

    return (
        <>
            <div className="w-[500px] max-w-md bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mx-auto">
                <div className="flex justify-end px-4 pt-4"></div>

                <div className="flex flex-col items-center pb-10">
                    {profilePicture ? (
                        <img
                            src={profilePicture}
                            alt="Profile"
                            className="w-24 h-24 rounded-full object-cover"
                        />
                    ) : (
                        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-3xl font-semibold text-green-700">
                            {caretaker.baseUser.firstName?.[0]}
                            {caretaker.baseUser.lastName?.[0]}
                        </div>
                    )}
                    <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                        {caretaker.baseUser.firstName} {caretaker.baseUser.lastName}
                    </h5>
                    <div className="flex mt-4 md:mt-6">
                        <a
                            href="#"
                            className="inline-flex items-center px-4 py-2 text-sm rounded-md font-medium text-center bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500"
                            onClick={handleMessage}
                        >
                            Message
                        </a>
                        <a
                            href="#"
                            className="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-green-600 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                            onClick={handleSeeDetails}
                        >
                            See details
                        </a>
                    </div>
                </div>
            </div>

            {showModal && (
                <DetailsModal
                    user={caretaker}
                    onClose={handleCloseModal}
                />
            )}
        </>
    );
}

export default CaretakerCard;
