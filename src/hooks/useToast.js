import { toast } from "react-toastify";

export const useToast = () => {
  const showToast = (toastMsg, toastTheme) => {
    const notifyMsg = () => {
      toast[toastTheme](toastMsg, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    };
    notifyMsg();
  };
  return { showToast };
};
