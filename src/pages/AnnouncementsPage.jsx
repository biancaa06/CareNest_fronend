import { useState, useEffect } from "react";
import AnnouncementList from "../components/AnnouncementList";
import Navbar from "../components/NavBar";
import '../css/AnnouncementsPage.css';

const AnnouncementsPage = () => {
    const [announcements, setAnnouncements] = useState([]);

    useEffect(() => {
        const fetchAnnouncements = () => {
            const announcementsList = [
                {
                    id: "1",
                    title: "Health Tips for Elderly",
                    description: "Here are some essential tips for staying healthy during flu season.",
                    date: "March 16, 2024",
                    author: {
                        name: "Dr. John Smith",
                        role: "Medical Expert",
                        imageUrl: "https://via.placeholder.com/40"
                    }
                },
                {
                    id: "2",
                    title: "Mental Health Awareness",
                    description: "Join us for a session on managing mental health for seniors.",
                    date: "March 12, 2024",
                    author: {
                        name: "Dr. Emma Brown",
                        role: "Psychologist",
                        imageUrl: "https://via.placeholder.com/40"
                    }
                },
                {
                    id: "2",
                    title: "Mental Health Awareness",
                    description: "Join us for a session on managing mental health for seniors.",
                    date: "March 12, 2024",
                    author: {
                        name: "Dr. Emma Brown",
                        role: "Psychologist",
                        imageUrl: "https://via.placeholder.com/40"
                    }
                },
                {
                    id: "2",
                    title: "Mental Health Awareness",
                    description: "Join us for a session on managing mental health for seniors.",
                    date: "March 12, 2024",
                    author: {
                        name: "Dr. Emma Brown",
                        role: "Psychologist",
                        imageUrl: "https://via.placeholder.com/40"
                    }
                }
            ];
            setAnnouncements(announcementsList);
        };

        fetchAnnouncements();
    }, []);

    return (
        <div>
            <div className="announcements_container">
                <h1 className="text-4xl font-bold text-center text-green-700 mb-10">Health Announcements</h1>
                <AnnouncementList announcements={announcements} />
            </div>
        </div>
    );
};

export default AnnouncementsPage;
