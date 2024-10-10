import { useState, useEffect } from "react";
import AnnouncementList from "../components/AnnouncementList";
import '../css/AnnouncementsPage.css';
import { getAllAnnouncements } from "../services/AnnouncementsRepository";

const AnnouncementsPage = () => {
    const [announcements, setAnnouncements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchAnnouncements = async () => {
        try {
            const response = await getAllAnnouncements();
            setAnnouncements(response.data);
        } catch (err) {
            setError('Failed to fetch announcements');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAnnouncements();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

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
