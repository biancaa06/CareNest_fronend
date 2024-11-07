import api from "../../api.config"

function createCaretakerAccount({baseUserId, personalDescription, salaryPerHour, availabilityId, specialisations}){
    return api.post("/caretaker", {baseUserId, personalDescription, salaryPerHour, availabilityId, specialisations})
}

function getCaretakers(){
    return api.get("/caretaker");
}
export{
    createCaretakerAccount,
    getCaretakers
}