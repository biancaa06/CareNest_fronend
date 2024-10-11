import DeleteSicknessButton from "./DeleteSicknessButton";
import EditSicknessButton from "./EditSicknessButton";

function SicknessItem({ sickness, deleteSickness, updateSickness }) {
    return (
        <li className="w-full">
            <a className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white group-hover:text-[#2e6b34]">
                <span className="flex-1 ml-3 whitespace-nowrap group-hover:text-[#2e6b34]">{sickness.name}</span>
                <DeleteSicknessButton sickness={sickness} deleteSicknessById={deleteSickness} />
                <EditSicknessButton sickness={sickness} updateSickness={updateSickness} />
            </a>
        </li>
    );
}

export default SicknessItem;
