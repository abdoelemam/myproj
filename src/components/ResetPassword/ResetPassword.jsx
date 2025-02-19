import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { UserContext } from '../UserContext/UserContext';

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  let {userLogin, setUserLogin} = useContext(UserContext)


  // ✅ Improved Validation Schema
  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email format').required('Email is required'),
    newPassword:Yup.string()
      .min(3, 'Password must be at least 3 characters')
      .max(9, 'Password must not exceed 9 characters')
      .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{3,9}$/, 'Password must start with an uppercase letter, include at least one lowercase letter and one digit')
      .required('Password is required')
  });

  // ✅ API Call for Password Reset
  async function handleReset(formValues) {
    setIsLoading(true);
    setApiError(null);

    try {
      let  {data}  = await axios.put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword", {
        
          'email': formValues.email,
          'newPassword':formValues.newPassword
      });
      localStorage.setItem('userToken',data?.token)
      setUserLogin(data?.token)
      toast.success(`${data.status}`, { theme: 'dark' });
      setIsLoading(false);
      navigate('/'); // Redirect to verification
    }
     catch(error) {
      setApiError(error.response?.data?.message || "An error occurred. Please try again.");
      setIsLoading(false);
    }
  }

  const formik = useFormik({
    initialValues: {
      email: '',
      newPassword: '',
    },
    validationSchema,
    onSubmit: handleReset,
  });

  return (
    <div className='container h-[60vh] flex items-center'>
      <form onSubmit={formik.handleSubmit} className='w-3/4 md:w-[60%] mx-auto'>

        {/* ✅ Display API Errors */}
        {apiError && (
          <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400">
            <span className="font-medium">{apiError}</span>
          </div>
        )}

        <h1 className='text-2xl font-bold mb-6'>Reset Password</h1>

        {/* ✅ Email Input */}
        <div className="mb-6">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.email}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="john.doe@example.com"
            required
          />
          {formik.errors.email && formik.touched.email && (
            <div className="p-2 mt-2 text-sm text-red-800 rounded-lg bg-red-50">
              {formik.errors.email}
            </div>
          )}
        </div>

        {/* ✅ Password Input */}
        <div className="mb-6">
          <label htmlFor="newPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            New Password
          </label>
          <input
            type="password"
            name="newPassword"
            id="newPassword"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.newPassword}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Enter new password"
            required
          />
          {formik.errors.newPassword && formik.touched.newPassword && (
            <div className="p-2 mt-2 text-sm text-red-800 rounded-lg bg-red-50">
              {formik.errors.newPassword}
            </div>
          )}
        </div>

        {/* ✅ Submit Button */}
        <div className="flex items-center mt-6">
          {isLoading ? (
            <button className="text-white bg-[#0aad0a] hover:bg-green-600 focus:ring-4 font-medium rounded-lg text-sm w-full px-5 py-2.5 flex items-center justify-center">
              <i className="fas fa-spinner animate-spin text-2xl text-white"></i>
            </button>
          ) : (
            <button
              type="submit"
              className="text-white bg-[#0aad0a] hover:bg-green-600 focus:ring-4 font-medium rounded-lg text-sm w-full px-5 py-2.5"
            >
              Reset Password
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
