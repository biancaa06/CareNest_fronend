import { useState } from "react";

function EditSickness({ sickness, updateSickness }) {
    const [newSickness, setNewSickness] = useState(sickness.name);
    const [isEditing, setIsEditing] = useState(false);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleCancelClick = () => {
        setIsEditing(false);
        setNewSickness(sickness.name);
    };

    const handleInputChange = (event) => {
        setNewSickness(event.target.value);
    };

    const handleSaveClick = (e) => {
        e.preventDefault();
        updateSickness(sickness.id, newSickness);
        setIsEditing(false);
    };

    return (
        <>
            {isEditing ? (
                <div className="flex items-center p-3">
                    <input
                        type="text"
                        value={newSickness}
                        onChange={handleInputChange}
                        className="text-gray-700 p-1 border rounded"
                    />
                    <button
                        onClick={handleSaveClick}
                        className="ml-2 text-green-600 hover:text-green-800"
                    >
                        Save
                    </button>
                    <button
                        onClick={handleCancelClick}
                        className="ml-2 text-red-600 hover:text-red-800"
                    >
                        Cancel
                    </button>
                </div>
            ) : (
                <div>
                    <span className="flex-1 ml-3 whitespace-nowrap group-hover:text-[#2e6b34]">
                        {sickness.name}
                    </span>
                    <button 
                        onClick={handleEditClick}
                        className="ml-2 hover:text-blue-600 transition-colors duration-200 ease-in-out"
                    >
                        <i className="fa-solid fa-pen-to-square"></i>
                    </button>
                </div>
            )}
        </>
    );
}

export default EditSickness;
