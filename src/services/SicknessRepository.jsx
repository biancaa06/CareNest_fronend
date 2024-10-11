import api from "../../api.config";

function getAllSicknesses(){
    return api.get('/sickness');
}

function getSicknessById(id){
    return api.get(`/sickness/id:${id}`);
}

function createSickness(name) {
    return api.post('/sickness', name);
}

function deleteSickness(id){
    return api.delete(`/sickness/${id}`);
}

export{
    getAllSicknesses,
    getSicknessById,
    createSickness,
    deleteSickness
}