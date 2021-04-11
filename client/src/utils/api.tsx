import axios, { AxiosInstance } from 'axios';
export const instance: AxiosInstance = axios.create({
  baseURL: `/api/`,
});

export const postCode = async (to: string, data: {}): Promise<{}> => {
  try {
    const res = await instance.post(`${to}`, data);
    return res;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const getCode = async (to: string, data: {}): Promise<{}> => {
  try {
    const res = await instance.get(`${to}`, data);
    return res;
  } catch (err) {
    console.error(err);
    return false;
  }
};
