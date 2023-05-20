import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

export const showInfoMessage = message => {
  toast.info(message, {
    position: 'bottom-right',
    // autoClose: 2000,
  });
};

export const showSuccessMessage = message => {
  toast.success(message, {
    position: 'bottom-right',
  });
};

export const showErrorMessage = message => {
  toast.error(message, {
    position: 'bottom-right',
  });
};
