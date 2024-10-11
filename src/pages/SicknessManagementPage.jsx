import { useEffect, useState } from "react";
import { createSickness, getAllSicknesses, deleteSickness } from "../services/SicknessRepository";
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
    
    function deleteSicknessById(id){
        deleteSickness(id).then(() => {
            fetchSicknesses();
        })
    }

     function updateSickness(sickness){
        
    }

    if (loading) return (
        <div className="sickness-management-container">
            <h1 className="page-title">Saved Sicknesses</h1>
            <p>Loading...</p>
        </div>
    )
    if (error) return(
        <div className="sickness-management-container">
            <h1 className="page-title">Saved Sicknesses</h1>
            <p>{error}</p>
        </div>
    )

    return (
        <div className="sickness-management-container">
            <h1 className="page-title">Saved Sicknesses</h1>
            
            <div className="input-and-list-container">
                <InputSickness createSickness={addSickness} />
                <SicknessesList sicknesses={sicknesses} deleteSickness={deleteSicknessById} updateSickness={updateSickness}/>
            </div>
        </div>
    );
}

export default SicknessManagementPage;
