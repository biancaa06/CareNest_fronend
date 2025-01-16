import React from "react"
import SicknessItem from "./SicknessItem";

const SicknessesList = ({sicknesses, deleteSickness, updateSickness}) =>{
    return (
        <>
            <ul data-cy='sicknessesList' className="space-y-4">
                {
                    sicknesses && sicknesses.length > 0 ? (
                        sicknesses.map((sickness) =>(
                            <div key={sickness.id}>
                                <SicknessItem key={sickness.id} sickness={sickness} deleteSickness={deleteSickness} updateSickness={updateSickness}/>
                            </div>
                        ))
                    ) : (
                        <div className="text-center col-span-full">
                            <p className="text-lg text-gray-500">No sicknesses available</p>
                        </div>
                    )
                }
            </ul>
        </>
    );
}

export default SicknessesList