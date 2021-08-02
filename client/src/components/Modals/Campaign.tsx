import { Formik, Form, Field, FormikErrors, FormikTouched } from 'formik';
import { useEffect, useRef, useState } from 'react';
import * as yup from 'yup';
import { postCampaigns, updateCampaign } from '../../utils/api';
import { postTemplate, postCsv } from '../../utils/uploadFile';
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
  type: 'title' | 'mailingList' | 'start_date' | 'start_time' | 'scheduled' | 'subject' | 'senderMail' | 'dynamic',
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

    start_time: yup.string().when('scheduled', {
      is: true,
      then: yup.string().required(''),
    }),
    start_date: yup.string().when('scheduled', {
      is: true,
      then: yup.string().required(''),
    }),

    scheduled: yup.boolean().required(),

    subject: yup.string().required(),
    senderMail: yup.string().notRequired(),

    dynamic: yup.boolean().required(),
  });
  const [template, setTemplate] = useState<any>();
  const [csv, setCsv] = useState<any>();

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
                start_time: toFrontend(CampaignData.startTime, 'input').time,
                start_date: toFrontend(CampaignData.startTime, 'input').date,
              }
            : {
                title: '',
                mailingList: '',
                startTime: ' ',
                scheduled: false,
                subject: '',
                senderMail: '',
                fileName: '',
                csvFileName: ' ',
                dynamic: false,

                start_time: '',
                start_date: '',
              }
        }
        onSubmit={async (data, { setSubmitting }) => {
          setSubmitting(true);
          let formattedData: CampaignInput = data;
          if (data.scheduled) formattedData = formatDate(data);

          let uploadTemplate: any;
          let uploadCsv: any;

          if (template) uploadTemplate = await postTemplate(template);
          if (data.dynamic) uploadCsv = await postCsv(csv);

          if (createOrUpdate.current === 'update' || uploadTemplate.success) {
            if (template) {
              data.fileName = uploadTemplate.data;
              formattedData.fileName = uploadTemplate.data;
            }
            if (data.dynamic && csv) {
              data.csvFileName = uploadCsv.data;
              formattedData.csvFileName = uploadCsv.data;
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

              <label className="flex items-center w-full cursor-pointer pl-2">
                <Field placeholder="Scheduled" type="checkbox" name="scheduled" className="mr-4 my-4" />
                {handleError('scheduled', errors, touched)}
                <div>Scheduled</div>
              </label>

              {values.scheduled && (
                <Field placeholder="Start From" type="date" name="start_date" className="textInput cursor-pointer" />
              )}
              {handleError('start_date', errors, touched)}

              {values.scheduled && (
                <Field placeholder="Start From" type="time" name="start_time" className="textInput cursor-pointer" />
              )}
              {handleError('start_time', errors, touched)}

              <Field placeholder="Subject" type="text" name="subject" className="textInput" />
              {handleError('subject', errors, touched)}

              <Field placeholder="Sender Mail" type="text" name="senderMail" className="textInput" />
              {handleError('senderMail', errors, touched)}
              <input
                type="file"
                name="file"
                onChange={e => {
                  if (e.target.files && e.target.files.length > 0) {
                    setTemplate(e.target.files[0]);
                  }
                }}
                className="textInput"
              />

              <label className="flex items-center w-full cursor-pointer pl-2">
                <Field placeholder="Scheduled" type="checkbox" name="dynamic" className="mr-4 my-4" />
                {handleError('dynamic', errors, touched)}
                <div>Dynamic</div>
              </label>

              {values.dynamic && (
                <input
                  type="file"
                  name="csvFile"
                  onChange={e => {
                    if (e.target.files && e.target.files.length > 0) {
                      setCsv(e.target.files[0]);
                    }
                  }}
                  className="textInput"
                />
              )}

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
