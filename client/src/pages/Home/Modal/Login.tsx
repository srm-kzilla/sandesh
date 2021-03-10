import { Formik, Field, Form, FormikTouched, FormikErrors } from 'formik';
import React, { useContext, useEffect, useState } from 'react';
import { usePost } from '../../../hooks/usePost';
import './Modal.css';
import * as yup from 'yup';
import { AuthContext } from '../../../store/authContext';

interface LoginProps {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  showModal: boolean;
  otherToggle: React.Dispatch<React.SetStateAction<boolean>>;
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

export const Login = ({ setShowModal, otherToggle }: LoginProps) => {
  const { login } = useContext(AuthContext);
  const [data, setData] = useState({});
  const [url, setUrl] = useState('');
  const { response, loading } = usePost(url, data);
  const validationSchema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().required().min(3),
  });
  useEffect(() => {
    if (response.success) {
      login(response.token as string);
      setShowModal(false);
    }
  }, [response, login, setShowModal]);
  return (
    <div className="modal">
      <div className="bg-transparent fixed inset-0 flex justify-center z-50">
        <div className="z-50 relative dark:bg-darkGray my-auto bg-white min-h-80 rounded-xl p-4 mx-4 overflow-y-auto max-h-screen w-max">
          <div className="flex justify-between">
            <h3 className="text-3xl font-semibold">Login</h3>
            <span className="cursor-pointer outline-none focus:outline-none" onClick={() => setShowModal(false)}>
              ×
            </span>
          </div>

          <div className=" p-6 flex felx-row mx-auto">
            <Formik
              initialValues={{ email: '', password: '' }}
              validationSchema={validationSchema}
              onSubmit={(data, { setSubmitting }) => {
                setSubmitting(true);
                setUrl('http://localhost:4000/api/user/login');
                setData(data);
                if (response.success) {
                  setShowModal(false);
                }
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
                      {loading ? 'Loading' : 'Submit'}
                    </button>
                    <span
                      className="cursor-pointer m-auto"
                      onClick={() => {
                        otherToggle(true);
                        setShowModal(false);
                      }}
                    >
                      Not registered? register
                    </span>
                    {!response.success ? (
                      <span className="m-auto capitalize text-red-500">{response.message}</span>
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
