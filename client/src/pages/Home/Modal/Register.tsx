import { Formik, Field, Form, FormikTouched, FormikErrors } from 'formik';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import * as yup from 'yup';
import { AuthContext } from '../../../store/authContext';
import { postCode } from '../../../utils/api';

import * as Unicons from '@iconscout/react-unicons';

interface RegisterProps {
  setShowModal: React.Dispatch<React.SetStateAction<'HIDDEN' | 'REGISTER' | 'LOGIN'>>;
  showModal: 'HIDDEN' | 'REGISTER' | 'LOGIN';
}
interface ResponseType {
  data?: { success: boolean; message: string };
  token?: string;
}

const handleError = (
  type: 'name' | 'email' | 'password' | 'domain' | 'designation',
  errors: FormikErrors<{
    name: string;
    email: string;
    password: string;
    domain: string;
    designation: string;
  }>,
  touched: FormikTouched<{
    name: string;
    email: string;
    password: string;
    domain: string;
    designation: string;
  }>,
) => {
  if (touched[type] && errors[type]) {
    return <span className="text-red-500 font-medium text-sm mt-1">{errors[type]}</span>;
  }
};

export const Register = ({ setShowModal }: RegisterProps) => {
  const { login } = useContext(AuthContext);
  const history = useHistory();
  const validationSchema = yup.object({
    name: yup.string().required('Please enter your name'),
    email: yup.string().email('Please enter a valid email').required('Email is required!'),
    password: yup.string().required('Password is required!').min(6, 'Password too short!'),
    designation: yup
      .string()
      .oneOf(
        ['Executive Board', 'CTO', 'CFO', 'Editor-in-cheif', 'Lead', 'Associate Lead', 'Member'],
        'Invalid designation!',
      )
      .required('Please select your designation'),
    domain: yup
      .string()
      .oneOf(['Technical', 'Sponsorship', 'Editorial', 'Events', 'Core'], 'Invalid domain!')
      .required('Please select your domain'),
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
      <div className="bg-transparent fixed inset-0 flex justify-center z-50 py-4">
        <div className="z-50 relative dark:bg-darkGray my-auto bg-white min-h-80 rounded-xl px-6 py-4 mx-4 overflow-y-auto max-h-full  w-full max-w-lg">
          <div className="flex justify-between items-start">
            <h3 className="text-3xl font-semibold">Register</h3>
            <Unicons.UilTimes className="cursor-pointer" onClick={() => setShowModal('HIDDEN')} />
          </div>
          <Formik
            initialValues={{ name: '', email: '', password: '', domain: '', designation: '' }}
            validationSchema={validationSchema}
            onSubmit={async (data, { setSubmitting }) => {
              const result: ResponseType = await postCode('user/register', data);
              if (result.data?.success) {
                const loginResult = await postCode('user/login', data);
                setApiResponse(loginResult);
              }
              setSubmitting(false);
            }}
          >
            {({ values, errors, touched, handleChange, isSubmitting }) => {
              return (
                <Form className="pb-6 pt-2 mx-auto flex flex-col w-11/12">
                  <Field
                    placeholder="Name"
                    type="input"
                    name="name"
                    className="bg-lightGray w-full rounded-xl mt-4 placeholder-secondary px-4 py-3 outline-none"
                  />
                  {handleError('name', errors, touched)}
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
                  <div className="relative mt-4">
                    <select
                      name="domain"
                      onChange={handleChange}
                      required
                      className="selectInput bg-lightGray w-full rounded-xl placeholder-secondary px-4 py-3 outline-none"
                    >
                      <option disabled selected value="">
                        Select Your Domain
                      </option>
                      <option value="Technical">Technical</option>
                      <option value="Sponsorship">Sponsorship</option>
                      <option value="Editorial">Editorial</option>
                      <option value="Events">Events</option>
                      <option value="Core">Core</option>
                    </select>
                    <Unicons.UilSort
                      size={20}
                      className="pointer-events-none absolute right-4 top-0 bottom-0 my-auto"
                    />
                  </div>
                  {handleError('domain', errors, touched)}
                  <div className="relative mt-4">
                    <select
                      name="designation"
                      onChange={handleChange}
                      required
                      className="selectInput bg-lightGray w-full rounded-xl placeholder-secondary px-4 py-3 outline-none"
                    >
                      <option disabled selected value="">
                        Select Your Designation
                      </option>
                      <option value="Executive Board">Executive Board</option>
                      <option value="CTO">CTO</option>
                      <option value="CFO">CFO</option>
                      <option value="Editor-in-chief">Editor-in-chief</option>
                      <option value="Lead">Lead</option>
                      <option value="Associate Lead">Associate Lead</option>
                      <option value="Member">Member</option>
                    </select>
                    <Unicons.UilSort
                      size={20}
                      className="pointer-events-none absolute right-4 top-0 bottom-0 my-auto"
                    />
                  </div>
                  {handleError('designation', errors, touched)}
                  <button disabled={isSubmitting} type="submit" className="actionBtn self-center mt-4">
                    Submit
                  </button>
                  <footer className="cursor-default text-center mt-2">
                    Already registred?{' '}
                    <span
                      onClick={() => {
                        setShowModal('LOGIN');
                      }}
                      className="text-primary font-bold hover:underline cursor-pointer"
                    >
                      Login
                    </span>
                  </footer>
                  {!apiResponse?.data?.success ? (
                    <span className="m-auto capitalize text-red-500">{apiResponse?.data?.message}</span>
                  ) : (
                    ''
                  )}
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
