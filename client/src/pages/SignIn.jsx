import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const SignIn = () => {

  const handleSubmit=()=>{
}

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full sm:w-1/2 lg:w-1/3">
        <h1 className="text-3xl text-center font-semibold text-gray-800 mb-6">Sign In</h1>
        <Formik
          initialValues={{
            email: '',
            password: ''
          }}
          validationSchema={Yup.object({
            email: Yup.string().email('Invalid email address').required('Required'),
            password: Yup.string().required('Required')
          })}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
          }}
        >
          <Form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <Field
              type="text"
              placeholder="Email"
              id="email"
              name="email"
              className="border border-gray-300 rounded-lg p-3 focus:outline-none"
            />
            <ErrorMessage name="email" component="div" className="text-red-500" />
            <Field
              type="password"
              placeholder="Password"
              id="password"
              name="password"
              className="border border-gray-300 rounded-lg p-3 focus:outline-none"
            />
            <ErrorMessage name="password" component="div" className="text-red-500" />
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Sign In
            </button>
          </Form>
        </Formik>
        <div className="text-center mt-4 flex flex-row gap-2">
          <p>Don &apos;t have an account?</p>
          <Link to="/sign-up">
            <span className="text-blue-500 hover:underline">Sign Up</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
