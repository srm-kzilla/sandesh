import { Formik, Form, Field, FormikErrors, FormikTouched } from 'formik';
import { useHistory } from 'react-router-dom';
import * as yup from 'yup';
import { updateCampaign } from '../../utils/api';
import Loader from '../Loader';

const handleError = (
  type: 'title' | 'mailingList' | 'startTime' | 'scheduled' | 'subject' | 'senderMail' | 'launchStatus' | 'fileName',
  errors: FormikErrors<{
    title: string;
    mailingList: string;
    startTime: string;
    scheduled: boolean;
    subject: string;
    senderMail: string;
    launchStatus: boolean;
    fileName: string;
  }>,
  touched: FormikTouched<{
    title: string;
    mailingList: string;
    startTime: string;
    scheduled: boolean;
    subject: string;
    senderMail: string;
    launchStatus: boolean;
    fileName: string;
  }>,
) => {
  if (touched[type] && errors[type]) {
    return <span className="text-red-500 font-medium text-sm ml-2 mb-1">{errors[type]}</span>;
  }
};

const EditCampaign = ({
  element,
  setModal,
}: {
  element: any;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const history = useHistory();
  const validationSchema = yup.object({
    title: yup.string().required().trim(),
    mailingList: yup.string().required().trim(),
    startTime: yup.string().required().trim(),
    scheduled: yup.boolean().required(),
    subject: yup.string().required(),
    senderMail: yup.string().notRequired(),
    launchStatus: yup.boolean().default(false).notRequired(),
    fileName: yup.string().required(),
  });
  return (
    <div className=" p-6 flex felx-row mx-auto">
      <Formik
        validationSchema={validationSchema}
        initialValues={element}
        onSubmit={async (data, { setSubmitting }) => {
          setSubmitting(true);
          data.id = element._id;
          const result = await updateCampaign(data);
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
              <Field placeholder="Title" type="text" name="title" className="textInput text-gray-500" disabled={true} />
              {handleError('title', errors, touched)}

              <Field placeholder="mailingList" type="text" name="mailingList" className="textInput" />
              {handleError('mailingList', errors, touched)}

              <Field placeholder="Start From" type="date" name="startTime" className="textInput cursor-pointer" />
              {handleError('startTime', errors, touched)}

              <label className="flex items-center w-full cursor-pointer pl-2">
                <Field placeholder="Scheduled" type="checkbox" name="scheduled" className="mr-4 my-4" />
                {handleError('scheduled', errors, touched)}
                <div>Scheduled</div>
              </label>

              <Field placeholder="Subject" type="text" name="subject" className="textInput" />
              {handleError('subject', errors, touched)}

              <Field placeholder="Sender Mail" type="text" name="senderMail" className="textInput" />
              {handleError('senderMail', errors, touched)}

              <label className="flex items-center w-full cursor-pointer pl-2">
                <Field placeholder="Launch Status" type="checkbox" name="launchStatus" className="mr-4 my-4" />
                {handleError('launchStatus', errors, touched)}
                <div>Launched</div>
              </label>

              <Field placeholder="File Name " type="text" name="fileName" className="textInput" />
              {handleError('fileName', errors, touched)}

              <button disabled={isSubmitting} type="submit" className="actionBtn self-center mt-3">
                {isSubmitting ? <Loader /> : 'Update Campaign'}
              </button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default EditCampaign;
