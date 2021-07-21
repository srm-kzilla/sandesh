import { Field, Form, Formik, FormikErrors, FormikTouched } from 'formik';
import * as yup from 'yup';
import { Loader } from '../../components';
import { postKey } from '../../utils/api';
const handleError = (
  type: 'user',
  errors: FormikErrors<{
    user: string;
  }>,
  touched: FormikTouched<{
    user: string;
  }>,
) => {
  if (touched[type] && errors[type]) {
    return <span className="text-red-500 font-medium text-sm mt-1">{errors[type]}</span>;
  }
};

const Login = ({ setModal, updateData }: any) => {
  const validationSchema = yup.object({
    user: yup.string().required(),
  });

  return (
    <>
      <div className=" p-6 flex felx-row mx-auto">
        <Formik
          initialValues={{ user: '' }}
          validationSchema={validationSchema}
          onSubmit={async (data, { setSubmitting }) => {
            const result = await postKey(data);

            if (result.success) {
              updateData();
              setModal(false);
            }
            setSubmitting(false);
          }}
        >
          {({ values, errors, touched, handleChange, isSubmitting }) => {
            return (
              <Form className="pb-6 pt-2 mx-auto flex flex-col w-11/12">
                <Field
                  placeholder="user"
                  type="user"
                  name="user"
                  className="bg-lightGray w-full rounded-xl mt-4 placeholder-secondary px-4 py-3 outline-none"
                />
                {handleError('user', errors, touched)}

                <button disabled={isSubmitting} type="submit" className="actionBtn self-center mt-4">
                  {isSubmitting ? <Loader /> : 'Create'}
                </button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </>
  );
};
export default Login;
