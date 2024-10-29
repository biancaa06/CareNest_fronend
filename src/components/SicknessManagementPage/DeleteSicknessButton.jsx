import { useState } from "react";
import ConfirmationModal from "../ModalActionConfirmation";

function DeleteSicknessButton({ sickness, deleteSicknessById }) {

    const [isOpen, setIsOpen] = useState(false);
    
    const closeModal = () =>{
        setIsOpen(false);
    }
    const openModal = () =>{
        setIsOpen(true);
    }

    const deleteSickness = e =>{
        e.preventDefault();
        deleteSicknessById(sickness.id);
        closeModal();
    }

    const handleClick = (e) => {
        e.preventDefault();
        openModal();
    };

    return (
        <>
        <button
            onClick={handleClick}
            data-modal-target="popup-modal" data-modal-toggle="popup-modal"
            className="ml-2 hover:text-red-600 transition-colors duration-200 ease-in-out group-hover:text-[#2e6b34]"
        >
            <i className="fa-solid fa-trash-can"></i>
        </button>
        
        <ConfirmationModal isOpen={isOpen} onClose={closeModal} onConfirm={deleteSickness}/>

        </>
        
    );

}


export default DeleteSicknessButton;
