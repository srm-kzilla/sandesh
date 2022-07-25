import { Formik, Field, Form, FormikTouched, FormikErrors } from 'formik';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { AuthContext } from '../../store/authContext';
import { handleLogin } from '../../utils/api';
import { Loader } from '../../components';

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
    return <span className="text-red-500 font-medium text-sm mt-1">{errors[type]}</span>;
  }
};

const Login = ({ setShowModal }: any) => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const validationSchema = yup.object({
    email: yup.string().email('Not a valid email!').required('Email is required!'),
    password: yup.string().required('Password is required!').min(6, 'Password is atleast 6 characters long!'),
  });

  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <div className=" p-6 flex felx-row mx-auto">
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={async (data, { setSubmitting }) => {
            const result = await handleLogin(data);
            if (result.success) {
              console.log(result.token);
              login(result.token as string);
              navigate('/sends');
            }
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
                  {isSubmitting ? <Loader /> : 'Log In'}
                </button>
                {/* Un-comment to add register function */}
                {/* <footer className="cursor-default text-center mt-2">
                  Don't have an account?
                  <span
                    onClick={() => {
                      setShowModal('REGISTER');
                    }}
                    className="text-primary font-bold hover:underline cursor-pointer"
                  >
                    Register
                  </span>
                </footer> */}
              </Form>
            );
          }}
        </Formik>
      </div>
    </>
  );
};
export default Login;
