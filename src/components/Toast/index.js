import { toast } from "react-toastify";
import "./styles.css";

const tipyToast = {
  success(msg, options = {}) {
    return toast.success(msg, {
      ...options,
      className: "toast-success-container toast-success-container-after",
      progressClassName: ".toast-success-progress",
    });
  },
  error(msg, options = {}) {
    return toast.error(msg, {
      ...options,
      className: "toast-error-container toast-error-container-after",
      progressClassName: ".toast-error-progress",
    });
  },
  info(msg, options = {}) {
    return toast.error(msg, {
      ...options,
      className: "toast-info-container toast-info-container-after",
      progressClassName: ".toast-info-progress",
    });
  },
};

export default tipyToast;
