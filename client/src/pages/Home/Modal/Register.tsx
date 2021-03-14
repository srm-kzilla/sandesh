import { Formik, Field, Form, FormikTouched, FormikErrors } from 'formik';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import * as yup from 'yup';
import { AuthContext } from '../../../store/authContext';
import { postCode } from '../../../utils/api';

interface RegisterProps {
  setShowModal: React.Dispatch<React.SetStateAction<string>>;
  showModal: 'hidden' | 'login' | 'register';
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
  if (touched[type]) {
    return <span className="text-red-400 max-w-xs">{errors[type]}</span>;
  }
};

export const Register = ({ setShowModal }: RegisterProps) => {
  const { login } = useContext(AuthContext);
  const history = useHistory();
  const validationSchema = yup.object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required().min(3),
    designation: yup
      .string()
      .oneOf(['Executive Board', 'CTO', 'CFO', 'Editor-in-cheif', 'Lead', 'Associate Lead', 'Member'])
      .required(),
    domain: yup.string().oneOf(['Technical', 'Sponsorship', 'Editorial', 'Events', 'Core']).required(),
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
            <h3 className="text-3xl font-semibold">Register</h3>
            <span className="cursor-pointer outline-none focus:outline-none" onClick={() => setShowModal('hidden')}>
              ×
            </span>
          </div>
          <div className=" p-6 flex felx-row mx-auto ">
            <Formik
              initialValues={{ name: '', email: '', password: '', domain: '', designation: '' }}
              validationSchema={validationSchema}
              onSubmit={async (data, { setSubmitting }) => {
                const result: ResponseType = await postCode('register', data);
                if (result.data?.success) {
                  const loginResult = await postCode('login', data);
                  setApiResponse(loginResult);
                }
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
                      <option value=" "> --SELECT--</option>
                      <option value="Executive Board">Executive Board</option>
                      <option value="CTO">CTO</option>
                      <option value="CFO">CFO</option>
                      <option value="Editor-in-chief">Editor-in-chief</option>
                      <option value="Lead">Lead</option>
                      <option value="Associate Lead">Associate Lead</option>
                      <option value="Member">Member</option>
                    </select>
                    {handleError('designation', errors, touched)}
                    <button disabled={isSubmitting} type="submit" className="actionBtn">
                      Submit
                    </button>
                    <span
                      className="cursor-pointer m-auto"
                      onClick={() => {
                        setShowModal('login');
                      }}
                    >
                      Already registred? Login
                    </span>
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
      </div>
      <div className="opacity-75 fixed inset-0 z-30 bg-black"></div>
    </div>
  );
};
