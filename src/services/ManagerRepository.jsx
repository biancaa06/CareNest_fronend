import api from "../../api.config";

function createManagerAccount({baseUserId, position}){
    return api.post("/manager", {baseUserId, position})
}

function getManagersByPosition({position}){
    return api.get(`/manager/position/${position.id}`);
}

function getManagerById (id) {
    return api.get(`/manager/${id}`);
};

export {
    createManagerAccount,
    getManagersByPosition,
    getManagerById
}