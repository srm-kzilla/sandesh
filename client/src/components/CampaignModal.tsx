import * as Unicons from '@iconscout/react-unicons';
import { Formik, Form, Field, FormikErrors, FormikTouched } from 'formik';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { postCampaigns } from '../utils/api';
import * as yup from 'yup';
import Loader from './Loader';

const handleError = (
  type: 'title' | 'mailingList' | 'isolatedEmails' | 'startFrom' | 'endAt',
  errors: FormikErrors<{
    title: string;
    mailingList: string;
    isolatedEmails: string;
    startFrom: string;
    endAt: string;
  }>,
  touched: FormikTouched<{
    title: string;
    mailingList: string;
    isolatedEmails: string;
    startFrom: string;
    endAt: string;
  }>,
) => {
  if (touched[type] && errors[type]) {
    return <span className="text-red-500 font-medium text-sm ml-2 mb-1">{errors[type]}</span>;
  }
};

const CampaignModal = () => {
  const [campaignsModal, setCampaignsModal] = useState(false);
  const history = useHistory();
  const validationSchema = yup.object({
    title: yup.string().required('Title is required!'),
    mailingList: yup.string().required('Mailing List is required!'),
    isolatedEmails: yup.string().required('Isolated Emails is required!'),
    startFrom: yup.string().required('Start From Date is required!'),
    endAt: yup.string().required('End At Date is required!'),
  });
  return (
    <>
      <div
        className="fixed bottom-0 right-0 rounded-full m-4 h-12 w-12 bg-primary cursor-pointer flex items-center justify-center"
        onClick={() => setCampaignsModal(true)}
      >
        <Unicons.UilMessage />
      </div>
      <div className={`modal ` + (campaignsModal ? '' : 'hidden')}>
        <div className="bg-transparent fixed inset-0 flex justify-center z-50">
          <div className="z-50 relative dark:bg-darkGray my-auto bg-white min-h-80 rounded-xl p-4 mx-4 overflow-y-auto max-h-screen w-full max-w-lg">
            <div className="flex justify-between">
              <h3 className="text-3xl font-semibold">Create Campaign</h3>
              <span className="cursor-pointer outline-none focus:outline-none" onClick={() => setCampaignsModal(false)}>
                ×
              </span>
            </div>

            <div className=" p-6 flex felx-row mx-auto">
              <Formik
                validationSchema={validationSchema}
                initialValues={{
                  title: '',
                  mailingList: '',
                  isolatedEmails: '',
                  startFrom: '',
                  endAt: '',
                }}
                onSubmit={async (data, { setSubmitting }) => {
                  setSubmitting(true);
                  const result = await postCampaigns(data);
                  console.log(result);
                  console.log(data);
                  if (result.success) {
                    history.push('/sends');
                    setCampaignsModal(false);
                  }
                  setSubmitting(false);
                }}
              >
                {({ values, errors, touched, handleChange, isSubmitting }) => {
                  return (
                    <Form className="pb-6 pt-2 mx-auto flex flex-col sm:w-11/12">
                      <Field placeholder="Title" type="text" name="title" className="textInput" />
                      {handleError('title', errors, touched)}
                      <Field placeholder="mailingList" type="text" name="mailingList" className="textInput" />
                      {handleError('mailingList', errors, touched)}
                      <Field placeholder="isolatedEmails" type="text" name="isolatedEmails" className="textInput" />
                      {handleError('isolatedEmails', errors, touched)}
                      <Field placeholder="Start From" type="date" name="startFrom" className="textInput" />
                      {handleError('startFrom', errors, touched)}
                      <Field placeholder="End At" type="date" name="endAt" className="textInput" />
                      {handleError('endAt', errors, touched)}
                      <button disabled={isSubmitting} type="submit" className="actionBtn self-center mt-3">
                        {isSubmitting ? <Loader /> : 'Create Campaign'}
                      </button>
                    </Form>
                  );
                }}
              </Formik>
            </div>
          </div>
        </div>
        <div className="opacity-75 fixed inset-0 z-30 bg-black"></div>
      </div>
    </>
  );
};

export default CampaignModal;
