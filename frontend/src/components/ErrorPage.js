'use client';

import { useState } from 'react';
import ArrowLeftIcon from '@/utils/icons/arrowLeft';

export default function ErrorPage({
  language = 'en',
  onNavigateHome,
  errorType = '404',
}) {
  const [isNavigating, setIsNavigating] = useState(false);

  const handleNavigateHome = async () => {
    setIsNavigating(true);
    try {
      if (onNavigateHome) {
        await onNavigateHome();
      } else {
        // Fallback navigation
        window.location.href = '/';
      }
    } catch (error) {
      console.error('Navigation error:', error);
    } finally {
      setIsNavigating(false);
    }
  };

  // Language translations
  const translations = {
    en: {
      title: 'Page Not Found',
      subtitle: 'Oops! The page you are looking for does not exist.',
      description:
        'The link you clicked might be broken, or the page may have been moved or deleted.',
      backToHome: 'Back to Home',
      errorCode: 'Error 404',
      suggestions: 'What you can do:',
      suggestion1: 'Check the URL for typos',
      suggestion2: 'Go back to the homepage',
      suggestion3: 'Contact us if you believe this is an error',
    },
    ar: {
      title: 'الصفحة غير موجودة',
      subtitle: 'عذراً! الصفحة التي تبحث عنها غير موجودة.',
      description:
        'الرابط الذي نقرت عليه قد يكون معطلاً، أو ربما تم نقل الصفحة أو حذفها.',
      backToHome: 'العودة للرئيسية',
      errorCode: 'خطأ 404',
      suggestions: 'ما يمكنك فعله:',
      suggestion1: 'تحقق من الرابط للتأكد من عدم وجود أخطاء إملائية',
      suggestion2: 'العودة إلى الصفحة الرئيسية',
      suggestion3: 'تواصل معنا إذا كنت تعتقد أن هذا خطأ',
    },
  };

  const t = translations[language];

  return (
    <div
      className={`min-h-screen flex items-center justify-center bg-gray-50 ${
        language === 'ar' ? 'rtl' : 'ltr'
      }`}
    >
      <div className="max-w-2xl mx-auto px-4 text-center">
        {/* Error Code */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-gray-200 mb-4">{errorType}</h1>
          <div className="text-2xl font-semibold text-gray-600 mb-2">
            {t.errorCode}
          </div>
        </div>

        {/* Main Content */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{t.title}</h2>
          <p className="text-lg text-gray-600 mb-6">{t.subtitle}</p>
          <p className="text-base text-gray-500 mb-8">{t.description}</p>
        </div>

        {/* Suggestions */}
        <div className="mb-8 text-left max-w-md mx-auto">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            {t.suggestions}
          </h3>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-start">
              <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              {t.suggestion1}
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              {t.suggestion2}
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              {t.suggestion3}
            </li>
          </ul>
        </div>

        {/* Navigation Button */}
        <div className="flex justify-center">
          <button
            onClick={handleNavigateHome}
            disabled={isNavigating}
            className={`
              group flex items-center gap-3 px-8 py-4 bg-primary text-white 
              rounded-lg font-semibold text-lg transition-all duration-300 
              hover:bg-opacity-90 hover:shadow-lg hover:scale-105 
              disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
              ${language === 'ar' ? 'flex-row-reverse' : 'flex-row'}
            `}
          >
            {isNavigating ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <ArrowLeftIcon
                width="20"
                height="20"
                language={language}
                className="transition-transform duration-300 group-hover:scale-110"
              />
            )}
            <span>
              {isNavigating
                ? language === 'ar'
                  ? 'جاري التحميل...'
                  : 'Loading...'
                : t.backToHome}
            </span>
          </button>
        </div>

        {/* Additional Help */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            {language === 'ar'
              ? 'إذا كنت بحاجة إلى مساعدة إضافية، لا تتردد في التواصل معنا.'
              : "If you need additional help, please don't hesitate to contact us."}
          </p>
        </div>
      </div>
    </div>
  );
}
