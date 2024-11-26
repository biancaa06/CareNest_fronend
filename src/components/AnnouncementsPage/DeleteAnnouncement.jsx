import { useState } from "react";
import Modal from "../ModalActionConfirmation";
import { deleteAnnouncementById } from "../../services/AnnouncementsRepository";

function DeleteAnnouncement ({announcement, onDelete}){
    
    const [isModalopen, setIsModalOpen] = useState(false);

    const closeModal = () =>{
        setIsModalOpen(false);
    }
    const openModal = () =>{
        setIsModalOpen(true);
    }

    const deleteAnnouncement = async () => {
        try {
            await deleteAnnouncementById({ id: announcement.id });
            closeModal();
            onDelete();
        } catch (error) {
            console.error("Failed to delete the announcement:", error);
        }
    };
    

    return (
        <>
        <button
            onClick={openModal}
        >
            <i className="fa-solid fa-trash-can"></i>
        </button>

        <Modal isOpen={isModalopen} onClose={closeModal} onConfirm={deleteAnnouncement}/>
        </>
    )
}
export default DeleteAnnouncement