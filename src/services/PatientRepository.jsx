import api from "../../api.config";

function createPatientAccount({baseUserId, personalDescription, sicknesses}){
    return api.post('/patient',{baseUserId, personalDescription, sicknesses});
}

export{
    createPatientAccount
}