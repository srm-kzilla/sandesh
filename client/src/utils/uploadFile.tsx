import axios, { AxiosInstance } from 'axios';
import { toast } from 'react-toastify';
const instance: AxiosInstance = axios.create({
  baseURL: `https://sandesh-api.srmkzilla.net/api`,

  headers: {
    'Content-Type': 'multipart/form-data',
    authorization: localStorage.getItem('token') as string,
  },
});

export const postTemplate = async (payload: string): Promise<any> => {
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

export const postCsv = async (payload: string): Promise<any> => {
  try {
    const formData = new FormData();
    const imagefile = payload;
    formData.append('template', imagefile);
    const res = await instance.post('/campaign/uploadCsv', formData);
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
