import { Formik, Form, Field, FormikErrors, FormikTouched } from 'formik';
import { useEffect, useRef, useState } from 'react';
import * as yup from 'yup';
import { postCampaigns, updateCampaign } from '../../utils/api';
import { postFile } from '../../utils/uploadFile';
import Loader from '../Loader';
import { CampaignInput } from '../../utils/interfaces';
import { toBackend, toFrontend } from '../../utils/FormatDate';

const formatDate = (data: CampaignInput) => {
  const date = new Date(data.start_date!);
  const time = data.start_time;

  const { minute, hour, day_of_month, month, day_of_week } = toBackend(date, time!, data.start_date!);
  data.startTime = `${minute} ${hour} ${day_of_month} ${month} ${day_of_week}`;

  return data;
};

const handleError = (
  type: 'title' | 'mailingList' | 'start_date' | 'start_time' | 'scheduled' | 'subject' | 'senderMail',
  errors: FormikErrors<CampaignInput>,
  touched: FormikTouched<CampaignInput>,
) => {
  if (touched[type] && errors[type]) {
    return <span className="text-red-500 font-medium text-sm ml-2 mb-1">{errors[type]}</span>;
  }
};

const CampaignModal = ({
  CampaignData,
  setModal,
  updateData,
}: {
  CampaignData?: any;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  updateData: () => {};
}) => {
  const validationSchema = yup.object({
    title: yup.string().required().trim(),
    mailingList: yup.string().required().trim(),

    start_time: yup.string().required().trim(),
    start_date: yup.string().required().trim(),

    scheduled: yup.boolean().required(),
    subject: yup.string().required(),
    senderMail: yup.string().notRequired(),
  });
  const [file, setFile] = useState<any>();

  let createOrUpdate: React.MutableRefObject<'create' | 'update'> = useRef('create');
  useEffect(() => {
    if (CampaignData) {
      createOrUpdate.current = 'update';
    }
  }, [CampaignData]);

  return (
    <div className=" p-6 flex felx-row mx-auto">
      <Formik
        validationSchema={validationSchema}
        initialValues={
          CampaignData
            ? {
                ...CampaignData,
                start_time: toFrontend(CampaignData.startTime).time,
                start_date: '2021-' + toFrontend(CampaignData.startTime).date,
              }
            : {
                title: '',
                mailingList: '',
                start_time: '',
                start_date: '',
                scheduled: false,
                subject: '',
                senderMail: '',
                fileName: '',
                startTime: '',
              }
        }
        onSubmit={async (data, { setSubmitting }) => {
          setSubmitting(true);

          const formattedData: CampaignInput = formatDate(data);
          let uploadFile: any;

          if (file) uploadFile = await postFile(file);

          if (createOrUpdate.current === 'update' || uploadFile.success) {
            if (file) {
              data.fileName = uploadFile.data;
              formattedData.fileName = uploadFile.data;
            }

            let result: any;

            if (createOrUpdate.current === 'create') result = await postCampaigns(formattedData);
            else {
              const id = CampaignData!._id;
              result = await updateCampaign({ id, ...formattedData });
            }

            if (result.success) {
              delete formattedData.start_date;
              delete formattedData.start_time;
              data.start_date = '';
              data.start_time = '';
              updateData();
              setModal(false);
            }
          }
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

              <Field placeholder="Start From" type="date" name="start_date" className="textInput cursor-pointer" />
              {handleError('start_date', errors, touched)}

              <Field placeholder="Start From" type="time" name="start_time" className="textInput cursor-pointer" />
              {handleError('start_time', errors, touched)}

              <label className="flex items-center w-full cursor-pointer pl-2">
                <Field placeholder="Scheduled" type="checkbox" name="scheduled" className="mr-4 my-4" />
                {handleError('scheduled', errors, touched)}
                <div>Scheduled</div>
              </label>

              <Field placeholder="Subject" type="text" name="subject" className="textInput" />
              {handleError('subject', errors, touched)}

              <Field placeholder="Sender Mail" type="text" name="senderMail" className="textInput" />
              {handleError('senderMail', errors, touched)}
              <input
                type="file"
                name="file"
                onChange={e => {
                  if (e.target.files && e.target.files.length > 0) {
                    setFile(e.target.files[0]);
                  }
                }}
                className="textInput"
              />

              <button disabled={isSubmitting} type="submit" className="actionBtn self-center mt-3">
                {isSubmitting ? <Loader /> : `${CampaignData ? 'Update' : 'Create'} Campaign`}
              </button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default CampaignModal;
