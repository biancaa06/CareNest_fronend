import { useParams } from 'react-router-dom';
import { getAnnouncementById } from '../services/AnnouncementsRepository';
import { useEffect, useState } from 'react';
import Unauthorized_GoToLogin from '../components/authorization/Unauthorized_GoToLogin';
import AnnouncementBodyComponent from '../components/AnnouncementsPage/AnnouncementBodyComponent';

function AnnouncementBodyPage() {
    const { id } = useParams();

    const [announcement, setAnnouncement] = useState(null);
    const [loading, setLoading] = useState(true);
    const [authorized, setAuthorized] = useState(true);

    const fetchAnnouncement = async () => {
        try {
            setLoading(true);
            const response = await getAnnouncementById(id);
            setAnnouncement(response.data);
        } catch (error) {
            if(error.status == 401 || error.status == 403){
                setAuthorized(false);
            }
            console.error('Error fetching announcement:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAnnouncement();
    }, [id]);

    if(!authorized) return(
        <Unauthorized_GoToLogin message="You need to have a patient account to view health announcements. Please log in as a patient to proceed." />
    )

    return (
        <div className="min-h-screen bg-[#f0fdf4] flex justify-center items-start py-10 px-4">
            {loading ? (
                <div>Loading...</div>
            ) : announcement ? (
                <AnnouncementBodyComponent announcement={announcement}/>
            ) : (
                <div>No announcement found.</div>
            )}
        </div>
    );
}

export default AnnouncementBodyPage;
