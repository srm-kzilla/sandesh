import { Formik, Field, Form, FormikTouched, FormikErrors } from 'formik';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as yup from 'yup';
import { AuthContext } from '../../../store/authContext';
import { postCode } from '../../../utils/api';

import * as Unicons from '@iconscout/react-unicons';

interface LoginProps {
  setShowModal: React.Dispatch<React.SetStateAction<'HIDDEN' | 'REGISTER' | 'LOGIN'>>;
  showModal: 'HIDDEN' | 'REGISTER' | 'LOGIN';
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
  if (touched[type] && errors[type]) {
    return <span className="text-red-500 font-medium text-sm mt-1">{errors[type]}</span>;
  }
};

export const Login = ({ setShowModal }: LoginProps) => {
  const { login } = useContext(AuthContext);
  const history = useHistory();
  const validationSchema = yup.object({
    email: yup.string().email('Not a valid email!').required('Email is required!'),
    password: yup.string().required('Password is required!').min(6, 'Password is atleast 8 characters long!'),
  });

  const [apiResponse, setApiResponse] = useState<ResponseType | undefined>();
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (apiResponse?.data?.success) {
      login(apiResponse.token as string);
      setShowModal('HIDDEN');
      history.push('/sends');
    }
  }, [apiResponse, login, setShowModal]);

  return (
    <>
      <div className="bg-transparent fixed inset-0 flex justify-center z-50">
        <div className="z-50 relative dark:bg-darkGray my-auto bg-white min-h-80 rounded-xl px-6 py-4 mx-4 overflow-y-auto max-h-screen w-full max-w-lg">
          <div className="flex justify-between items-start">
            <h3 className="text-3xl font-semibold">Login</h3>
            <Unicons.UilTimes className="cursor-pointer" onClick={() => setShowModal('HIDDEN')} />
          </div>

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
                <Form className="pb-6 pt-2 mx-auto flex flex-col w-11/12">
                  <Field
                    placeholder="Email"
                    type="email"
                    name="email"
                    className="bg-lightGray w-full rounded-xl mt-4 placeholder-secondary px-4 py-3 outline-none"
                  />
                  {handleError('email', errors, touched)}
                  <Field name="password">
                    {({ field, form, meta }: any) => (
                      <div className="relative mt-4">
                        <input
                          placeholder="Password"
                          type={showPassword ? 'text' : 'password'}
                          className="bg-lightGray w-full rounded-xl placeholder-secondary pl-4 pr-12 py-3 outline-none"
                          {...field}
                        />
                        <span
                          className="cursor-pointer absolute right-4 top-0 bottom-0 flex items-center"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <Unicons.UilEye size={20} /> : <Unicons.UilEyeSlash size={20} />}
                        </span>
                      </div>
                    )}
                  </Field>
                  {handleError('password', errors, touched)}
                  <button disabled={isSubmitting} type="submit" className="actionBtn self-center mt-4">
                    Log In
                  </button>
                  <footer className="cursor-default text-center mt-2">
                    Don't have an account?{' '}
                    <span
                      onClick={() => {
                        setShowModal('REGISTER');
                      }}
                      className="text-primary font-bold hover:underline cursor-pointer"
                    >
                      Register
                    </span>
                  </footer>
                  {!apiResponse?.data?.success ? (
                    <span className="m-auto capitalize text-red-500">{apiResponse?.data?.message}</span>
                  ) : null}
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
      <div className="opacity-75 fixed inset-0 z-30 bg-black"></div>
    </>
  );
};
