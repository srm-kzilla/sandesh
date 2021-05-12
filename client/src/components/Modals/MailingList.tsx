import { Formik, Form, Field, FormikErrors, FormikTouched } from 'formik';
import React, { useState } from 'react';
import * as yup from 'yup';
import { postMailingLists, updateMailingList } from '../../utils/api';
import Loader from '../Loader';
import * as Unicons from '@iconscout/react-unicons';
import { useHistory } from 'react-router-dom';

interface ModalProps {
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  MailingListData?: { name: string; description: string; id: string; emails: [] };
}

const formatEmails = (emailInput: string) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let emailArray = emailInput.split(/[\n,]+/);
  emailArray.forEach((_, id) => {
    emailArray[id] = emailArray[id].trim();
  });
  emailArray = emailArray.filter(email => re.test(email));
  return emailArray;
};

const handleError = (
  type: 'name' | 'desc' | 'emails',
  errors: FormikErrors<{
    name: string;
    desc: string;
    emails: string[];
  }>,
  touched: FormikTouched<{
    name: string;
    desc: string;
    emails: string[];
  }>,
) => {
  if (touched[type] && errors[type]) {
    return <span className="text-red-500 font-medium text-sm ml-2 mb-1">{errors[type]}</span>;
  }
};

const MailingList = ({ modal, setModal, MailingListData }: ModalProps) => {
  const history = useHistory();
  let originalData = { oldName: '', oldDescription: '', oldEmails: [] };
  let formattedEmails: string[];
  const [emailList, setEmailList] = useState<string[]>([]);

  const updateList = (values: { emails: string[]; emailInput: string }) => {
    formattedEmails = formatEmails(values.emailInput);
    setEmailList(ogValue => [...formattedEmails, ...ogValue]);
    values.emails = emailList;
    values.emailInput = '';
    formattedEmails = [];
  };
  let createOrUpdate: 'create' | 'update' = 'create';

  if (MailingListData) {
    originalData.oldName = MailingListData.name;
    originalData.oldDescription = MailingListData.description;
    originalData.oldEmails = MailingListData.emails;
    createOrUpdate = 'update';
  }
  const validationSchema = yup.object({
    name: yup.string().required('Name is Required').trim(), // Name to uniquely Identify mailing List
    emails: yup.array().of(yup.string().email()).required('Email array is Required'), //Array of Email
    desc: yup.string().required('Description is Requried').trim(), // String to define Mailing List
  });
  return (
    <>
      <div className=" p-6 flex felx-row mx-auto">
        <Formik
          validationSchema={validationSchema}
          initialValues={{
            name: originalData.oldName || '',
            desc: originalData.oldDescription || '',
            emails: originalData.oldEmails || [''],
            emailInput: '',
          }}
          onSubmit={async (data, { setSubmitting }) => {
            setSubmitting(true);
            updateList(data);
            const formattedData: any = data;
            delete formattedData.emailList;
            let result: any;
            if (createOrUpdate === 'create') {
              result = await postMailingLists(formattedData);
            } else {
              const id = MailingListData!.id;
              result = await updateMailingList({ id, ...formattedData });
            }
            if (result.success) {
              history.go(0);
              setModal(false);
            }
            setSubmitting(false);
          }}
        >
          {({ values, errors, touched, handleChange, isSubmitting }) => {
            return (
              <Form className="pb-6 pt-2 mx-auto flex flex-col w-11/12">
                {MailingListData ? setEmailList(MailingListData.emails) : null}
                <Field placeholder="Name" type="text" name="name" className="textInput" />
                {handleError('name', errors, touched)}

                <Field placeholder="Description" type="text" name="desc" className="textInput" />
                {handleError('desc', errors, touched)}

                <div className="w-full flex flex-col">
                  <Field as="textarea" name="emailInput" className="textInput" placeholder="Enter Emails" />
                  <button type="button" className="actionBtn self-center my-4" onClick={() => updateList(values)}>
                    Add
                  </button>
                </div>
                {handleError('emails', errors, touched)}
                <div className="bg-lightGray rounded-md p-4 overflow-y-auto max-h-96">
                  {emailList.map((email, idx) => {
                    return (
                      <div key={idx} className="flex items-center mb-4">
                        <Unicons.UilTrash
                          key={idx + 'trashicon'}
                          size={16}
                          className="mx-4 cursor-pointer"
                          onClick={(e: Event) => {
                            e.stopPropagation();
                            e.preventDefault();
                            let tempList = emailList;
                            tempList.splice(idx, 1);
                            setEmailList(tempList);
                            updateList(values);
                          }}
                        />
                        <div key={idx} className="w-max">
                          {email}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <button disabled={isSubmitting} type="submit" className="actionBtn self-center mt-3">
                  {isSubmitting ? <Loader /> : 'Create/Update Mailing List'}
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
