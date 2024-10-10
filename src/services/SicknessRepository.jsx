import api from "../../api.config";

function getAllSicknesses(){
    return api.get('/sickness');
}

function getSicknessById(id){
    return api.get(`/id:${id}`);
}

function createSickness(name) {
    return api.post('/sickness', name);
}

export{
    getAllSicknesses,
    getSicknessById,
    createSickness
}