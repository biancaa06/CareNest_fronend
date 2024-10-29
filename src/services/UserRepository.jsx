import api from "../../api.config";

function createBaseUser({firstName, lastName, email, phoneNumber, gender, password}){
    return api.post('/baseUser',{firstName, lastName, email, phoneNumber, gender, password});
}

export{
    createBaseUser
}