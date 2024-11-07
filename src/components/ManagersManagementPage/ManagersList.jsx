import { useEffect, useState } from "react";
import { getManagersByPosition } from "../../services/ManagerRepository";
import ManagerCardItem from "./ManagerCardItem";

function ManagersList({ position }) {
    const [managers, setManagers] = useState([]);
    const [error, setError] = useState("");

    const fetchManagersByPosition = async (position) => {
        try {
            const response = await getManagersByPosition({ position: position });
            setManagers(response.data);
        } catch (error) {
            const errorMessage = error.response?.data || "An unexpected error occurred.";
            setError(errorMessage);
        }
    };

    useEffect(() => {
        fetchManagersByPosition(position);
    }, [position]);

    return (
        <>
            {error && <p className="text-red-500">{error}</p>}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center bg-custom-green">
                {managers && managers.length > 0 ? (
                    managers.map((manager) => (
                        <div key={manager.baseUser.id} className="flex justify-center">
                            <ManagerCardItem manager={manager} />
                        </div>
                    ))
                ) : (
                    <div className="text-center col-span-full">
                        <p className="text-lg text-gray-500">No {position.name} managers available</p>
                    </div>
                )}
            </div>
        </>
    );
}

export default ManagersList;
