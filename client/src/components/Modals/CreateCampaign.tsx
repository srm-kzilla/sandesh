import { Formik, Form, Field, FormikErrors, FormikTouched } from 'formik';
import { useHistory } from 'react-router-dom';
import * as yup from 'yup';
import { postCampaigns } from '../../utils/api';
import Loader from '../Loader';

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

const CampaignModal = ({ setModal }: { setModal: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const history = useHistory();
  const validationSchema = yup.object({
    title: yup.string().required('Title is required!'),
    mailingList: yup.string().required('Mailing List is required!'),
    isolatedEmails: yup.string().required('Isolated Emails is required!'),
    startFrom: yup.string().required('Start From Date is required!'),
    endAt: yup.string().required('End At Date is required!'),
  });
  return (
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
          if (result.success) {
            history.go(0);
          }
          setModal(false);
          setSubmitting(false);
        }}
      >
        {({ values, errors, touched, handleChange, isSubmitting }) => {
          return (
            <Form className="pb-6 pt-2 mx-auto flex flex-col w-11/12">
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
  );
};

export default CampaignModal;
