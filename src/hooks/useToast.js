import { toast } from "react-toastify";

const useToast = () => {
  const showToast = (toastMsg, toastTheme) => {
    const notify = () => {
      toast[toastTheme](toastMsg, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        newestOnTop: true,
        draggable: true,
        progress: undefined,
      });
    };
    notify();
  };
  return { showToast };
};
export { useToast };