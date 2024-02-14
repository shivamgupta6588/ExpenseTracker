import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useSelector } from 'react-redux';

const UpdateTransaction = () => {
  const [formData, setFormData] = useState(null); // Initialize formData as null
  const [loading, setLoading] = useState(true); // Add loading state
  const { currentUser } = useSelector(state => (state.user));
  const { id } = useParams();
  const navigate=useNavigate();

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const res = await axios.get(`/api/transaction/gettransaction/${id}`);
        const formattedData = { ...res.data, date: new Date(res.data.date).toLocaleDateString('en-CA') };
        setFormData(formattedData);
        setLoading(false); 
      } catch (error) {
        console.error('Error fetching transaction:', error);
      }
    };
    
    fetchTransaction();
  }, [id]);

  const validationSchema = Yup.object({
    description: Yup.string().required('Description is required'),
    amount: Yup.number().required('Amount is required').positive('Amount must be positive'),
    type: Yup.string().required('Type is required').oneOf(['income', 'expense'], 'Invalid type'),
    category: Yup.string().required('Category is required'),
    date: Yup.date().required('Date is required'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await axios.post(`/api/transaction/update/${id}`, {...values, reference: currentUser._id});
      console.log('Transaction updated successfully');
      navigate('/get-transaction');
    } catch (error) {
      console.error('Error updating transaction:', error);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Render loading indicator while data is being fetched
  }

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Update Transaction</h2>
      <Formik
        initialValues={formData || {}} // Initialize with formData if available
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            <div>
              <label htmlFor="description" className="block">Description:</label>
              <Field type="text" id="description" name="description"  className="w-full px-4 py-2 border rounded-md" />
              <ErrorMessage name="description" component="div" className="text-red-500" />
            </div>

            <div>
              <label htmlFor="amount" className="block">Amount:</label>
              <Field type="number" id="amount" name="amount" className="w-full px-4 py-2 border rounded-md" />
              <ErrorMessage name="amount" component="div" className="text-red-500" />
            </div>

            <div>
              <label htmlFor="type" className="block">Type:</label>
              <Field as="select" id="type" name="type" className="w-full px-4 py-2 border rounded-md">
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </Field>
              <ErrorMessage name="type" component="div" className="text-red-500" />
            </div>

            <div>
              <label htmlFor="category" className="block">Category:</label>
              <Field type="text" id="category" name="category" className="w-full px-4 py-2 border rounded-md" />
              <ErrorMessage name="category" component="div" className="text-red-500" />
            </div>

            <div>
              <label htmlFor="date" className="block">Date:</label>
              <Field type="date" id="date" name="date" className="w-full px-4 py-2 border rounded-md" />
              <ErrorMessage name="date" component="div" className="text-red-500" />
            </div>

            <button type="submit" disabled={isSubmitting} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300">
              Update Transaction
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UpdateTransaction;
