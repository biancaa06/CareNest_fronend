import { useEffect, useState } from "react"
import { getCaretakers } from "../../services/CaretakerRepository";
import CaretakerCard from "./CaretakerCard";

function CaretakersList() {
    const [caretakers, setCaretakers] = useState([]);
    const [error, setError] = useState("");

    const fetchCaretakes = async () => {
        try{
            const response = await getCaretakers();
            setCaretakers(response.data);
        }
        catch(error){
            const errorMessage = error.response?.data || "An unexpected error occurred.";
            setError(errorMessage);
        }
    }

    useEffect(() => {
        fetchCaretakes();
    }, []);

    return (
        <>
        {error && <p className="text-red-500">{error}</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
            {caretakers && caretakers.length > 0 ? (
                caretakers.map((caretaker) => (
                    <div key={caretaker.baseUser.id} className="flex justify-center">
                        <CaretakerCard caretaker={caretaker} />
                    </div>
                ))
            ) : (
                <div className="text-center col-span-full">
                    <p className="text-lg text-gray-500">No caretakers available</p>
                </div>
            )}
        </div>
        </>
    )
}

export default CaretakersList