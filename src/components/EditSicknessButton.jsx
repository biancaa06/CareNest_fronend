function EditSicknessButton({ sickness, updateSickness }) {
    return (
        <button className="hover:text-blue-600 transition-colors duration-200 ease-in-out group-hover:text-[#2e6b34]">
            <i className="fa-solid fa-pen-to-square group-hover:text-[#2e6b34]"></i>
        </button>
    );
}

export default EditSicknessButton;
