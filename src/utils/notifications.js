import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

export const showInfoMessage = message => {
  toast.info(message);
};

export const showSuccessMessage = message => {
  toast.success(message);
};

export const showErrorMessage = message => {
  toast.error(message);
};
