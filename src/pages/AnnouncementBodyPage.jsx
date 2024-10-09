import { useParams } from 'react-router-dom';
import { getAnnouncementById } from '../services/AnnouncementsRepository';
import { useEffect, useState } from 'react';

function AnnouncementBodyPage() {
    const { id } = useParams();

    const [announcement, setAnnouncement] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchAnnouncement = async () => {
        try {
            setLoading(true);
            const response = await getAnnouncementById(id);
            setAnnouncement(response.data);
        } catch (error) {
            console.error('Error fetching announcement:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAnnouncement();
    }, [id]);

    return (
        <div className="min-h-screen bg-[#f0fdf4] flex justify-center items-start py-10 px-4">
            {loading ? (
                <div>Loading...</div>
            ) : announcement ? (
                <div className="w-full max-w-8xl bg-white rounded-lg p-10 shadow-lg overflow-auto">
                    <h1 className="text-4xl font-bold text-center text-[#2e6b34] mb-6">{announcement.title}</h1>
                    
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
                        {new Date(announcement.date).toLocaleDateString()}
                    </p>
                    
                    <p className="text-lg leading-relaxed text-gray-700 mb-10">
                        {announcement.description}
                    </p>
                </div>
            ) : (
                <div>No announcement found.</div>
            )}
        </div>
    );
}

export default AnnouncementBodyPage;
