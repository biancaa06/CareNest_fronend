import { useEffect, useState } from "react";
import { createSickness, getAllSicknesses } from "../services/SicknessRepository";
import SicknessesList from "../components/SicknessesList";
import InputSickness from "../components/InputSickness";
import "../css/sicknessPage.css";

function SicknessManagementPage() {
    const [sicknesses, setSicknesses] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const fetchSicknesses = async () => {
        try {
            setLoading(true);
            setError(false);
            const response = await getAllSicknesses();
            setSicknesses(response.data);
        } catch (error) {
            setError("Failed to fetch sicknesses");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSicknesses();
    }, []);

    const addSickness = name => {
        createSickness(name).then(() => {
            fetchSicknesses();
        });
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="sickness-management-container">
            <h1 className="page-title">Saved Sicknesses</h1>
            
            <div className="input-and-list-container">
                <InputSickness createSickness={addSickness} />
                <SicknessesList sicknesses={sicknesses} />
            </div>
        </div>
    );
}

export default SicknessManagementPage;
