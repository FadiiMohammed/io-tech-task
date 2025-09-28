'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { showLoader, hideLoader } from '../store/slices/loaderSlice';
import WhatsAppIcon from '../utils/icons/whatsapp';
import PhoneIcon from '../utils/icons/phone';
import EmailIcon from '../utils/icons/email';
import Tooltip from '../components/Tooltip';

export default function OurTeam({ language = 'en' }) {
  const dispatch = useDispatch();
  const [members, setMembers] = useState([]);
  const [pagination, setPagination] = useState({
    page: 0,
    pageSize: 0,
    pageCount: 0,
    total: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const isSkeletonLoading = useSelector((state) => state.loader.isLoading);

  // Language translations
  const translations = {
    en: {
      ourTeam: 'Our Team',
      teamDescription:
        'Behind every great product is a team of passionate innovators, designers, and engineers who share one mission: to build seamless experiences and deliver exceptional results.',
      noTeamMembers: 'No Team Members',
      noMembersDescription: 'Team members will appear here once they are added',
      loading: 'Loading team members...',
      error: 'Error loading team members',
    },
    ar: {
      ourTeam: 'فريقنا',
      teamDescription:
        'وراء كل منتج رائع يوجد فريق من المبدعين المتحمسين والمصممين والمهندسين الذين يتشاركون مهمة واحدة: بناء تجارب سلسة وتقديم نتائج استثنائية.',
      noTeamMembers: 'لا يوجد أعضاء فريق',
      noMembersDescription: 'ستظهر أعضاء الفريق هنا بمجرد إضافتهم',
      loading: 'جاري تحميل أعضاء الفريق...',
      error: 'خطأ في تحميل أعضاء الفريق',
    },
  };

  // Static fallback data
  const staticTeamData = {
    en: [
      {
        id: 1,
        name: 'John Smith',
        job_title: 'Senior Partner',
        whatsapp_number: '+1234567890',
        phone_number: '+1234567890',
        email: 'john.smith@lawfirm.com',
        image: null,
      },
      {
        id: 2,
        name: 'Sarah Johnson',
        job_title: 'Legal Advisor',
        whatsapp_number: '+1234567891',
        phone_number: '+1234567891',
        email: 'sarah.johnson@lawfirm.com',
        image: null,
      },
      {
        id: 3,
        name: 'Michael Brown',
        job_title: 'Associate Attorney',
        whatsapp_number: '+1234567892',
        phone_number: '+1234567892',
        email: 'michael.brown@lawfirm.com',
        image: null,
      },
    ],
    ar: [
      {
        id: 1,
        name: 'أحمد محمد',
        job_title: 'شريك أول',
        whatsapp_number: '+1234567890',
        phone_number: '+1234567890',
        email: 'ahmed.mohamed@lawfirm.com',
        image: null,
      },
      {
        id: 2,
        name: 'فاطمة علي',
        job_title: 'مستشارة قانونية',
        whatsapp_number: '+1234567891',
        phone_number: '+1234567891',
        email: 'fatima.ali@lawfirm.com',
        image: null,
      },
      {
        id: 3,
        name: 'محمد حسن',
        job_title: 'محامي مساعد',
        whatsapp_number: '+1234567892',
        phone_number: '+1234567892',
        email: 'mohamed.hassan@lawfirm.com',
        image: null,
      },
    ],
  };

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        dispatch(showLoader());
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/team-members?populate=image&locale=${language}`
        );
        if (!res.ok) {
          throw new Error('Failed to fetch team members');
        }
        const data = await res.json();

        setMembers(data.data || []);
        setPagination(data.meta.pagination);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching team members:', err);
        // Use static data as fallback
        setMembers(staticTeamData[language]);
        setPagination({
          page: 1,
          pageSize: 3,
          pageCount: 1,
          total: staticTeamData[language].length,
        });
      } finally {
        setLoading(false);
        dispatch(hideLoader());
      }
    };

    fetchMembers();
  }, [dispatch, language]);

  // Carousel navigation functions
  const goToPrevious = () => {
    if (isAnimating || members.length <= 3) return;

    setIsAnimating(true);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0
        ? Math.max(0, members.length - 3)
        : Math.max(0, prevIndex - 1)
    );

    setTimeout(() => {
      setIsAnimating(false);
    }, 300);
  };

  const goToNext = () => {
    if (isAnimating || members.length <= 3) return;

    setIsAnimating(true);
    setCurrentIndex((prevIndex) =>
      prevIndex >= members.length - 3 ? 0 : prevIndex + 1
    );

    setTimeout(() => {
      setIsAnimating(false);
    }, 300);
  };

  const getCurrentMembers = () => {
    if (members.length <= 3) return members;
    return members.slice(currentIndex, currentIndex + 3);
  };

  return (
    <section
      className={`py-12 md:py-16 lg:py-20 bg-white ${
        language === 'ar' ? 'rtl' : 'ltr'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-8 md:mb-12 lg:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4 md:mb-6">
            {translations[language].ourTeam}
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-gray-dark max-w-4xl mx-auto px-4">
            {translations[language].teamDescription}
          </p>
        </div>

        <div
          className={`flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-8 xl:gap-40 ${
            language === 'ar' ? 'rtl' : 'ltr'
          }`}
        >
          {/* Navigation buttons - hidden on mobile, shown on desktop */}
          <button
            onClick={goToPrevious}
            className={`hidden lg:block text-primary hover:text-amber-700 cursor-pointer transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
              isAnimating ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'
            }`}
            disabled={members.length <= 3 || isAnimating}
          >
            <svg
              className="w-6 h-6 xl:w-8 xl:h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={language === 'ar' ? 'M9 19l7-7-7-7' : 'M15 19l-7-7 7-7'}
              />
            </svg>
          </button>

          <div
            className={`flex flex-col md:flex-row md:justify-center md:items-center gap-y-6 md:gap-y-0 md:gap-x-4 lg:gap-x-8 transition-all duration-300 ease-in-out w-full ${
              isAnimating ? 'opacity-70' : 'opacity-100'
            }`}
          >
            {loading ? (
              <div className="text-center">
                {translations[language].loading}
              </div>
            ) : getCurrentMembers().length > 0 ? (
              getCurrentMembers().map((member, index) => (
                <div
                  key={member.id || index}
                  className={`text-center bg-primary-light transition-all duration-300 ease-in-out transform w-full md:w-auto ${
                    isAnimating
                      ? 'scale-95 opacity-70'
                      : 'scale-100 opacity-100'
                  }`}
                >
                  <div className="relative mb-4">
                    <div className="w-40 h-40 sm:w-48 sm:h-48 bg-primary rounded-lg mx-auto flex items-center justify-center relative overflow-hidden">
                      {member.image?.url ? (
                        <Image
                          src={`http://localhost:1337${member.image.url}`}
                          alt={member.name || 'Team member'}
                          width={192}
                          height={192}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <div className="w-20 h-20 sm:w-24 sm:h-24 bg-primary rounded-full flex items-center justify-center">
                          <span className="text-6xl sm:text-9xl">👨</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <h3 className="text-base md:text-lg font-semibold text-primary mb-2">
                    {member.name}
                  </h3>
                  <p className="text-sm md:text-base text-gray-light mb-4">
                    {member.job_title}
                  </p>
                  <div className="flex justify-center items-center space-x-2">
                    <Tooltip content={member.whatsapp_number}>
                      <WhatsAppIcon
                        className="text-black hover:text-gray-600 cursor-pointer transition-colors duration-300"
                        width={16}
                        height={16}
                      />
                    </Tooltip>
                    <Tooltip content={member.phone_number}>
                      <PhoneIcon
                        className="text-black hover:text-gray-600 cursor-pointer transition-colors duration-300"
                        width={16}
                        height={16}
                      />
                    </Tooltip>
                    <Tooltip content={member.email}>
                      <EmailIcon
                        className="text-black hover:text-gray-600 cursor-pointer transition-colors duration-300"
                        width={16}
                        height={16}
                      />
                    </Tooltip>
                  </div>
                </div>
              ))
            ) : (
              // No team members available
              <div className="text-center w-full">
                <div className="w-40 h-40 sm:w-48 sm:h-48 bg-primary rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <svg
                    width="60"
                    height="60"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    className="text-yellow-600"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <h3 className="text-base md:text-lg font-semibold text-gray-500 mb-2">
                  {translations[language].noTeamMembers}
                </h3>
                <p className="text-sm md:text-base text-gray-400 mb-4 px-4">
                  {translations[language].noMembersDescription}
                </p>
              </div>
            )}
          </div>

          {/* Right navigation button */}
          <button
            onClick={goToNext}
            className={`hidden lg:block text-primary hover:text-amber-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
              isAnimating ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'
            }`}
            disabled={members.length <= 3 || isAnimating}
          >
            <svg
              className="w-6 h-6 xl:w-8 xl:h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={language === 'ar' ? 'M15 5l-7 7 7 7' : 'M9 5l7 7-7 7'}
              />
            </svg>
          </button>
        </div>

        {/* Mobile navigation buttons */}
        {members.length > 3 && (
          <div className="flex justify-center space-x-8 mt-8 lg:hidden">
            <button
              onClick={goToPrevious}
              className={`text-primary hover:text-amber-700 cursor-pointer transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
                isAnimating
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:scale-110'
              }`}
              disabled={isAnimating}
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={language === 'ar' ? 'M9 19l7-7-7-7' : 'M15 19l-7-7 7-7'}
                />
              </svg>
            </button>
            <button
              onClick={goToNext}
              className={`text-primary hover:text-amber-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
                isAnimating
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:scale-110'
              }`}
              disabled={isAnimating}
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={language === 'ar' ? 'M15 5l-7 7 7 7' : 'M9 5l7 7-7 7'}
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
