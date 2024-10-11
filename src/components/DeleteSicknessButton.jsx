function DeleteSicknessButton({ sickness, deleteSicknessById }) {
    const handleClick = (e) => {
        e.preventDefault();
        deleteSicknessById(sickness.id);
    };

    return (
        <button
            onClick={handleClick}
            className="hover:text-red-600 transition-colors duration-200 ease-in-out group-hover:text-[#2e6b34]"
        >
            <i className="hover:text-red-600 fa-solid fa-trash-can"></i>
        </button>
    );
}

export default DeleteSicknessButton;
