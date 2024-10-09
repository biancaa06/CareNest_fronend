import api from "../../api.config";

function getAllAnnouncements() {
    return api.get('/announcements');
}

function getAnnouncementById(id) {
    return api.get(`/announcements/id:${id}`);
}


export{
    getAllAnnouncements,
    getAnnouncementById
}