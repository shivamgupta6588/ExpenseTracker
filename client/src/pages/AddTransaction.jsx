import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';

const AddTransaction = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector(state => state.user);
  const userID = currentUser._id;

  // Define validation schema using Yup
  const validationSchema = Yup.object({
    description: Yup.string().required('Description is required'),
    amount: Yup.number().required('Amount is required').positive('Amount must be positive'),
    type: Yup.string().required('Type is required').oneOf(['income', 'expense'], 'Invalid type'),
    category: Yup.string().required('Category is required'),
    date: Yup.date().required('Date is required'),
  });

  // Function to handle form submission
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      // Make API call to add transaction
      await axios.post('/api/transaction/add', { ...values, userID });
      console.log('Transaction added successfully:');

      // Reset form after successful submission
      resetForm();
      navigate("/");

      // Optionally, you can show a success message or redirect the user
    } catch (error) {
      console.error('Error adding transaction:', error);
    } finally {
      // Set submitting to false after form submission
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Add Transaction</h2>
      <Formik
        initialValues={{
          description: '',
          amount: '',
          type: 'expense',
          category: '',
          date: new Date().toISOString().substr(0, 10),
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, values }) => (
          <Form className="space-y-4">
            <div>
              <label htmlFor="description" className="block">Description:</label>
              <Field type="text" id="description" name="description" className="w-full px-4 py-2 border rounded-md" />
              <ErrorMessage name="description" component="div" className="text-red-500" />
            </div>

            <div>
              <label htmlFor="amount" className="block">Amount:</label>
              <Field type="number"  id="amount" name="amount" className="w-full px-4 py-2 border rounded-md" />
              <ErrorMessage name="amount" component="div" className="text-red-500" />
            </div>

            <div>
              <label htmlFor="type" className="block">Type:</label>
              <Field as="select" id="type" name="type" className="w-full px-4 py-2 border rounded-md">
                <option value="">Select type</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </Field>
              <ErrorMessage name="type" component="div" className="text-red-500" />
            </div>

            <div>
              <label htmlFor="category" className="block">Category:</label>
              <Field as="select" id="category" name="category" className="w-full px-4 py-2 border rounded-md">
                {values.type === 'expense' ? (
                  <>
                    <option value="">Select category</option>
                    <option value="Shopping">Shopping</option>
                    <option value="Groceries">Groceries</option>
                    <option value="Utilities">Utilities</option>
                    <option value="Rent">Rent</option>
                    <option value="Transportation">Transportation</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Education">Education</option>
                    <option value="Other">Other</option>
                  </>
                ) : (
                  <>
                    <option value="">Select category</option>
                    <option value="Salary">Salary</option>
                    <option value="Bonus">Bonus</option>
                    <option value="Investment">Investment</option>
                  </>
                )}
              </Field>
              <ErrorMessage name="category" component="div" className="text-red-500" />
            </div>

            <div>
              <label htmlFor="date" className="block">Date:</label>
              <Field type="date" id="date" name="date" className="w-full px-4 py-2 border rounded-md" />
              <ErrorMessage name="date" component="div" className="text-red-500" />
            </div>

            <button type="submit" disabled={isSubmitting} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300">
              Save
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddTransaction;
