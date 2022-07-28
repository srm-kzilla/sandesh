import axios, { AxiosInstance } from 'axios';
import { toast } from 'react-toastify';
import { API_URL, TOKEN } from './constants';

export const instance: AxiosInstance = axios.create({
  baseURL: API_URL,

  headers: {
    authorization: TOKEN,
  },
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

export const postCampaigns = async (payload: any): Promise<any> => {
  try {
    console.log(payload);

    const res = await instance.post('/campaign/createCampaign', payload);
    if (!res.data.success) {
      handleError(res.data.message);
    }
    return res.data;
  } catch (err: any) {
    handleError('Oops! Something went wrong.');
    return false;
  }
};

export const deleteCampaign = async (payload: {}): Promise<any> => {
  try {
    const res = await instance.delete('/campaign', { data: { property: payload } });
    if (!res.data.success) {
      handleError(res.data.message);
    }
    return res.data;
  } catch (err) {
    handleError('Oops! Something went wrong.');
    return false;
  }
};
export const updateCampaign = async (payload: {}): Promise<any> => {
  try {
    console.log(payload);

    const res = await instance.put('/campaign', payload);
    if (!res.data.success) {
      handleError(res.data.message);
    }
    return res.data;
  } catch (err) {
    handleError('Oops! Something went wrong.');
    return false;
  }
};

export const fetchMailingLists = async (): Promise<any> => {
  try {
    const res = await instance.get('/mailingList/getList');
    if (!res.data.success) {
      handleError(res.data.message);
    }
    return res.data;
  } catch (err) {
    handleError('Oops! Something went wrong.');
    return false;
  }
};

export const postMailingList = async (payload: {}): Promise<any> => {
  try {
    const res = await instance.post('/mailingList/create', payload);
    if (!res.data.success) {
      handleError(res.data.message);
    }
    return res.data;
  } catch (err) {
    handleError('Oops! Something went wrong.');
    return false;
  }
};

export const updateMailingList = async (payload: {}): Promise<any> => {
  try {
    const res = await instance.post('/mailingList/Update', payload);
    if (!res.data.success) {
      handleError(res.data.message);
    }
    return res.data;
  } catch (err) {
    handleError('Oops! Something went wrong.');
    return false;
  }
};

export const deleteMailingLists = async (payload: {}): Promise<any> => {
  try {
    const res = await instance.delete('/mailingList', { data: payload });
    if (!res.data.success) {
      handleError(res.data.message);
    }
    return res.data;
  } catch (err) {
    handleError('Oops! Something went wrong.');
    return false;
  }
};

export const fetchKeys = async (): Promise<any> => {
  try {
    const res = await instance.get('/key');
    if (!res.data.success) {
      handleError(res.data.message);
    }
    return res.data;
  } catch (err) {
    handleError('Oops! Something went wrong.');
    return false;
  }
};

export const postKey = async (payload: {}): Promise<any> => {
  try {
    const res = await instance.post('/key', payload);
    if (!res.data.success) {
      handleError(res.data.message);
    }
    return res.data;
  } catch (err) {
    handleError('Oops! Something went wrong.');
    return false;
  }
};

export const deleteKey = async (payload: {}): Promise<any> => {
  try {
    const res = await instance.delete(`/key/${payload}`);
    if (!res.data.success) {
      handleError(res.data.message);
    }
    return res.data;
  } catch (err) {
    handleError('Oops! Something went wrong.');
    return false;
  }
};
export const resetKey = async (payload: string): Promise<any> => {
  try {
    const res = await instance.put(`/key/reset/${payload}`);
    if (!res.data.success) {
      handleError(res.data.message);
    }
    return res.data;
  } catch (err) {
    handleError('Oops! Something went wrong.');
    return false;
  }
};

export const toggleKey = async (payload: { _id: string; isEnabled: boolean }): Promise<any> => {
  try {
    const res = await instance.put(`/key/toggle/${payload._id}`, { isEnabled: !payload.isEnabled });
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
