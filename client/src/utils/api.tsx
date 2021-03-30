import axios, { AxiosInstance } from 'axios';
export const instance: AxiosInstance = axios.create({
  baseURL: `${
    process.env.NODE_ENV === 'development' ? 'http://localhost:4000' : process.env.NEXT_PUBLIC_BASE_URL
  }/api/`,
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
