import { Formik, Form, Field, FormikErrors, FormikTouched } from 'formik';
import { useEffect, useRef, useState } from 'react';
import * as yup from 'yup';
import { fetchMailingLists, postCampaigns, updateCampaign } from '../../utils/api';
import { toast } from 'react-toastify';
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

const CampaignModal = ({
  CampaignData,
  setModal,
  updateData,
  createOrUpdate,
}: {
  CampaignData?: any;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  updateData: () => {};
  createOrUpdate: 'create' | 'update';
}) => {
  const validationSchema = yup.object({
    title: yup.string().required().trim(),
    mailingList: yup.string().required().trim(),

    start_time: yup.string().when('scheduled', {
      is: true,
      then: yup.string().required('Start Time is Required'),
    }),
    start_date: yup.string().when('scheduled', {
      is: true,
      then: yup.string().required('Start Date is Required'),
    }),

    scheduled: yup.boolean().required(),

    subject: yup.string().required('Subject is Reuired'),
    senderMail: yup.string().notRequired(),

    dynamic: yup.boolean().required(),
  });
  const [template, setTemplate] = useState<any>();
  const [csv, setCsv] = useState<any>();
  const [mailingLists, setMailingLists] = useState<any>([]);
  const currentDate = new Date();
  const date = currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1) + '-' + currentDate.getDate();

  const handleError = (
    type: 'title' | 'mailingList' | 'start_date' | 'start_time' | 'scheduled' | 'subject' | 'senderMail' | 'dynamic',
    errors: FormikErrors<CampaignInput>,
    touched: FormikTouched<CampaignInput>,
  ) => {
    if (touched[type] && errors[type]) {
      return <span className="text-red-500 font-medium text-sm ml-2 mb-1 ">{errors[type]}</span>;
    }
  };

  useEffect(() => {
    (async function () {
      const lists = await fetchMailingLists();
      setMailingLists(await lists.data);
      if ((await lists.data.length) === 0) toast.error('No mailing lists');
      console.log(lists);
    })();
  }, []);

  return (
    <div className=" p-6 flex felx-row mx-auto">
      <Formik
        validationSchema={validationSchema}
        initialValues={
          createOrUpdate === 'create'
            ? {
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
            : { ...CampaignData! }
        }
        onSubmit={async (data, { setSubmitting }) => {
          setSubmitting(true);
          let formattedData: CampaignInput = data as any;
          formattedData.title = formattedData.title.replace(/\s+/g, ' ').trim();
          if (data.scheduled) formattedData = formatDate(data as any);

          let uploadTemplate: any = { success: false };
          let uploadCsv: any;

          if (createOrUpdate == 'create' || template) uploadTemplate = await postTemplate(template);
          if (data.dynamic && csv) uploadCsv = await postCsv(csv);

          if (createOrUpdate === 'update' || uploadTemplate.success) {
            if (template) {
              data.fileName = uploadTemplate.data;
              formattedData.fileName = uploadTemplate.data;
            }
            if (data.dynamic && csv) {
              data.csvFileName = uploadCsv.data;
              formattedData.csvFileName = uploadCsv.data;
            }

            delete formattedData.start_time;
            delete formattedData.start_date;

            let result: any;

            if (createOrUpdate === 'create') result = await postCampaigns(formattedData);
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
              <Field
                placeholder="Title"
                type="text"
                name="title"
                className={`textInput ${errors['title'] && touched['title'] ? 'border-2 border-red-600' : ''}`}
              />
              {handleError('title', errors, touched)}

              <div className="relative">
                <select
                  name="mailingList"
                  onChange={handleChange}
                  required
                  className="selectInput bg-lightGray w-full rounded-xl placeholder-secondary px-4 py-3 outline-none"
                >
                  <option value={''}>Select MailingList</option>
                  {mailingLists.map((list: any) => (
                    <option value={list.name}>{list.name}</option>
                  ))}
                </select>
              </div>
              {handleError('mailingList', errors, touched)}

              <div className="textInput flex items-center w-full cursor-pointer">
                <Field placeholder="Scheduled" type="checkbox" name="scheduled" className="mr-4" />
                {handleError('scheduled', errors, touched)}
                <div>Scheduled</div>
              </div>
              {values.scheduled && (
                <>
                  <div className="flex flex-nowrap">
                    <Field
                      placeholder="Start From"
                      type="date"
                      name="start_date"
                      className={`textInput mr-2 cursor-pointer ${
                        errors['start_date'] && touched['start_date'] ? 'border-2 border-red-600' : ''
                      }`}
                      min={date}
                    />

                    <Field
                      placeholder="Start From"
                      type="time"
                      name="start_time"
                      className={`textInput cursor-pointer ${
                        errors['start_time'] && touched['start_time'] ? 'border-2 border-red-600' : ''
                      }`}
                    />
                  </div>
                  <div className="flex w-full justify-around select-none text-gray-600">
                    <span>MM/DD/YYYY</span>
                    <span>hh:mm:(am/pm)</span>
                  </div>
                </>
              )}
              {handleError('start_date', errors, touched)}
              {handleError('start_time', errors, touched)}

              <Field
                placeholder="Subject"
                type="text"
                name="subject"
                className={`textInput cursor-pointer ${
                  errors['subject'] && touched['subject'] ? 'border-2 border-red-600' : ''
                }`}
              />
              {handleError('subject', errors, touched)}

              {/* <Field placeholder="Sender Mail" type="text" name="senderMail" className="textInput" /> */}
              <div className="relative">
                <select
                  name="senderMail"
                  onChange={handleChange}
                  required
                  className="selectInput bg-lightGray w-1/2 rounded-xl placeholder-secondary px-4 py-3 outline-none"
                >
                  <option value="">Select Sender mail</option>
                  <option value="sandesh.test">sandesh.test</option>
                  <option value="events">events</option>
                </select>
                <span className="w-1/2 ml-4">@srmkzilla.net</span>
              </div>
              {handleError('senderMail', errors, touched)}
              <input
                type="file"
                name="file"
                accept=".html"
                onChange={e => {
                  if (e.target.files && e.target.files.length > 0) {
                    setTemplate(e.target.files[0]);
                  }
                }}
                className="textInput"
              />

              <label className="textInput flex items-center w-full cursor-pointer">
                <Field placeholder="Scheduled" type="checkbox" name="dynamic" className="mr-4" />
                {handleError('dynamic', errors, touched)}
                <div>Dynamic</div>
              </label>

              {values.dynamic && (
                <input
                  type="file"
                  name="csvFile"
                  accept=".csv"
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
              {console.log(errors)}
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default CampaignModal;
