import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { showLoader, hideLoader } from '../store/slices/loaderSlice';

const Search = ({
  searchQuery,
  onClearSearch,
  onNavigateHome,
  language = 'en',
}) => {
  const dispatch = useDispatch();
  const [services, setServices] = useState([]);
  const [pagination, setPagination] = useState({
    page: 0,
    pageSize: 0,
    pageCount: 0,
    total: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');

  // Language translations
  const translations = {
    en: {
      frame1: 'Frame 1',
      team: 'Team',
      services: 'Services',
      back: 'Back',
      loading: 'Loading services...',
      error: 'Error:',
      readMore: 'Read more',
      noServicesFound: 'No Services Found',
      noServicesAvailable: 'No Services Available',
      noServicesSearchMessage: 'No services match your search for',
      noServicesSearchMessage2:
        'Try different keywords or browse all services.',
      noServicesDefaultMessage:
        'No services are currently available. Please check back later.',
      clearSearch: 'Clear Search',
      previous: 'Previous',
      next: 'Next',
      showing: 'Showing',
      of: 'of',
      servicesText: 'services',
      close: 'Close',
      defaultDescription:
        'This is a comprehensive service offering that provides detailed support and expertise in our specialized area. Our team of experienced professionals is dedicated to delivering exceptional results and ensuring client satisfaction through our proven methodologies and industry best practices.',
    },
    ar: {
      frame1: 'الإطار 1',
      team: 'الفريق',
      services: 'الخدمات',
      back: 'رجوع',
      loading: 'جاري تحميل الخدمات...',
      error: 'خطأ:',
      readMore: 'اقرأ المزيد',
      noServicesFound: 'لم يتم العثور على خدمات',
      noServicesAvailable: 'لا توجد خدمات متاحة',
      noServicesSearchMessage: 'لا توجد خدمات تطابق البحث عن',
      noServicesSearchMessage2:
        'جرب كلمات مفتاحية مختلفة أو تصفح جميع الخدمات.',
      noServicesDefaultMessage:
        'لا توجد خدمات متاحة حاليًا. يرجى المحاولة لاحقًا.',
      clearSearch: 'مسح البحث',
      previous: 'السابق',
      next: 'التالي',
      showing: 'عرض',
      of: 'من',
      servicesText: 'خدمات',
      close: 'إغلاق',
      defaultDescription:
        'هذه خدمة شاملة توفر دعماً مفصلاً وخبرة في مجالنا المتخصص. فريقنا من المحترفين ذوي الخبرة ملتزم بتقديم نتائج استثنائية وضمان رضا العملاء من خلال منهجياتنا المثبتة وأفضل الممارسات في الصناعة.',
    },
  };

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
      setCurrentPage(1); // Reset to first page when search query changes
    }, 500); // 500ms delay

    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const query = debouncedSearchQuery.trim();
        const url = query
          ? `${
              process.env.NEXT_PUBLIC_API_URL
            }/api/team-services?pagination[page]=${currentPage}&pagination[pageSize]=5&filters[service_name][$containsi]=${encodeURIComponent(
              query
            )}&locale=${language}`
          : `${process.env.NEXT_PUBLIC_API_URL}/api/team-services?pagination[page]=${currentPage}&pagination[pageSize]=5&locale=${language}`;

        dispatch(showLoader());
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error('Failed to fetch team services');
        }

        const data = await res.json();
        setServices(data.data || []);
        setPagination(data.meta.pagination);
        setError(null);
        setPagination(data.meta.pagination);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
        dispatch(hideLoader());
      }
    };

    fetchMembers();
  }, [dispatch, currentPage, debouncedSearchQuery, language]);

  const handleReadMore = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleClearSearch = () => {
    if (onClearSearch) {
      onClearSearch();
    }
    setCurrentPage(1);
  };

  const handleBackClick = () => {
    if (onNavigateHome) {
      onNavigateHome();
    }
  };

  return (
    <>
      <div className="h-[40vh] md:h-[50vh] lg:h-[60vh] flex items-center justify-center overflow-hidden relative">
        {/* Background Image */}
        <div className="">
          <Image
            src="/bg.jpg"
            alt="City skyline"
            fill
            className="object-cover background-cover"
            priority
          />
        </div>

        {/* Gradient overlay for better text readability */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(271.47deg, rgba(75, 38, 21, 0.28) 28%, rgba(75, 38, 21, 0.68) 68%)',
          }}
        ></div>
      </div>

      <div className="flex flex-col lg:flex-row">
        {/* Left Sidebar Navigation */}
        <div className="w-full lg:w-64 bg-gray-100 min-h-[100px] lg:h-fit p-4 md:p-6">
          <div className="gap-y-4">
            <div className="text-gray-500 text-xs md:text-sm mb-4 md:mb-8">
              {translations[language].frame1}
            </div>

            {/* Navigation Items */}
            <div className="flex flex-row lg:flex-col gap-x-4 lg:gap-x-0 lg:gap-y-6">
              <button className="text-left">
                <span className="text-gray-900 font-bold text-base md:text-lg">
                  {translations[language].team}
                </span>
              </button>
              <button className="text-left">
                <span className="text-gray-900 font-bold text-base md:text-lg">
                  {translations[language].services}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-4 md:p-6 lg:p-8 h-fit">
          {/* Back Navigation */}
          <div className="mb-6 md:mb-8">
            <button
              onClick={handleBackClick}
              className="flex items-center text-primary hover:text-gray-700 transition-colors"
            >
              <svg
                className="w-4 h-4 md:w-5 md:h-5 mr-2"
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
              <span className="font-medium cursor-pointer hover:underline text-primary text-sm md:text-base">
                {translations[language].back}
              </span>
            </button>
          </div>

          {/* Services List */}
          <div className="gap-y-0">
            {loading ? (
              <div className="text-center py-8 md:py-12">
                <div className="text-gray-500 text-sm md:text-base">
                  {translations[language].loading}
                </div>
              </div>
            ) : error ? (
              <div className="text-center py-8 md:py-12">
                <div className="text-red-500 text-sm md:text-base">
                  {translations[language].error} {error}
                </div>
              </div>
            ) : services.length > 0 ? (
              services.map((service, index) => (
                <div key={service.id || index} className="py-4 md:py-6">
                  <div className="mb-3 md:mb-4">
                    <p className="text-primary text-sm md:text-base leading-relaxed mb-2">
                      {service.service_name ||
                        'Law Firm is one of the leading legal offices'}
                    </p>
                    <button
                      onClick={() => handleReadMore(service)}
                      className="text-primary hover:underline hover:text-primary-light transition-colors cursor-pointer text-sm md:text-base"
                    >
                      {translations[language].readMore}
                    </button>
                  </div>
                  {index < services.length - 1 && (
                    <div className="border-b border-gray-200"></div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center">
                <div className="w-full max-w-md mx-auto">
                  {/* No results icon */}
                  <div className="w-24 h-24 mx-auto mb-6 flex items-center justify-center bg-gray-100 rounded-full">
                    <svg
                      width="48"
                      height="48"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                      className="text-gray-400"
                    >
                      <circle cx="11" cy="11" r="8"></circle>
                      <path d="m21 21-4.35-4.35"></path>
                      <line x1="11" y1="8" x2="11" y2="14"></line>
                      <line x1="8" y1="11" x2="14" y2="11"></line>
                    </svg>
                  </div>

                  {/* No results message */}
                  <h3 className="text-lg md:text-xl font-semibold text-gray-700 mb-3">
                    {debouncedSearchQuery
                      ? translations[language].noServicesFound
                      : translations[language].noServicesAvailable}
                  </h3>

                  <p className="text-gray-500 text-sm md:text-base mb-6">
                    {debouncedSearchQuery
                      ? `${translations[language].noServicesSearchMessage} "${debouncedSearchQuery}". ${translations[language].noServicesSearchMessage2}`
                      : translations[language].noServicesDefaultMessage}
                  </p>

                  {/* Action button */}
                  {debouncedSearchQuery && (
                    <button
                      onClick={handleClearSearch}
                      className="bg-primary cursor-pointer hover:bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-light transition-colors text-sm md:text-base"
                    >
                      {translations[language].clearSearch}
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Pagination Controls */}
          {pagination.pageCount > 1 && (
            <div className="flex flex-row justify-center items-center gap-x-4 mt-6 md:mt-8">
              {/* Previous Button */}
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`cursor-pointer px-3 md:px-4 py-2 rounded-lg transition-colors text-sm md:text-base ${
                  currentPage === 1
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-primary text-white hover:bg-primary-light'
                }`}
              >
                {translations[language].previous}
              </button>

              {/* Page Numbers */}
              <div className="flex flex-wrap justify-center gap-x-1 md:gap-x-2">
                {Array.from(
                  { length: pagination.pageCount },
                  (_, i) => i + 1
                ).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-2 md:px-3 py-2 rounded-lg transition-colors text-sm md:text-base ${
                      currentPage === page
                        ? 'bg-primary text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              {/* Next Button */}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === pagination.pageCount}
                className={`cursor-pointer px-3 md:px-4 py-2 rounded-lg transition-colors text-sm md:text-base ${
                  currentPage === pagination.pageCount
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-primary text-white hover:bg-primary-light'
                }`}
              >
                {translations[language].next}
              </button>
            </div>
          )}

          {/* Pagination Info */}
          {pagination.total > 0 && (
            <div className="text-center mt-3 md:mt-4 text-gray-600 text-xs md:text-sm">
              {translations[language].showing} {services.length}{' '}
              {translations[language].of} {pagination.total}{' '}
              {translations[language].servicesText}
            </div>
          )}
        </div>
      </div>

      {/* Modal Popup */}
      {isModalOpen && selectedService && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 p-2 md:p-4"
          style={{
            background: 'linear-gradient(271.47deg, rgba(0, 0, 0, 0.15) 28%)',
          }}
        >
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] md:max-h-[80vh] overflow-y-auto mx-2 md:mx-4">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-4 md:p-6 border-b border-gray-200">
              <h3 className="text-lg md:text-2xl font-bold text-primary pr-4">
                {selectedService.service_name}
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
              >
                <svg
                  className="w-5 h-5 md:w-6 md:h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-4 md:p-6">
              <div className="text-gray-700 leading-relaxed text-sm md:text-base">
                {selectedService.description ||
                  translations[language].defaultDescription}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end p-4 md:p-6 border-t border-gray-200">
              <button
                onClick={closeModal}
                className="bg-primary text-white px-4 md:px-6 py-2 rounded-lg hover:bg-primary-light transition-colors text-sm md:text-base"
              >
                {translations[language].close}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Search;
