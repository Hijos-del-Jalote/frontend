

const saveUserId = (userId) => {
    localStorage.setItem("userId",userId);
}

const saveMatchId = (matchId) => {
    localStorage.setItem("matchId",matchId);
}


export default {  saveUserId,saveMatchId}