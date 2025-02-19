import { useState } from 'react';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';

export default function VerifyCode() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  async function handleVerify(values) {
    setIsLoading(true);
    const resetCode =
      values.Firstcode +
      values.Secondcode +
      values.Thirdcode +
      values.Fourthcode +
      values.Fifthcode +
      values.Sixthcode;

    try {
      let { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode", {
        resetCode: resetCode,
      });

      toast.success(`${data.status}`, { theme: 'dark' });
      navigate('/ResetPassword'); // Redirect after success
    } catch (error) {
      console.error(error);
      toast.error("Invalid verification code");
    } finally {
      setIsLoading(false);
    }
  }

  let formik = useFormik({
    initialValues: {
      Firstcode: '',
      Secondcode: '',
      Thirdcode: '',
      Fourthcode: '',
      Fifthcode: '',
      Sixthcode: '',
    },
    validationSchema: Yup.object({
      Firstcode: Yup.string().matches(/^\d$/, 'Only digits allowed').required('Required'),
      Secondcode: Yup.string().matches(/^\d$/, 'Only digits allowed').required('Required'),
      Thirdcode: Yup.string().matches(/^\d$/, 'Only digits allowed').required('Required'),
      Fourthcode: Yup.string().matches(/^\d$/, 'Only digits allowed').required('Required'),
      Fifthcode: Yup.string().matches(/^\d$/, 'Only digits allowed').required('Required'),
      Sixthcode: Yup.string().matches(/^\d$/, 'Only digits allowed').required('Required'),
    }),
    onSubmit: handleVerify,
  });

  return (
    <div className='container h-screen'>
      <form onSubmit={formik.handleSubmit} className="max-w-sm mx-auto flex flex-wrap justify-center">
        <div className="flex mb-2 mt-12 space-x-2 rtl:space-x-reverse">
          {["Firstcode", "Secondcode", "Thirdcode", "Fourthcode", "Fifthcode", "Sixthcode"].map((field, index) => (
            <div key={index}>
              <input
                name={field}
                id={`code-${index + 1}`}
                type="text"
                maxLength={1}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values[field]}
                className="block w-9 h-9 py-3 text-sm font-extrabold text-center text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                required
              />
              {formik.touched[field] && formik.errors[field] && (
                <div className="text-red-500 text-xs">{formik.errors[field]}</div>
              )}
            </div>
          ))}
        </div>

        <p className="mt-2 text-sm text-gray-500">Please enter the 6-digit code sent via email.</p>

        {/* ✅ Loading Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="mt-8 text-white bg-[#0aad0a] hover:bg-green-600 focus:ring-4 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 flex items-center justify-center"
        >
          {isLoading ? (
            <span className="flex items-center">
              <i className="fas fa-spinner animate-spin mr-2"></i> Verifying...
            </span>
          ) : (
            "Verify"
          )}
        </button>
      </form>
    </div>
  );
}
