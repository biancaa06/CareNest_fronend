import DeleteSicknessButton from "./DeleteSicknessButton";
import EditSickness from "./EditSickness";

function SicknessItem({ sickness, deleteSickness, updateSickness }) {
    return (
        <li className="w-full">
            <div className="flex items-center p-3 w-full text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow-lg dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                <span className="flex-1 ml-3 group-hover:text-[#2e6b34]">
                    <EditSickness sickness={sickness} updateSickness={updateSickness} />
                </span>
                <DeleteSicknessButton sickness={sickness} deleteSicknessById={deleteSickness} />
            </div>
        </li>
    );
}

export default SicknessItem;
