import { useEffect, useState } from "react";
import ReadMoreButton from "./ReadMoreButton";
import { useNavigate } from "react-router-dom";

function AnnouncementComponent({ claims, announcement, handleEditing}) {
    const authorFullName = `${announcement.author.baseUser.firstName} ${announcement.author.baseUser.lastName}`;

    const [profilePicture, setProfilePicture] = useState(announcement.author.baseUser.profileImage);
    const navigate = useNavigate();

    useEffect(() => {
        if (announcement?.author?.baseUser?.profileImage) {
            const base64Image = `data:image/jpeg;base64,${announcement.author.baseUser.profileImage}`;
            setProfilePicture(base64Image);
        } else {
            setProfilePicture(null);
        }
    }, [announcement]);

    const isManager = claims?.roles?.includes("MANAGER");

    return (
        <div>
            <div className="flex flex-col rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 md:max-w-xl md:flex-row">
                {profilePicture ? (
                    <img
                        src={profilePicture}
                        alt="Profile"
                        className="w-24 h-24 rounded-full object-cover"
                    />
                ) : (
                    <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-3xl font-semibold text-green-700">
                        {announcement.author.baseUser.firstName?.[0]}{announcement.author.baseUser.lastName?.[0]}
                    </div>
                )}
                <div className="flex flex-col justify-start p-6">
                    <p className="text-xs text-neutral-500 dark:text-neutral-300">
                        {authorFullName}
                    </p>
                    <h5
                        className="mb-2 text-xl font-medium text-neutral-800 dark:text-neutral-50">
                        {announcement.title}
                    </h5>
                    <p className="text-xs text-neutral-500 dark:text-neutral-300">
                        Last updated: {new Date(announcement.date).toLocaleDateString()}
                    </p>
                    {isManager && (
                        <div className="mt-4">
                            <button
                                onClick={() => handleEditing({announcement})}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
                            >
                                Edit
                            </button>
                        </div>
                    ) || (
                        <ReadMoreButton announcement={announcement} />
                    )}
                </div>
            </div>
        </div>
    );
}

export default AnnouncementComponent;
