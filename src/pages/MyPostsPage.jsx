import { useEffect, useState } from "react";
import AnnouncementList from "../components/AnnouncementsPage/AnnouncementList"
import Unauthorized_GoToLogin from "../components/authorization/Unauthorized_GoToLogin";
import { createAnnouncement, getAnnouncementsByAuthorId, updateAnnouncement } from "../services/AnnouncementsRepository";
import AnnouncementBodyComponent from "../components/AnnouncementsPage/AnnouncementBodyComponent";
import CreateAnnouncement from "../components/AnnouncementsPage/CreateAnnouncement";

const MyPostsPage = ({claims}) =>{

    const [announcements, setAnnouncements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [unauthorized, setUnauthorized] = useState(false);

    const [isEditing, setIsEditing] = useState(false);
    const [editingAnnouncement, setEditingAnnouncement] = useState(null);

    const [navigateToCreate, setNavigateToCreate] = useState(false);

    const handleEditing = ({announcement}) =>{
        setEditingAnnouncement(announcement);
        setIsEditing(true);
    }
    const handleCancelEditing = () =>{
        setIsEditing(false);
    }

    const handleEditingSave =async (id, title,description) => {
        try{
            const response = await updateAnnouncement({id,title,description});
            setIsEditing(false);
            fetchAnnouncements();
        }
        catch(error){
            if(error.status == 401 || error.status == 403){
                return <Unauthorized_GoToLogin message="Your are not authorized to edit this announcement"/>
            }
            setError('Failed to update announcements');
        }
    }

    const handlePostSave = async (data) =>{
        try{
            await createAnnouncement({
                title: data.title, 
                description: data.description,
                authorId: claims.userId
            })
            setNavigateToCreate(false);
            fetchAnnouncements();
        }
        catch(error){
            if(error?.status == 401 || error.status == 403){
                setUnauthorized(true);
            }
        }
    }

    const handleCreateButton = (e) => {
        e.preventDefault();
        setNavigateToCreate(true);
    };

    const handleDelete = () => {
        fetchAnnouncements();
        setIsEditing(false);
    }
    

    const fetchAnnouncements = async () => {
        try {
            setUnauthorized(false);
            const response = await getAnnouncementsByAuthorId(claims.userId);
            setAnnouncements(response.data);
        } catch (err) {
            if (err.status === 401 || err.status === 403) {
                setUnauthorized(true);
            } else {
                setError("Failed to fetch announcements");
            }
        } finally {
            setLoading(false);
        }
    };    

    useEffect(() => {
        fetchAnnouncements();
    }, []);

    if(unauthorized) return(
        <Unauthorized_GoToLogin  message={"You need to have a manager account to view your posts. Please log in as a manager to proceed."}/>
    )
    if (loading) return(
        <div className="announcements_container">
            <h1 className="text-5xl font-bold text-center text-green-700 mb-10">My Posts</h1>
            <p>Loading...</p>
        </div>
    )
    if (error) return(
        <div className="announcements_container">
            <h1 className="text-5xl font-bold text-center text-green-700 mb-10">My Posts</h1>
            <p>{error}</p>
        </div>
    ) 

    if (isEditing) {
        return (
        <div className="page-background-top min-h-screen bg-[#f0fdf4] flex justify-center items-start py-10 px-4">
            <AnnouncementBodyComponent
                announcement={editingAnnouncement}
                isEditing={isEditing}
                onSave={handleEditingSave}
                onCancel={handleCancelEditing}
                onDelete={handleDelete}
            />
        </div>
        );
    }
    
    if(navigateToCreate){
        return(
            <CreateAnnouncement onSubmit={handlePostSave}/>
        )
    }

    return (
        <>
        <div className="announcements_container">
            <h1 className="text-5xl font-bold text-center text-green-700 mb-10">My Posts</h1>
            <button className="btn btn-success btn-lg"
                onClick={handleCreateButton}
            >
                <i className="fa-solid fa-file-pen"></i> Create a new post
            </button>
            <AnnouncementList announcements={announcements} claims={claims} handleEditing={handleEditing} 
                onCancel={handleCancelEditing}/>
        </div>
        </>
    )
}

export default MyPostsPage