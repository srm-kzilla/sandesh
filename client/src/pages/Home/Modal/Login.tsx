import { Formik, Field, Form, FormikTouched, FormikErrors } from 'formik';
import { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as yup from 'yup';

import { AuthContext } from '../../../store/authContext';
import { handleLogin } from '../../../utils/api';
import { Loader } from '../../../components';
import { ModalPropTypes } from './';

import * as Unicons from '@iconscout/react-unicons';

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
    return <span className="text-red-500 font-medium text-sm ml-2 mb-1">{errors[type]}</span>;
  }
};

export const Login = ({ setShowModal }: ModalPropTypes) => {
  const { login } = useContext(AuthContext);
  const history = useHistory();
  const validationSchema = yup.object({
    email: yup.string().email('Not a valid email!').required('Email is required!'),
    password: yup.string().required('Password is required!').min(6, 'Password is atleast 8 characters long!'),
  });

  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <div className="bg-transparent fixed inset-0 flex justify-center z-50">
        <div className="z-50 relative dark:bg-darkGray my-auto bg-white min-h-80 rounded-xl px-6 py-4 mx-4 overflow-y-auto max-h-screen w-full max-w-lg">
          <div className="flex justify-between items-start">
            <h3 className="text-3xl font-semibold mb-4">Login</h3>
            <Unicons.UilTimes className="cursor-pointer" onClick={() => setShowModal('HIDDEN')} />
          </div>

          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={async (data, { setSubmitting }) => {
              const result = await handleLogin(data);
              if (result.success) {
                login(result.token as string);
                history.push('/sends');
              }
              setSubmitting(false);
            }}
          >
            {({ values, errors, touched, handleChange, isSubmitting }) => {
              return (
                <Form className="pb-6 pt-2 mx-auto flex flex-col sm:w-11/12">
                  <Field placeholder="Email" type="email" name="email" className="textInput" />
                  {handleError('email', errors, touched)}
                  <Field name="password">
                    {({ field, form, meta }: any) => (
                      <div className="relative ">
                        <input
                          placeholder="Password"
                          type={showPassword ? 'text' : 'password'}
                          className="textInput"
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
                  <button disabled={isSubmitting} type="submit" className="actionBtn self-center mt-3">
                    {isSubmitting ? <Loader /> : 'Log In'}
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
