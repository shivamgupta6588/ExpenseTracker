import { Link, useNavigate } from 'react-router-dom'; 
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const SignUp = () => {
  const navigate = useNavigate(); 

  const handleSubmit =async (values, { setSubmitting }) => {

   await axios.post('/api/users/signup', values)
      .then(response => {
        console.log('Signup successful:', response.data);
        navigate('/');
      })
      .catch(error => {
        console.error('Signup error:', error);
        setSubmitting(false); 
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full sm:w-1/2 lg:w-1/3">
        <h1 className="text-3xl text-center font-semibold text-gray-800 mb-6">Sign Up</h1>
        <Formik
          initialValues={{
            name: '',
            email: '',
            password: ''
          }}
          validationSchema={Yup.object({
            name: Yup.string().required('Required'),
            email: Yup.string().email('Invalid email address').required('Required'),
            password: Yup.string().min(6, 'Must be at least 6 characters').required('Required')
          })}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => ( // Destructure isSubmitting from Formik props
            <Form className="flex flex-col gap-4">
              <Field
                type="text"
                placeholder="name"
                id="name"
                name="name"
                className="border border-gray-300 rounded-lg p-3 focus:outline-none"
              />
              <ErrorMessage name="name" component="div" className="text-red-500" />
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
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Signing Up...' : 'Sign Up'}
              </button>
            </Form>
          )}
        </Formik>
        <div className="text-center mt-4 flex flex-row gap-2">
          <p>Have an account?</p>
          <Link to="/sign-in">
            <span className="text-blue-500 hover:underline">Sign In</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
