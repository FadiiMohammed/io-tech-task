// City background image is now in public folder
import { useCallback, useState, useEffect } from 'react';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { showLoader, hideLoader } from '../store/slices/loaderSlice';

export default function HeroSection({ language = 'en' }) {
  const dispatch = useDispatch();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [heroSection, setHeroSection] = useState(null);
  const [error, setError] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { isLoading } = useSelector((state) => state.loader);

  // Language translations
  const translations = {
    en: {
      readMore: 'Read More',
      learnMore: 'Learn More',
      welcome: 'Welcome',
      noMembers: 'No hero members available at the moment.',
      loading: 'Loading...',
      error: 'Error:',
    },
    ar: {
      readMore: 'اقرأ المزيد',
      learnMore: 'تعلم المزيد',
      welcome: 'مرحباً',
      noMembers: 'لا يوجد أعضاء متاحون في الوقت الحالي.',
      loading: 'جاري التحميل...',
      error: 'خطأ:',
    },
  };

  const heroMembers = heroSection?.hero_members || [];

  useEffect(() => {
    const fetchHeroSection = async () => {
      try {
        dispatch(showLoader());
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/hero-members?populate[hero_members][populate]=image&populate=cover_bg&locale=${language}`
        );
        if (!res.ok) {
          throw new Error('Failed to fetch hero members');
        }
        const data = await res.json();
        setHeroSection(data.data[0]);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching hero members:', err);
      } finally {
        dispatch(hideLoader());
      }
    };

    fetchHeroSection();
  }, [dispatch, language]);

  const nextSlide = useCallback(() => {
    if (heroMembers.length === 0 || isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % heroMembers.length);
      setIsTransitioning(false);
    }, 150);
  }, [heroMembers.length, isTransitioning]);

  const prevSlide = useCallback(() => {
    if (heroMembers.length === 0 || isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide(
        (prev) => (prev - 1 + heroMembers.length) % heroMembers.length
      );
      setIsTransitioning(false);
    }, 150);
  }, [heroMembers.length, isTransitioning]);

  const goToSlide = (index) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide(index);
      setIsTransitioning(false);
    }, 150);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'ArrowLeft') {
        prevSlide();
      } else if (event.key === 'ArrowRight') {
        nextSlide();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [prevSlide, nextSlide]);

  return (
    <section className="h-screen flex items-center justify-center overflow-hidden relative">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/bg.jpg"
          alt="City skyline"
          fill
          className="object-cover"
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

      <div className="relative flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-8 w-full max-w-[1200px] mx-auto py-8 lg:py-0 px-4">
        {/* Navigation Arrows - Hidden on mobile */}
        <div className="hidden lg:flex flex-col items-center justify-center gap-8">
          <div
            className="cursor-pointer text-white hover:text-yellow-600 hover:bg-white hover:bg-opacity-20 p-2 rounded-full"
            onClick={prevSlide}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline
                points={
                  language === 'ar' ? '9,18 15,12 9,6' : '15,18 9,12 15,6'
                }
              ></polyline>
            </svg>
          </div>

          <div className="flex flex-col gap-2">
            {heroMembers.map((_, index) => (
              <div
                key={index}
                className={`border border-white rounded-full w-2 h-2 ${
                  index === currentSlide ? '!bg-white' : ''
                }`}
                onClick={() => goToSlide(index)}
              ></div>
            ))}
          </div>
        </div>

        {/* Content Section */}
        <div className="flex flex-col gap-4 lg:gap-8 flex-1 text-center lg:text-left">
          <div
            className={`hero-text transition-all duration-500 ease-in-out ${
              isTransitioning ? 'opacity-50 scale-95' : 'opacity-100 scale-100'
            }`}
          >
            {isLoading ? (
              <div className="text-white">{translations[language].loading}</div>
            ) : error ? (
              <div className="text-white">
                {translations[language].error} {error}
              </div>
            ) : heroMembers.length > 0 ? (
              <div
                className={`${
                  language === 'ar'
                    ? 'text-center lg:text-right'
                    : 'text-center lg:text-left'
                }`}
              >
                <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-[40px] mb-4 lg:mb-6 text-white transition-all duration-300 ease-in-out">
                  {heroMembers[currentSlide]?.name}
                </h1>
                <p className="font-medium text-sm sm:text-base lg:text-lg text-white mb-4 lg:mb-6 max-w-2xl mx-auto lg:mx-0 transition-all duration-300 ease-in-out">
                  {heroMembers[currentSlide]?.description}
                </p>
                <button
                  className={`bg-white text-primary text-sm sm:text-base lg:text-lg font-medium px-4 sm:px-6 py-2 rounded-lg hover:bg-gray-100 transition-all duration-300 ease-in-out ${
                    language === 'ar'
                      ? 'mx-auto lg:ml-auto lg:mr-0'
                      : 'mx-auto lg:mr-auto lg:ml-0'
                  } `}
                >
                  {heroSection?.button_info?.heroButton?.label ||
                    translations[language].readMore}
                </button>
              </div>
            ) : (
              <div className="text-white">
                <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-[40px] mb-4 lg:mb-6">
                  {translations[language].welcome}
                </h1>
                <p className="font-medium text-sm sm:text-base lg:text-lg mb-4 lg:mb-6 max-w-2xl mx-auto lg:mx-0">
                  {translations[language].noMembers}
                </p>
                <button className="bg-white text-primary text-sm sm:text-base lg:text-lg font-medium px-4 sm:px-6 py-2 rounded-lg hover:bg-gray-100 transition-colors">
                  {translations[language].learnMore}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Image Section */}
        <div className="flex justify-center items-center rounded-2xl overflow-hidden order-first lg:order-last">
          <div
            className={`w-48 h-48 sm:w-56 sm:h-56 lg:w-80 lg:min-h-80 bg-primary relative rounded-2xl transition-all duration-500 ease-in-out ${
              isTransitioning ? 'scale-95 opacity-70' : 'scale-100 opacity-100'
            }`}
          >
            {heroMembers.length > 0 && heroMembers[currentSlide]?.image?.url ? (
              <Image
                src={`http://localhost:1337${heroMembers[currentSlide].image.url}`}
                alt={heroMembers[currentSlide]?.name || 'Hero member'}
                fill
                className="object-cover rounded-2xl transition-all duration-300 ease-in-out"
              />
            ) : (
              <div className="w-full h-full bg-primary rounded-2xl flex items-center justify-center">
                <span className="text-6xl sm:text-7xl lg:text-9xl transition-all duration-300 ease-in-out">
                  👨
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Navigation - Bottom */}
        <div className="lg:hidden flex items-center justify-center gap-4 mt-4">
          <button
            className="cursor-pointer text-white hover:text-yellow-600 hover:bg-white hover:bg-opacity-20 p-2 rounded-full"
            onClick={prevSlide}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline
                points={
                  language === 'ar' ? '9,18 15,12 9,6' : '15,18 9,12 15,6'
                }
              ></polyline>
            </svg>
          </button>

          <div className="flex gap-2">
            {heroMembers.map((_, index) => (
              <div
                key={index}
                className={`border border-white rounded-full w-2 h-2 ${
                  index === currentSlide ? '!bg-white' : ''
                }`}
                onClick={() => goToSlide(index)}
              ></div>
            ))}
          </div>

          <button
            className="cursor-pointer text-white hover:text-yellow-600 hover:bg-white hover:bg-opacity-20 p-2 rounded-full"
            onClick={nextSlide}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline
                points={
                  language === 'ar' ? '15,18 9,12 15,6' : '9,18 15,12 9,6'
                }
              ></polyline>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
