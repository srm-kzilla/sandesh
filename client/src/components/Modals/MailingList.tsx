import * as Unicons from '@iconscout/react-unicons';
import { Field, Form, Formik, FormikErrors, FormikTouched } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import * as yup from 'yup';
import { postMailingList, updateMailingList } from '../../utils/api';
import Loader from '../Loader';

interface ModalProps {
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  MailingListData?: { name: string; description: string; id: string; emails: string[] };
  updateData: () => {};
  createOrUpdate: 'create' | 'update';
}

const formatEmails = (emailInput: string, emailList: string[]) => {
  let emailArray = emailInput.split(/[\n,]+/);
  emailArray.forEach((_, id) => {
    emailArray[id] = emailArray[id].trim();
  });
  const schema = yup.string().trim().required().email();
  const rejectedEmails: string[] = [];
  emailArray = emailArray.filter(email => {
    const isValid = schema.isValidSync(email);
    if (!isValid) rejectedEmails.push(email);
    return isValid;
  });
  return [emailArray, rejectedEmails];
};

const handleError = (
  type: 'name' | 'description' | 'emails',
  errors: FormikErrors<{
    name: string;
    description: string;
    emails: string[];
  }>,
  touched: FormikTouched<{
    name: string;
    description: string;
    emails: string[];
  }>,
) => {
  if (touched[type] && errors[type]) {
    return <span className="text-red-500 font-medium text-sm ml-2 mb-1">{errors[type]}</span>;
  }
};

const MailingList = ({ modal, setModal, MailingListData, updateData, createOrUpdate }: ModalProps) => {
  const [emailList, setEmailList] = useState<string[]>([]);
  let emailInputEmpty: boolean = true;
  const updateList = (values: { emails: string[]; emailInput: string }) => {
    const formattedEmails = formatEmails(values.emailInput, emailList);
    setEmailList(ogValues => [...ogValues, ...formattedEmails[0]]);

    setEmailList(ogVlaues => ogVlaues.filter((email, index) => ogVlaues.indexOf(email) === index));
    values.emails = emailList;
    values.emailInput = formattedEmails[1].toString();
  };

  useEffect(() => {
    if (MailingListData) {
      setEmailList(MailingListData.emails);
      createOrUpdate = 'update';
    }
  }, [MailingListData]);

  const validationSchema = yup.object({
    name: yup.string().required('Name is Required').trim(), // Name to uniquely Identify mailing List
    emails: yup.array().of(yup.string().email()).required('Email array is Required'), //Array of Email
    description: yup.string().required().trim(), // String to define Mailing List
  });

  return (
    <>
      <div className=" p-6 flex felx-row mx-auto">
        <Formik
          validationSchema={validationSchema}
          initialValues={{
            name: MailingListData ? MailingListData.name : '',
            description: MailingListData ? MailingListData.description : '',
            emails: MailingListData ? MailingListData.emails : [''],
            emailInput: '',
          }}
          onSubmit={async (data, { setSubmitting }) => {
            setSubmitting(true);
            emailInputEmpty = true;
            if (data.emailInput) {
              emailInputEmpty = false;
              return;
            }
            updateList(data);
            const formattedData: any = data;
            delete formattedData.emailList;
            let result: any;
            if (createOrUpdate === 'create') {
              result = await postMailingList(formattedData);
            } else {
              const id = MailingListData!.id;
              result = await updateMailingList({ id, ...formattedData });
            }

            if (await result.success) {
              updateData();
              setModal(false);
            }
            setSubmitting(false);
          }}
        >
          {({ values, errors, touched, handleChange, isSubmitting }) => {
            return (
              <Form className="pb-6 pt-2 mx-auto flex flex-col w-11/12">
                {/* {MailingListData ? setEmailList(MailingListData.emails) : null} */}
                <Field
                  placeholder="Name"
                  type="text"
                  name="name"
                  className={`textInput ${errors['name'] && touched['name'] ? 'border-2 border-red-600' : ''}`}
                />
                {handleError('name', errors, touched)}

                <Field
                  placeholder="Description"
                  type="text"
                  name="description"
                  className={`textInput ${errors['name'] && touched['name'] ? 'border-2 border-red-600' : ''}`}
                />
                {handleError('description', errors, touched)}

                <div className="w-full flex flex-col">
                  <Field as="textarea" name="emailInput" className="textInput" placeholder="Enter Emails" />
                  {!emailInputEmpty && (
                    <span className="text-red-500 font-medium text-sm ml-2 mb-1">Input must be empty</span>
                  )}
                  <button
                    type="button"
                    className="actionBtn self-center items-center my-4 flex flex-nowrap"
                    onClick={() => updateList(values)}
                  >
                    Add to list <Unicons.UilArrowDown />
                  </button>
                </div>
                {handleError('emails', errors, touched)}
                <ul
                  className="bg-lightGray rounded-md p-4 overflow-y-auto max-h-96 list-decimal"
                  style={{ listStyle: 'decimal' }}
                >
                  {emailList.map((email, idx) => {
                    return (
                      <li key={idx} className="flex items-center mb-4 justify-between">
                        <div key={idx} className="w-max">
                          <span className="text-sm select-none">{idx > 8 ? idx + 1 : '0' + (idx + 1)})&nbsp;</span>
                          {email}
                        </div>
                        <Unicons.UilTrash
                          key={idx + 'trashicon'}
                          size={16}
                          className="mx-4 cursor-pointer text-red-600"
                          onClick={(e: Event) => {
                            e.stopPropagation();
                            e.preventDefault();
                            const tempList = emailList;
                            tempList.splice(idx, 1);
                            setEmailList(tempList);
                            updateList(values);
                          }}
                        />
                      </li>
                    );
                  })}
                </ul>
                <button disabled={isSubmitting} type="submit" className="actionBtn self-center mt-3">
                  {isSubmitting ? <Loader /> : `${createOrUpdate === 'create' ? 'create' : 'update'} Mailing List`}
                </button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </>
  );
};

export default MailingList;
