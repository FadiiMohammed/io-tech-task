import { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { useDispatch } from 'react-redux';
import { showLoader, hideLoader } from '../store/slices/loaderSlice';
import * as Yup from 'yup';

const Footer = ({ language = 'en' }) => {
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Language translations
  const translations = {
    en: {
      emailPlaceholder: 'Email',
      subscribe: 'Subscribe',
      contacts: 'Contacts',
      about: 'About',
      ourStrategy: 'Our Strategy',
      ourAdvantages: 'Our Advantages',
      socialResponsibility: 'Social Responsibility',
      ourServices: 'Our Services',
      copyright: '© 2024. All rights reserved.',
      // Validation messages
      invalidEmail: 'Invalid email address',
      emailRequired: 'Email is required',
      subscriptionFailed: 'Subscription failed',
      subscribedSuccessfully: 'Subscribed successfully!',
    },
    ar: {
      emailPlaceholder: 'البريد الإلكتروني',
      subscribe: 'اشتراك',
      contacts: 'جهات الاتصال',
      about: 'من نحن',
      ourStrategy: 'استراتيجيتنا',
      ourAdvantages: 'مزايانا',
      socialResponsibility: 'المسؤولية الاجتماعية',
      ourServices: 'خدماتنا',
      copyright: '© 2024. جميع الحقوق محفوظة.',
      // Validation messages
      invalidEmail: 'عنوان البريد الإلكتروني غير صحيح',
      emailRequired: 'البريد الإلكتروني مطلوب',
      subscriptionFailed: 'فشل في الاشتراك',
      subscribedSuccessfully: 'تم الاشتراك بنجاح!',
    },
  };

  // Handle form submission
  const handleSubscribe = (values, { resetForm }) => {
    subscribe(values.email);
    resetForm();
  };

  const subscribe = async (email) => {
    dispatch(showLoader());
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/subscribers`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: { email } }),
      }
    );

    const result = await res.json();
    if (!res.ok) {
      setErrorMessage(
        result.error?.message || translations[language].subscriptionFailed
      );
      dispatch(hideLoader());
      return;
    }

    setSuccessMessage(translations[language].subscribedSuccessfully);
    dispatch(hideLoader());
  };

  // Email validation schema with language-specific messages
  const emailValidationSchema = Yup.object().shape({
    email: Yup.string()
      .email(translations[language].invalidEmail)
      .required(translations[language].emailRequired),
  });

  return (
    <footer className="text-white py-6 md:py-8 bg-primary">
      <div className="container mx-auto px-4 md:px-6">
        {/* Top Section */}
        <div className="flex justify-center lg:justify-end py-4 md:py-6">
          <div className="flex flex-col lg:flex-row items-center gap-y-4 lg:gap-y-0 lg:gap-x-8">
            {/* Email Subscription Form */}
            <Formik
              initialValues={{ email: '' }}
              validationSchema={emailValidationSchema}
              onSubmit={handleSubscribe}
            >
              {({ errors, touched, isSubmitting, setFieldValue }) => (
                <Form className="relative">
                  <Field
                    name="email"
                    type="email"
                    placeholder={translations[language].emailPlaceholder}
                    className="px-3 md:px-4 py-1.5 pr-16 md:pr-20 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-gray-400 w-48 md:w-56"
                    onChange={(e) => {
                      setFieldValue('email', e.target.value);
                      // Clear messages when user starts typing
                      if (errorMessage) setErrorMessage(null);
                      if (successMessage) setSuccessMessage(null);
                    }}
                  />
                  <button
                    type="submit"
                    className="absolute cursor-pointer right-1 top-1 bottom-1 bg-primary text-white px-2 md:px-3 py-1 rounded text-xs md:text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
                  >
                    {translations[language].subscribe}
                  </button>
                  {errors.email && touched.email && (
                    <div className="absolute top-full left-0 text-red-400 text-xs mt-1">
                      {errors.email}
                    </div>
                  )}
                  {errorMessage && (
                    <div className="absolute top-full left-0 text-red-400 text-xs mt-1">
                      {errorMessage}
                    </div>
                  )}
                  {successMessage && (
                    <div className="absolute top-full left-0 text-green-400 text-xs mt-1">
                      {successMessage}
                    </div>
                  )}
                </Form>
              )}
            </Formik>

            {/* Contacts */}
            <div className="text-white">
              <span className="text-xs md:text-sm">
                {translations[language].contacts}
              </span>
            </div>

            {/* Social Media Icons */}
            <div className="flex gap-x-4 md:gap-x-6">
              <a
                href="#"
                className="text-white hover:opacity-80 transition-opacity"
              >
                <svg
                  className="w-3 h-3 md:w-4 md:h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-white hover:opacity-80 transition-opacity"
              >
                <svg
                  className="w-3 h-3 md:w-4 md:h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-white hover:opacity-80 transition-opacity"
              >
                <svg
                  className="w-3 h-3 md:w-4 md:h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Divider Line */}
        <div
          className="border-t mb-4 md:mb-6"
          style={{ borderColor: '#D3D3D3' }}
        ></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-y-3 md:gap-y-0 py-3 md:py-4">
          {/* Navigation Links */}
          <div className="flex flex-wrap justify-center md:justify-start gap-x-4 md:gap-x-6 lg:gap-x-8">
            <a
              href="#"
              className="text-white text-xs md:text-sm lg:text-base hover:opacity-80 transition-opacity"
            >
              {translations[language].about}
            </a>
            <a
              href="#"
              className="text-white text-xs md:text-sm lg:text-base hover:opacity-80 transition-opacity"
            >
              {translations[language].ourStrategy}
            </a>
            <a
              href="#"
              className="text-white text-xs md:text-sm lg:text-base hover:opacity-80 transition-opacity"
            >
              {translations[language].ourAdvantages}
            </a>
            <a
              href="#"
              className="text-white text-xs md:text-sm lg:text-base hover:opacity-80 transition-opacity"
            >
              {translations[language].socialResponsibility}
            </a>
            <a
              href="#"
              className="text-white text-xs md:text-sm lg:text-base hover:opacity-80 transition-opacity"
            >
              {translations[language].ourServices}
            </a>
          </div>

          {/* Copyright */}
          <p className="text-white text-xs md:text-sm">
            {translations[language].copyright}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
