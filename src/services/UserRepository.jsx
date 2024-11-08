import api from "../../api.config";

function createBaseUser({firstName, lastName, email, phoneNumber, gender, password}){
    return api.post('/baseUser',{firstName, lastName, email, phoneNumber, gender, password});
}

function getBaseUserById(id){
    return api.get(`/baseUser/${id}`);
}

function updateBaseUserAddress({country, city, street, number, id}){
    return api.put(`/baseUser/updateAddress/${id}`, {country, city, street, number});
}

export{
    createBaseUser,
    getBaseUserById,
    updateBaseUserAddress
}