import axios from "axios";

function getAllAnnouncements(){
    return axios.get('http://localhost:8080/announcements');
}

function getAnnouncementById(id) {
    return axios.get(`http://localhost:8080/announcements/id:${id}`);
}


export{
    getAllAnnouncements,
    getAnnouncementById
}