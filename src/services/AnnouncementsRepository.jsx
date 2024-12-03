import api from "../../api.config";

function getAllAnnouncements() {
    return api.get('/announcements');
}

function getAnnouncementById(id) {
    return api.get(`/announcements/id:${id}`);
}

function getAnnouncementsByAuthorId(authorId){
    return api.get(`/announcements/author/${authorId}`);
}

function updateAnnouncement({id, title, description}){
    return api.put(`/announcements/${id}`, {title, description})
}

function createAnnouncement({title, description, authorId}){
    return api.post('/announcements', {title, description, authorId})
}

function deleteAnnouncementById({id}){
    return api.delete(`/announcements/${id}`);
}


export{
    getAllAnnouncements,
    getAnnouncementById,
    getAnnouncementsByAuthorId,
    updateAnnouncement,
    createAnnouncement,
    deleteAnnouncementById
}