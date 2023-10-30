

const saveUserId = (userId) => {
    localStorage.setItem("userId",userId);
}

const saveMatchId = (matchId) => {
    localStorage.setItem("matchId",matchId);
}

const getUserId = () => {
    return localStorage.getItem("userId");

}

const getMatchId = () => {
    return localStorage.getItem("matchId");
}

const deleteMatchId = () => {
    return localStorage.removeItem("matchId");
}

export default {  saveUserId,saveMatchId,getUserId,getMatchId, deleteMatchId }