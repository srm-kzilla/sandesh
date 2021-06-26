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

export const postCampaigns = async (payload: {}): Promise<any> => {
  try {
    const res = await instance.post('/campaign/createCampaign', payload);
    if (!res.data.success) {
      handleError(res.data.message);
    }
    return res.data;
  } catch (err) {
    handleError('Oops! Something went wrong.');
    return false;
  }
};

export const postFile = async (payload: {}): Promise<any> => {
  try {
    const res = await instance.post('/campaign/uploadTemplate', payload);
    if (!res.data.success) {
      handleError(res.data.message);
    }
    return res.data;
  } catch (err) {
    handleError('Oops! Something went wrong.');
    return false;
  }
};

export const deleteCampaign = async (payload: {}): Promise<any> => {
  try {
    const res = await instance.delete('/campaign', payload);
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

export const postMailingLists = async (payload: {}): Promise<any> => {
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
    const res = await instance.post('/mailingList/update', payload);
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
    const res = await instance.delete('/mailingList/delete', payload);
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
    const res = await instance.get('/key/');
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
    const res = await instance.post('/key/', payload);
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

const handleError = (msg: string) => {
  toast.error(msg);
};
