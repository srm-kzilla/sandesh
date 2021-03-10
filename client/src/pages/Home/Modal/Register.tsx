import { Formik, Field, Form, FormikTouched, FormikErrors } from 'formik';
import React, { useEffect, useState } from 'react';
import { usePost } from '../../../hooks/usePost';
import './Modal.css';
import * as yup from 'yup';

interface RegisterProps {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  showModal: boolean;
  otherToggle: React.Dispatch<React.SetStateAction<boolean>>;
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
  if (touched[type]) {
    return <span className="text-red-400 max-w-xs">{errors[type]}</span>;
  }
};

export const Register = ({ setShowModal, otherToggle }: RegisterProps) => {
  const [data, setData] = useState({});

  const [url, setUrl] = useState('');
  const { response, loading } = usePost(url, data);
  const validationSchema = yup.object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required().min(3),
    designation: yup
      .string()
      .oneOf(['Executive Board ', 'CTO', 'CFO', 'Editor-in-cheif', 'Lead', 'Associate Lead', 'Member'])
      .required(),
    domain: yup.string().oneOf(['Technical', 'Sponsorship', 'Editorial', 'Events', 'Core']).required(),
  });
  useEffect(() => {
    if (response.success) setShowModal(false);
  }, [response, setShowModal]);
  return (
    <div className="modal">
      <div className="bg-transparent fixed inset-0 flex justify-center z-50">
        <div className="z-50 relative dark:bg-darkGray my-auto bg-white min-h-80 rounded-xl p-4 mx-4 overflow-y-auto max-h-screen w-max">
          <div className="flex justify-between">
            <h3 className="text-3xl font-semibold">Register</h3>
            <span className="cursor-pointer outline-none focus:outline-none" onClick={() => setShowModal(false)}>
              ×
            </span>
          </div>
          <div className=" p-6 flex felx-row mx-auto ">
            <Formik
              initialValues={{ name: '', email: '', password: '', domain: '', designation: '' }}
              validationSchema={validationSchema}
              onSubmit={(data, { setSubmitting }) => {
                setSubmitting(true);
                setUrl('http://localhost:4000/api/user/register');
                setData(data);

                setSubmitting(false);
              }}
            >
              {({ values, errors, touched, handleChange, isSubmitting }) => {
                return (
                  <Form className="flex flex-col">
                    <Field placeholder="Name" type="input" name="name" />
                    {handleError('name', errors, touched)}
                    <Field placeholder="Email" type="email" name="email" />
                    {handleError('email', errors, touched)}
                    <Field placeholder="Password" type="password" name="password" />
                    {handleError('password', errors, touched)}
                    <select name="domain" onChange={handleChange}>
                      <option value=" "> --SELECT--</option>
                      <option value="Technical">Technical</option>
                      <option value="Sponsorship">Sponsorship</option>
                      <option value="Editorial">Editorial</option>
                      <option value="Events">Events</option>
                      <option value="Core">Core</option>
                    </select>
                    {handleError('domain', errors, touched)}
                    <select name="designation" onChange={handleChange}>
                      <option value=" ">--SELECT--</option>
                      <option value="Executive Board">Executive Board</option>
                      <option value="asf">asf</option>
                      <option value="CTO">CTO</option>
                      <option value="CFO">CFO</option>
                      <option value="Editor-in-chief">Editor-in-chief</option>
                      <option value="Lead">Lead</option>
                      <option value="Associate Lead">Associate Lead</option>
                      <option value="Member">Member</option>
                    </select>
                    {handleError('designation', errors, touched)}
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
                      Already registred? Login
                    </span>
                    {!response.success ? (
                      <span className="m-auto capitalize text-red-500">{response.message}</span>
                    ) : (
                      ''
                    )}
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
