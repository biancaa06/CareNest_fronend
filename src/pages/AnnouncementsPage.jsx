import { useState, useEffect } from "react";
import AnnouncementList from "../components/AnnouncementsPage/AnnouncementList";
import '../css/AnnouncementsPage.css';
import { getAllAnnouncements } from "../services/AnnouncementsRepository";
import Unauthorized_GoToLogin from "../components/authorization/Unauthorized_GoToLogin";

const AnnouncementsPage = () => {
    const [announcements, setAnnouncements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [unauthorized, setUnauthorized] = useState(false);

    const fetchAnnouncements = async () => {
        try {
            setUnauthorized(false);
            const response = await getAllAnnouncements();
            setAnnouncements(response.data);
        } catch (err) {
            if(err.status == 401 || err.status == 403){
                setUnauthorized(true);
            }
            else{
                setError('Failed to fetch announcements');
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAnnouncements();
    }, []);

    if(unauthorized) return(
        <Unauthorized_GoToLogin  message={"You need to have a patient account to view health announcements. Please log in as a patient to proceed."}/>
    )
    if (loading) return(
        <div className="announcements_container">
            <h1 className="text-5xl font-bold text-center text-green-700 mb-10">Health Announcements</h1>
            <p>Loading...</p>
        </div>
    )
    if (error) return(
        <div className="announcements_container">
            <h1 className="text-5xl font-bold text-center text-green-700 mb-10">Health Announcements</h1>
            <p>{error}</p>
        </div>
    ) 

    return (
        <div>
            <div className="announcements_container">
                <h1 className="text-5xl font-bold text-center text-green-700 mb-10">Health Announcements</h1>
                <AnnouncementList announcements={announcements} />
            </div>
        </div>
    );
};

export default AnnouncementsPage;
