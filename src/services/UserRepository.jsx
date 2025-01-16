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

function uploadProfilePicture({userId, file}){
    return api.put(`/baseUser/${userId}/image-upload`, file, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
}

function getStatistics(){
    return api.get('/baseUser/statistics');
}

export{
    createBaseUser,
    getBaseUserById,
    updateBaseUserAddress,
    uploadProfilePicture,
    getStatistics
}