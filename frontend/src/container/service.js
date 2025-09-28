import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { showLoader, hideLoader } from '../store/slices/loaderSlice';

const Service = ({
  language = 'en',
  onNavigateHome,
  serviceName = 'Legal Consultation',
}) => {
  const [legalConsultation, setLegalConsultation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const router = useRouter();
  const { isLoading } = useSelector((state) => state.loader);

  const translations = {
    en: {
      back: 'Back',
      loading: 'Loading legal services...',
      error: 'Error loading legal services',
      header: 'Legal Consultation Services',
      introText:
        "Law Firm is one of the leading legal offices that offer exceptional advisory services for both individuals and companies. Our mission is to provide comprehensive and specialized legal support to meet our clients' needs and offer the best legal solutions in various cases and legal fields, we provide our legal consultations services as a follow:",
    },
    ar: {
      back: 'رجوع',
      loading: 'جاري تحميل الخدمات القانونية...',
      error: 'خطأ في تحميل الخدمات القانونية',
      header: 'خدمات الاستشارات القانونية',
      introText:
        'تعرف على المزيد حول الصفار وشركائه، تاريخنا، مهمتنا، والتزامنا بالتميز في خدمات الاستشارات القانونية والتجارية.',
    },
  };

  // Static fallback data
  const staticLegalConsultationData = {
    en: {
      general: {
        heading: 'General Legal Consultations',
        content:
          'We provide comprehensive legal advice and consultation services to help you understand your rights and obligations under the law.',
      },
      corporate: {
        heading: 'Corporate Legal Consultations',
        introText:
          'Our corporate legal team specializes in providing strategic legal advice to businesses of all sizes.',
        subHeading: 'Our corporate services include:',
        services: [
          'Business formation and incorporation',
          'Contract drafting and review',
          'Corporate governance and compliance',
          'Mergers and acquisitions',
          'Intellectual property protection',
          'Employment law compliance',
        ],
      },
      individual: {
        heading: 'Individual Legal Consultations',
        introText:
          'We offer personalized legal consultation services for individuals facing various legal challenges.',
        services: [
          'Personal injury claims',
          'Family law matters',
          'Estate planning and wills',
          'Real estate transactions',
          'Criminal defense consultation',
          'Immigration law assistance',
        ],
      },
    },
    ar: {
      general: {
        heading: 'الاستشارات القانونية العامة',
        content:
          'نوفر المشورة القانونية الشاملة وخدمات الاستشارة لمساعدتك على فهم حقوقك والتزاماتك بموجب القانون.',
      },
      corporate: {
        heading: 'الاستشارات القانونية للشركات',
        introText:
          'فريقنا القانوني للشركات متخصص في تقديم المشورة القانونية الاستراتيجية للشركات من جميع الأحجام.',
        subHeading: 'تشمل خدماتنا للشركات:',
        services: [
          'تأسيس الشركات والتسجيل',
          'صياغة ومراجعة العقود',
          'الحوكمة المؤسسية والامتثال',
          'الاندماج والاستحواذ',
          'حماية الملكية الفكرية',
          'امتثال قانون العمل',
        ],
      },
      individual: {
        heading: 'الاستشارات القانونية للأفراد',
        introText:
          'نقدم خدمات الاستشارة القانونية الشخصية للأفراد الذين يواجهون تحديات قانونية مختلفة.',
        services: [
          'مطالبات الأضرار الشخصية',
          'مسائل قانون الأسرة',
          'التخطيط العقاري والوصايا',
          'معاملات العقارات',
          'استشارة الدفاع الجنائي',
          'مساعدة قانون الهجرة',
        ],
      },
    },
  };

  const handleBackClick = () => {
    if (onNavigateHome) {
      onNavigateHome();
    }
  };

  useEffect(() => {
    const fetchLegalConsultation = async () => {
      try {
        dispatch(showLoader());
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/legal-consultations?locale=${language}`
        );
        if (!res.ok) {
          throw new Error('Failed to fetch legal consultation');
        }
        const data = await res.json();
        console.log('data', data);
        setLegalConsultation({
          general: {
            heading: data.data[0].general_heading,
            content: data.data[0].general_content,
          },
          corporate: {
            heading: data.data[0].corporate_heading,
            introText: data.data[0].corporate_introText,
            subHeading: data.data[0].corporate_subHeading,
            services: data.data[0].corporate_services,
          },
          individual: {
            heading: data.data[0].individual_heading,
            introText: data.data[0].individual_introText,
            services: data.data[0].individual_services,
          },
        });
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching legal consultation:', err);
        // Use static data as fallback
        setLegalConsultation(staticLegalConsultationData[language]);
      } finally {
        setLoading(false);
        dispatch(hideLoader());
      }
    };

    fetchLegalConsultation();
  }, [dispatch, language, serviceName]);

  return (
    <>
      <div className="relative h-[40vh] md:h-[50vh] lg:h-[60vh] flex items-center justify-center overflow-hidden">
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

        <h1 className="text-white text-6xl font-bold absolute top-1/2 left-[5%] p-8  -translate-y-1/2">
          {serviceName}
        </h1>
      </div>

      <div className="py-16 px-4 md:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-600">{translations[language].loading}</p>
            </div>
          ) : !legalConsultation ? (
            <div className="text-center py-12">
              <p className="text-gray-600">
                No legal consultation data available
              </p>
            </div>
          ) : (
            <>
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
                      d={
                        language === 'ar' ? 'M9 19l7-7-7-7' : 'M15 19l-7-7 7-7'
                      }
                    />
                  </svg>
                  <span className="font-medium cursor-pointer hover:underline text-primary text-sm md:text-base">
                    {translations[language].back}
                  </span>
                </button>
              </div>
              <div>
                <h1 className="text-4xl text-primary font-medium mb-8">
                  {translations[language].header}
                </h1>

                <p className="text-gray-dark text-sm mb-6">
                  {translations[language].introText}
                </p>
              </div>

              {/* Service Sections */}
              <div>
                {/* General Legal Consultations */}
                <div className="mb-6 md:mb-12">
                  <h2 className="text-[16px] font-bold text-primary mb-4">
                    {legalConsultation?.general?.heading}
                  </h2>
                  <div className="ml-4 border-l-3 flex items-start gap-2 border-[#D9D9D99C] pl-6">
                    <div className="w-3 h-3 bg-primary rounded-[2px] flex-shrink-0 mt-1"></div>
                    <p className="text-gray-dark text-[16px] leading-relaxed font-bold mb-4">
                      {legalConsultation?.general?.content}
                    </p>
                  </div>
                </div>

                {/* Corporate Legal Consultations */}
                <div className="mb-6 md:mb-12">
                  <h2 className="text-[16px] font-bold text-primary mb-4">
                    {legalConsultation?.corporate?.heading}
                  </h2>
                  <div className="ml-4 border-l-3 flex items-start gap-2 border-[#D9D9D99C] pl-6">
                    <div className="w-3 h-3 bg-primary rounded-[2px] flex-shrink-0 mt-1"></div>

                    <div>
                      <p className="text-gray-dark text-[16px] leading-relaxed font-bold mb-4">
                        {legalConsultation?.corporate?.introText}
                      </p>
                      <p className="text-gray-700 font-medium mb-3">
                        {legalConsultation?.corporate?.subHeading}
                      </p>
                      <ul className="gap-y-2">
                        {legalConsultation?.corporate?.services?.map(
                          (service, index) => (
                            <li
                              key={index}
                              className="text-gray-dark text-sm leading-relaxed flex items-center"
                            >
                              - {service}
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Individual Legal Consultations */}
                <div>
                  <h2 className="text-2xl font-bold text-primary mb-4">
                    {legalConsultation?.individual?.heading}
                  </h2>
                  <div className="ml-4 border-l-3 flex items-start gap-2 border-[#D9D9D99C] pl-6">
                    <div className="w-3 h-3 bg-primary rounded-[2px] flex-shrink-0 mt-1"></div>

                    <div>
                      <p className="text-gray-dark text-[16px] leading-relaxed font-bold mb-4">
                        {legalConsultation?.individual?.introText}
                      </p>
                      <ul className="gap-y-2">
                        {legalConsultation?.individual?.services?.map(
                          (service, index) => (
                            <li
                              key={index}
                              className="text-gray-dark text-sm leading-relaxed flex items-center"
                            >
                              - {service}
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Service;
