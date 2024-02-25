import { Link ,useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { signInFailure, signInStart, signInSuccess } from '../../redux/user/userSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const SignIn = () => {

  const dispatch=useDispatch()

  const navigate = useNavigate(); 

  const handleSubmit = async (values, { setSubmitting }) => {
    dispatch(signInStart());
    try {
      const response = await axios.post('/api/users/signin', values);
      dispatch(signInSuccess(response.data));
      navigate('/');
      toast.success('Sign in successful');
    } catch (error) {
      console.error('SignIn error:', error);
      dispatch(signInFailure(error.message));
      if (setSubmitting) {
        setSubmitting(false); 
      }
      toast.error('Sign in failed. Please check your credentials.');
    }
  };
  
  
  


  return (
    <div className="min-h-screen flex items-center justify-center max-sm:m-4">
      <div className="bg-[#ffdc99] p-8 rounded-lg shadow-md w-full sm:w-1/2 lg:w-1/3">
        <h1 className="text-3xl text-center font-semibold text-orange-800 mb-6">Sign In</h1>
        <Formik
          initialValues={{
            email: '',
            password: ''
          }}
          validationSchema={Yup.object({
            email: Yup.string().email('Invalid email address').required('Required'),
            password: Yup.string().required('Required')
          })}
         
        onSubmit={handleSubmit}
        >
           {({isSubmitting}) => (
          <Form className="flex flex-col gap-4" >
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
              className="bg-[#9c6936] text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Sign In
            </button>
          </Form>)}
        </Formik>
        <div className="text-center mt-4 flex flex-wrap gap-2">
          <p>Don&apos;t have an account?</p>
          <Link to="/sign-up">
            <span className="text-blue-500 hover:underline ">Sign Up</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
