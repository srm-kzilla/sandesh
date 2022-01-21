import { Formik, Field, Form, FormikTouched, FormikErrors } from 'formik';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import * as yup from 'yup';

import { AuthContext } from '../../store/authContext';
import { handleRegister } from '../../utils/api';
import { Loader } from '../../components';

import * as Unicons from '@iconscout/react-unicons';

export const validationSchema = yup.object({
  name: yup.string().required('Please enter your name'),
  email: yup.string().email('Please enter a valid email').required('Email is required!'),
  password: yup.string().required('Password is required!').min(6, 'Password too short!'),
  designation: yup
    .string()
    .oneOf(
      ['Executive Board', 'CTO', 'CFO', 'Editor-in-chief', 'Lead', 'Associate Lead', 'Member'],
      'Invalid designation!',
    )
    .required('Please select your designation'),
  domain: yup
    .string()
    .oneOf(['Technical', 'Sponsorship', 'Editorial', 'Events', 'Core'], 'Invalid domain!')
    .required('Please select your domain'),
});

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

export const Register = ({ setShowModal }: any) => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <div className=" p-6 flex felx-row mx-auto">
        <Formik
          initialValues={{ name: '', email: '', password: '', domain: '', designation: '' }}
          validationSchema={validationSchema}
          onSubmit={async (data, { setSubmitting }) => {
            const result = await handleRegister(data);
            if (result.success) {
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
                  <Unicons.UilSort size={20} className="pointer-events-none absolute right-4 top-0 bottom-0 my-auto" />
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
                  <Unicons.UilSort size={20} className="pointer-events-none absolute right-4 top-0 bottom-0 my-auto" />
                </div>
                {handleError('designation', errors, touched)}
                <button disabled={isSubmitting} type="submit" className="actionBtn self-center mt-4">
                  {isSubmitting ? <Loader /> : 'Submit'}
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
              </Form>
            );
          }}
        </Formik>
      </div>
    </>
  );
};
export default Register;
