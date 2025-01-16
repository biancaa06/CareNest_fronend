import api from "../../api.config";

function verifyEmail (email){
    return api.post(`/reset-password/verify-email/${email}`);
}

function resetPassword ({email, resetCode, newPassword}){
    return api.post(`/reset-password/new-password/${email}`, {resetCode, newPassword})
}

export{
    verifyEmail,
    resetPassword
}