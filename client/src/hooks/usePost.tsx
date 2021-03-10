import { useEffect, useState } from 'react';
import axios from 'axios';
interface responseType {
  success?: boolean;
  message?: string;
  token?: string;
}

export const usePost = (url: string, data: {}) => {
  const response: responseType = { success: false };
  const [state, setState] = useState({ response, loading: false });
  useEffect(() => {
    async function f() {
      setState({ ...state, loading: true });
      if (url.length > 5) {
        const result = await axios({
          method: 'post',
          url: url,
          data: data,
        });
        console.log(result);

        setState({ response: result.data, loading: false });
      }
    }
    f();
    setState({ ...state, loading: false });
  }, [url, data]);
  return state;
};
