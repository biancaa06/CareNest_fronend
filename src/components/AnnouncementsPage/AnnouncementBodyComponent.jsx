import { useState, useEffect } from "react";

function AnnouncementBodyComponent({ announcement, isEditing, onSave, onCancel }) {
    const [title, setTitle] = useState(announcement.title);
    const [description, setDescription] = useState(announcement.description);

    useEffect(() => {
        setTitle(announcement.title);
        setDescription(announcement.description);
    }, [announcement]);

    return (
        <div className="page-background-top w-full max-w-8xl bg-white rounded-lg p-10 shadow-lg overflow-auto">
            {isEditing ? (
                <div className="mb-6">
                    <label htmlFor="title" className="block text-gray-700 font-semibold mb-2">
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-700"
                    />
                </div>
            ) : (
                <h1 className="text-4xl font-bold text-center text-[#2e6b34] mb-6">{announcement.title}</h1>
            )}

            <div className="flex items-center mb-6">
                {announcement.author && announcement.author.baseUser ? (
                    <>
                        <img
                            className="w-24 h-24 rounded-full mr-4"
                            src={announcement.author.baseUser.imageUrl || "../images/default_profile.png"}
                            alt={announcement.author.baseUser.firstName}
                        />
                        <p className="text-lg font-semibold text-gray-700">
                            {`${announcement.author.baseUser.firstName} ${announcement.author.baseUser.lastName}`}
                        </p>
                    </>
                ) : (
                    <p>No author information available</p>
                )}
            </div>

            <p className="text-lg leading-relaxed text-gray-700 mb-10">
                Last edited: {new Date(announcement.date).toLocaleDateString()}
            </p>

            {isEditing ? (
                <div className="mb-10">
                    <label htmlFor="description" className="block text-gray-700 font-semibold mb-2">
                        Description
                    </label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-700"
                        rows="6"
                    />
                </div>
            ) : (
                <p className="text-lg leading-relaxed text-gray-700 mb-10">{announcement.description}</p>
            )}

            {isEditing && (
                <div className="flex justify-center">
                <button
                    onClick={() => onSave(announcement.id, title, description)}
                    className="px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 transition duration-200"
                >
                    Save
                </button>
                <button
                    onClick={onCancel}
                    className="px-4 py-2 ml-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200"
                >
                    Cancel
                </button>
            </div>
            )}
        </div>
    );
}

export default AnnouncementBodyComponent;
