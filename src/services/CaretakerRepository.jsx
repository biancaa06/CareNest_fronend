import api from "../../api.config"

function createCaretakerAccount({baseUserId, personalDescription, salaryPerHour, availabilityId, specialisations}){
    return api.post("/caretaker", {baseUserId, personalDescription, salaryPerHour, availabilityId, specialisations})
}
export{
    createCaretakerAccount
}