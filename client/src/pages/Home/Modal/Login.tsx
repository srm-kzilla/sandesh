import { Formik, Field, Form, FormikTouched, FormikErrors } from 'formik';
import React, { useContext, useEffect, useState } from 'react';
import * as yup from 'yup';
import { AuthContext } from '../../../store/authContext';
import { postCode } from '../../../utils/api';
import { useHistory } from 'react-router-dom';

interface LoginProps {
  setShowModal: React.Dispatch<React.SetStateAction<string>>;
  showModal: 'hidden' | 'login' | 'register';
}
interface ResponseType {
  data?: { success: boolean; message: string };
  token?: string;
}

const handleError = (
  type: 'email' | 'password',
  errors: FormikErrors<{
    email: string;
    password: string;
  }>,
  touched: FormikTouched<{
    email: string;
    password: string;
  }>,
) => {
  if (touched[type]) {
    return <span className="text-red-400 ">{errors[type]}</span>;
  }
};

export const Login = ({ setShowModal }: LoginProps) => {
  const { login } = useContext(AuthContext);
  const history = useHistory();
  const validationSchema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().required().min(3),
  });
  const [apiResponse, setApiResponse] = useState<ResponseType | undefined>();

  useEffect(() => {
    if (apiResponse?.data?.success) {
      login(apiResponse.token as string);
      setShowModal('hidden');
      history.push('/sends');
    }
  }, [apiResponse, login, setShowModal]);

  return (
    <div className="modal">
      <div className="bg-transparent fixed inset-0 flex justify-center z-50">
        <div className="z-50 relative dark:bg-darkGray my-auto bg-white min-h-80 rounded-xl p-4 mx-4 overflow-y-auto max-h-screen w-max">
          <div className="flex justify-between">
            <h3 className="text-3xl font-semibold">Login</h3>
            <span className="cursor-pointer outline-none focus:outline-none" onClick={() => setShowModal('hidden')}>
              ×
            </span>
          </div>

          <div className=" p-6 flex felx-row mx-auto">
            <Formik
              initialValues={{ email: '', password: '' }}
              validationSchema={validationSchema}
              onSubmit={async (data, { setSubmitting }) => {
                setSubmitting(true);
                const result = await postCode('user/login', data);
                setApiResponse(result);
                setSubmitting(false);
              }}
            >
              {({ values, errors, touched, handleChange, isSubmitting }) => {
                return (
                  <Form className="flex flex-col">
                    <Field placeholder="Email" type="email" name="email" />
                    {handleError('email', errors, touched)}
                    <Field placeholder="Password" type="password" name="password" />
                    {handleError('password', errors, touched)}
                    <button disabled={isSubmitting} type="submit" className="actionBtn">
                      Submit
                    </button>
                    <span
                      className="cursor-pointer m-auto"
                      onClick={() => {
                        setShowModal('register');
                      }}
                    >
                      Not registered? register
                    </span>
                    {!apiResponse?.data?.success ? (
                      <span className="m-auto capitalize text-red-500">{apiResponse?.data?.message}</span>
                    ) : null}
                  </Form>
                );
              }}
            </Formik>
          </div>
        </div>
      </div>
      <div className="opacity-75 fixed inset-0 z-30 bg-black"></div>
    </div>
  );
};
