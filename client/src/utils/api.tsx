import axios, { AxiosInstance } from 'axios';
import { toast } from 'react-toastify';
export const instance: AxiosInstance = axios.create({
  baseURL: `/api`,
});

export const handleRegister = async (payload: {}): Promise<any> => {
  try {
    const res = await instance.post('/user/register', payload);
    if (!res.data.success) {
      handleError(res.data.message);
      return res.data;
    } else {
      const loginRes = await instance.post('/user/login', payload);
      if (!loginRes.data.success) {
        handleError(loginRes.data.message);
      }
      return loginRes.data;
    }
  } catch (err) {
    handleError('Oops! Something went wrong.');
    return false;
  }
};

export const handleLogin = async (payload: {}): Promise<any> => {
  try {
    const res = await instance.post('/user/login', payload);
    if (!res.data.success) {
      handleError(res.data.message);
    }
    return res.data;
  } catch (err) {
    handleError('Oops! Something went wrong.');
    return false;
  }
};

export const fetchCampaigns = async (): Promise<any> => {
  try {
    const res = await instance.get('/campaign');
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
