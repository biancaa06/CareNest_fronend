import { useEffect, useState } from "react";
import { createSickness, getAllSicknesses, deleteSickness, updateSicknessById } from "../services/SicknessRepository";
import SicknessesList from "../components/SicknessManagementPage/SicknessesList";
import InputSickness from "../components/SicknessManagementPage/InputSickness";
import "../css/sicknessPage.css";
import Unauthorized_GoToLogin from "../components/authorization/Unauthorized_GoToLogin";

function SicknessManagementPage({claims}) {
    const [sicknesses, setSicknesses] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [authorized, setAuthorized] = useState(false);

    const fetchSicknesses = async () => {
        try {
            setLoading(true);
            setError(false);
            const response = await getAllSicknesses();
            setSicknesses(response.data);
        } catch (error) {
            if(error.status == 401 || error.status == 403){
                setAuthorized(false);
            }
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

    function updateSickness(id,newSickness){
        updateSicknessById(id, newSickness).then(() =>{
            fetchSicknesses();
        })
    }

    if(!claims?.roles.includes("MANAGER")) return(
        <Unauthorized_GoToLogin message="Only managers can access this page. Please log in with a manager account."/>
    )

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
