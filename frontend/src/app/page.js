'use client';

import { useState, useEffect } from 'react';
import HeroSection from '../container/HeroSection';
import OurTeam from '../container/OurTeam';
import Testimonials from '../container/Testimonials';
import Footer from '../container/footer';
import Search from '@/container/Search';
import PageHeader from '@/components/PageHeader';
import Service from '@/container/service';
import NavBar from '@/components/NavBar';

export default function Home() {
  const [activeSection, setActiveSection] = useState('home');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [language, setLanguage] = useState('en');
  const [selectedServiceName, setSelectedServiceName] =
    useState('Legal Consultation');

  const handleSearchToggle = () => {
    if (!isSearchOpen) {
      setIsSearchOpen(true);
      setActiveSection('search');
    } else {
      setIsSearchOpen(false);
      setSearchQuery('');
      setActiveSection('home');
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Handle search functionality here
      console.log('Searching for:', searchQuery);
      // You can implement actual search logic here
    }
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === 'Escape') {
      setIsSearchOpen(false);
      setSearchQuery('');
      setActiveSection('home');
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const handleNavigateHome = () => {
    setIsSearchOpen(false);
    setSearchQuery('');
    setActiveSection('home');
  };

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'ar' : 'en'));
  };

  // Language translations
  const translations = {
    en: {
      home: 'Home',
      about: 'About us',
      services: 'Services',
      blog: 'Blog',
      team: 'Our Team',
      contact: 'Contact us',
      bookAppointment: 'Book Appointment',
      aboutUs: 'About Us',
      aboutDescription:
        'Learn more about Al Safar and Partners, our history, mission, and commitment to excellence in legal and business consulting services.',
      ourServices: 'Our Services',
      servicesDescription:
        'Comprehensive legal and business consulting services tailored to meet your specific needs and objectives.',
      blogDescription:
        'Stay updated with the latest insights, news, and articles from our team of experts.',
      ourTeam: 'Our Team',
      teamDescription:
        'Meet our experienced team of professionals dedicated to providing exceptional service.',
      contactUs: 'Contact Us',
      contactDescription:
        'Get in touch with us for consultations, inquiries, or to schedule an appointment.',
      servicesDropdown: [
        'Legal Consultation Services',
        'Foreign Investement Services',
        'Contracts',
        'Notarization',
        'Insurance',
        'Defense in All Cases',
        'Banks and Financial Institutions',
        'Corporate Governance Services',
        'Companies Liquidation',
        'Internal Regulations for Companies',
        'Services for Companies and Institutions',
        'Arbitration',
        'Intellectual Property',
        'Corporate Restructuring and Reorganization',
        'Establishing National and Foreign Companies',
        'Commercial Agencies',
        'Supporting Vision 2030',
        'Estates',
      ],
    },
    ar: {
      home: 'الرئيسية',
      about: 'من نحن',
      services: 'الخدمات',
      blog: 'المدونة',
      team: 'فريقنا',
      contact: 'اتصل بنا',
      bookAppointment: 'احجز موعد',
      aboutUs: 'من نحن',
      aboutDescription:
        'تعرف على المزيد حول الصفار وشركائه، تاريخنا، مهمتنا، والتزامنا بالتميز في خدمات الاستشارات القانونية والتجارية.',
      ourServices: 'خدماتنا',
      servicesDescription:
        'خدمات استشارية قانونية وتجارية شاملة مصممة لتلبية احتياجاتك وأهدافك المحددة.',
      blogDescription:
        'ابق على اطلاع بأحدث الرؤى والأخبار والمقالات من فريق خبرائنا.',
      ourTeam: 'فريقنا',
      teamDescription:
        'التق بفريقنا من المحترفين ذوي الخبرة المتفانين في تقديم خدمة استثنائية.',
      contactUs: 'اتصل بنا',
      contactDescription:
        'تواصل معنا للحصول على الاستشارات أو الاستفسارات أو لتحديد موعد.',
      servicesDropdown: [
        'خدمات الاستشارات القانونية',
        'خدمات الاستثمار الأجنبي',
        'العقود',
        'التوثيق',
        'التأمين',
        'الدفاع في جميع القضايا',
        'البنوك والمؤسسات المالية',
        'خدمات الحوكمة المؤسسية',
        'تصفية الشركات',
        'اللوائح الداخلية للشركات',
        'خدمات الشركات والمؤسسات',
        'التحكيم',
        'الملكية الفكرية',
        'إعادة الهيكلة المؤسسية وإعادة التنظيم',
        'تأسيس الشركات الوطنية والأجنبية',
        'الوكالات التجارية',
        'دعم رؤية 2030',
        'التركات',
      ],
    },
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'home':
        return (
          <>
            <HeroSection
              language={language}
              onNavigateHome={() => setActiveSection('home')}
            />
            <OurTeam language={language} />
            <Testimonials language={language} />
          </>
        );
      case 'about':
        return (
          <PageHeader
            title={translations[language].aboutUs}
            description={translations[language].aboutDescription}
            language={language}
          />
        );
      case 'services':
        return (
          <Service
            language={language}
            onNavigateHome={() => setActiveSection('home')}
            serviceName={selectedServiceName}
          />
        );
      case 'blog':
        return (
          <PageHeader
            title={translations[language].blog}
            description={translations[language].blogDescription}
            language={language}
          />
        );
      case 'team':
        return (
          <PageHeader
            title={translations[language].ourTeam}
            description={translations[language].teamDescription}
            language={language}
          />
        );
      case 'contact':
        return (
          <PageHeader
            title={translations[language].contactUs}
            description={translations[language].contactDescription}
            language={language}
          />
        );
      case 'search':
        return (
          <Search
            searchQuery={searchQuery}
            onClearSearch={handleClearSearch}
            onNavigateHome={handleNavigateHome}
            language={language}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={`m-0 p-0 ${language === 'ar' ? 'rtl' : 'ltr'}`}
      dir={language === 'ar' ? 'rtl' : 'ltr'}
    >
      {/* NavBar Component */}
      <NavBar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        language={language}
        toggleLanguage={toggleLanguage}
        isSearchOpen={isSearchOpen}
        setIsSearchOpen={setIsSearchOpen}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearchToggle={handleSearchToggle}
        handleSearchSubmit={handleSearchSubmit}
        handleSearchKeyDown={handleSearchKeyDown}
        handleClearSearch={handleClearSearch}
        handleNavigateHome={handleNavigateHome}
        translations={translations}
        selectedServiceName={selectedServiceName}
        setSelectedServiceName={setSelectedServiceName}
      />

      {/* Main Content */}
      <main>{renderContent()}</main>

      {/* Footer */}
      <Footer language={language} />
    </div>
  );
}
