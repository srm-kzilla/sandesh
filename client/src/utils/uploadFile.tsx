import axios, { AxiosInstance } from 'axios';
import { toast } from 'react-toastify';
const instance: AxiosInstance = axios.create({
  baseURL: `/api`,

  headers: {
    'Content-Type': 'multipart/form-data',
    authorization: localStorage.getItem('token'),
  },
});

export const postFile = async (payload: string): Promise<any> => {
  try {
    const formData = new FormData();
    const imagefile = payload;
    formData.append('template', imagefile);
    const res = await instance.post('/campaign/uploadTemplate', formData);
    if (!res.data.success) {
      handleError(res.data.message);
    }
    return res.data;
  } catch (err) {
    handleError('Oops! Something went wrong.');
    return false;
  }
};

const handleError = (msg: string) => {
  toast.error(msg);
};
