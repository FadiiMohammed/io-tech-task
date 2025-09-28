import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Image from 'next/image';
import ArrowLeftIcon from '@/utils/icons/arrowLeft';
import ArrowRightIcon from '@/utils/icons/arrowRight';
import { showLoader, hideLoader } from '../store/slices/loaderSlice';

export default function Testimonials({ language = 'en' }) {
  const dispatch = useDispatch();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [clientsOverview, setClientsOverview] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Language translations
  const translations = {
    en: {
      title: 'What our clients are saying',
      description:
        'Our clients range from individual investors, to local, international as well as fortune 500 companies.Our clients range from individual investors, to local, international as well as fortune 500 companies.',
      noTestimonials: 'No Testimonials Available',
      noTestimonialsDescription:
        'Client testimonials will appear here once they are added',
      loading: 'Loading testimonials...',
      error: 'Error loading testimonials',
    },
    ar: {
      title: 'ما يقوله عملاؤنا',
      description:
        'عملاؤنا يتراوحون من المستثمرين الأفراد، إلى الشركات المحلية والدولية وكذلك شركات فورتشن 500. عملاؤنا يتراوحون من المستثمرين الأفراد، إلى الشركات المحلية والدولية وكذلك شركات فورتشن 500.',
      noTestimonials: 'لا توجد شهادات متاحة',
      noTestimonialsDescription: 'ستظهر شهادات العملاء هنا بمجرد إضافتها',
      loading: 'جاري تحميل الشهادات...',
      error: 'خطأ في تحميل الشهادات',
    },
  };

  useEffect(() => {
    const fetchClientsOverviewSection = async () => {
      try {
        dispatch(showLoader());
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/client-overviews?locale=${language}`
        );
        if (!res.ok) {
          throw new Error('Failed to fetch clients overview');
        }
        const data = await res.json();
        setClientsOverview(data.data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching clients overview:', err);
      } finally {
        setLoading(false);
        dispatch(hideLoader());
      }
    };

    fetchClientsOverviewSection();
  }, [dispatch, language]);

  const getCurrentClient = () => {
    return clientsOverview[currentIndex];
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? clientsOverview.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === clientsOverview.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <section className="py-12 md:py-20 bg-primary mb-4">
      <div className="container mx-auto px-4 md:px-6">
        <div className="gap-y-8 md:gap-y-12">
          {/* Title and description */}
          <div className="text-white w-full md:w-1/2 mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 text-white">
              {translations[language].title}
            </h2>
            <p className="text-base md:text-[16px] leading-5 md:leading-6 text-gray-text">
              {translations[language].description}
            </p>
          </div>

          {/* Testimonial card */}
          {loading ? (
            <div className="w-full flex items-center justify-center">
              <div className="text-white">Loading testimonials...</div>
            </div>
          ) : error ? (
            <div className="w-full flex items-center justify-center">
              <div className="text-red-400">
                Error loading testimonials: {error}
              </div>
            </div>
          ) : clientsOverview.length > 0 ? (
            <div className="w-full">
              <div className="flex flex-col lg:flex-row items-center lg:items-start gap-y-6 lg:gap-y-0 lg:gap-x-6">
                {/* Client Image */}
                <div className="w-64 h-64 md:w-80 md:h-80 lg:w-80 lg:h-80 rounded-lg overflow-hidden flex-shrink-0 bg-primary">
                  {getCurrentClient()?.client_img ? (
                    <Image
                      src={`http://localhost:1337${
                        getCurrentClient()?.client_img.url
                      }`}
                      alt={getCurrentClient()?.client_name || 'Client'}
                      fill
                      className="object-cover rounded-2xl"
                    />
                  ) : (
                    <div className="w-full h-full bg-secondary flex items-center justify-center">
                      <span className="text-6xl sm:text-7xl lg:text-9xl">
                        👨
                      </span>
                    </div>
                  )}
                </div>

                {/* Testimonial content */}
                <div className="h-auto lg:h-80 flex flex-col justify-between w-full lg:w-auto">
                  <blockquote className="text-base md:text-lg leading-relaxed mb-4 md:mb-6 lg:mb-10 text-gray-text">
                    &quot;
                    {getCurrentClient()?.client_description ||
                      'No description available'}
                    &quot;
                  </blockquote>

                  <div className="mb-4 md:mb-6">
                    <h3 className="text-lg md:text-xl font-bold text-white mb-1">
                      {getCurrentClient()?.client_name || 'Unknown Client'}
                    </h3>
                    <p className="text-sm md:text-base text-gray-text">
                      {getCurrentClient()?.client_job_title ||
                        'No title available'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full flex items-center justify-center">
              <div className="text-center">
                <div className="w-64 h-64 md:w-80 md:h-80 lg:w-80 lg:h-80 rounded-lg mx-auto mb-6 flex items-center justify-center bg-primary">
                  <svg
                    width="80"
                    height="80"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    className="text-white"
                  >
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    <path d="M13 8H7"></path>
                    <path d="M17 12H7"></path>
                  </svg>
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-white mb-2">
                  {translations[language].noTestimonials}
                </h3>
                <p className="text-sm md:text-base text-gray-300 px-4">
                  {translations[language].noTestimonialsDescription}
                </p>
              </div>
            </div>
          )}

          {/* Navigation buttons */}
          {clientsOverview.length > 1 && (
            <div className="flex gap-x-3 justify-center md:justify-end">
              <button
                onClick={handlePrevious}
                className="w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity bg-white rotate-180"
              >
                <ArrowRightIcon color="#5C3A2B" language={language} />
              </button>
              <button
                onClick={handleNext}
                className="w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity bg-white"
              >
                <ArrowRightIcon color="#5C3A2B" language={language} />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
