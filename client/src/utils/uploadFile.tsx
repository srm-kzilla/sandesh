import { toast } from 'react-toastify';
import { instance } from './api';

export const postTemplate = async (payload: string): Promise<any> => {
  try {
    const formData = new FormData();
    const imagefile = payload;
    formData.append('template', imagefile);
    const res = await instance.post('/campaign/uploadTemplate', formData, {
      headers: { 'content-type': 'multipart/form-data' },
    });
    if (!res.data.success) {
      handleError(res.data.message);
    }
    return res.data;
  } catch (err: any) {
    handleError(err.message, err);
    return false;
  }
};

export const postCsv = async (payload: string): Promise<any> => {
  try {
    const formData = new FormData();
    const imagefile = payload;
    formData.append('template', imagefile);
    const res = await instance.post('/campaign/uploadCsv', formData, {
      headers: { 'content-type': 'multipart/form-data' },
    });
    if (!res.data.success) {
      handleError(res.data.message);
    }
    return res.data;
  } catch (err: any) {
    handleError(err.message, err);
    return false;
  }
};

const handleError = (msg: string, err?: any) => {
  toast.error(msg);
  console.log({ err });
};
