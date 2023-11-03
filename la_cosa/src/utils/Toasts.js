import { toast } from "react-toastify";

const showErrorMsg = (error) =>{
    toast.error(error, {
        position: "bottom-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
}

const showSuccessMsg = (success) => {
    toast.success(success, {
        position: "bottom-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
}

const showInfoMsg = (info) => {
    toast.info(info, {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
}

export {showErrorMsg, showSuccessMsg, showInfoMsg};