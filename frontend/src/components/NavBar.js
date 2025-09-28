'use client';

import { useState, useEffect } from 'react';
import ChevronDownIcon from '@/utils/icons/chevronDown';
import GlobeIcon from '@/utils/icons/globe';
import SearchIcon from '@/utils/icons/search';
import CloseIcon from '@/utils/icons/close';
import MenuIcon from '@/utils/icons/menu';
import Logo from '@/utils/icons/logo';

export default function NavBar({
  activeSection,
  setActiveSection,
  language,
  toggleLanguage,
  isSearchOpen,
  setIsSearchOpen,
  searchQuery,
  setSearchQuery,
  handleSearchToggle,
  handleSearchSubmit,
  handleSearchKeyDown,
  handleClearSearch,
  handleNavigateHome,
  translations,
  selectedServiceName,
  setSelectedServiceName,
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isServicesDropdownOpen &&
        !event.target.closest('.services-dropdown-container')
      ) {
        setIsServicesDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isServicesDropdownOpen]);

  const handleServicesClick = () => {
    setIsServicesDropdownOpen(!isServicesDropdownOpen);
  };

  const handleNavClick = (section) => {
    setActiveSection(section);
    setIsSearchOpen(false);
    setSearchQuery('');
    setMobileMenuOpen(false);
    setIsServicesDropdownOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[800] transition-all duration-300 ${
        isScrolled || mobileMenuOpen
          ? 'bg-primary shadow-lg'
          : 'lg:bg-transparent bg-primary'
      }`}
    >
      <div className="flex items-center justify-between py-4 px-4 max-w-[1200px] mx-auto">
        <div className="flex items-center">
          <Logo />
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex list-none m-0 p-0 gap-8">
          <li>
            <a
              href="#home"
              className={`decoration-none text-sm transition-colors hover:text-yellow-600 ${
                activeSection === 'home' ? 'text-yellow-600' : 'text-white'
              }`}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('home');
              }}
            >
              {translations[language].home}
            </a>
          </li>
          <li>
            <a
              href="#about"
              className={`decoration-none text-sm transition-colors hover:text-yellow-600 ${
                activeSection === 'about' ? 'text-yellow-600' : 'text-white'
              }`}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('about');
              }}
            >
              {translations[language].about}
            </a>
          </li>
          <li className="services-dropdown-container flex items-end">
            <a
              href="#services"
              className={`decoration-none text-sm transition-colors hover:text-yellow-600 flex items-center gap-1 ${
                activeSection === 'services' ? 'text-yellow-600' : 'text-white'
              }`}
              onClick={(e) => {
                e.preventDefault();
                handleServicesClick();
              }}
            >
              {translations[language].services}
              <ChevronDownIcon
                width="12"
                height="12"
                className={`transition-transform duration-200 ${
                  isServicesDropdownOpen ? 'rotate-180' : 'rotate-0'
                }`}
              />
            </a>
          </li>
          <li>
            <a
              href="#blog"
              className={`decoration-none text-sm transition-colors hover:text-yellow-600 ${
                activeSection === 'blog' ? 'text-yellow-600' : 'text-white'
              }`}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('blog');
              }}
            >
              {translations[language].blog}
            </a>
          </li>
          <li>
            <a
              href="#team"
              className={`decoration-none text-sm transition-colors hover:text-yellow-600 ${
                activeSection === 'team' ? 'text-yellow-600' : 'text-white'
              }`}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('team');
              }}
            >
              {translations[language].team}
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className={`decoration-none text-sm transition-colors hover:text-yellow-600 ${
                activeSection === 'contact' ? 'text-yellow-600' : 'text-white'
              }`}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('contact');
              }}
            >
              {translations[language].contact}
            </a>
          </li>
        </ul>

        {/* Services Dropdown - positioned relative to navbar */}
        {isServicesDropdownOpen && (
          <div className="hidden lg:block absolute top-full left-[10%] right-[10%] bg-primary rounded-lg shadow-lg z-50 services-dropdown-container">
            <div className="absolute -top-2 left-1/3 transform -translate-x-1/2">
              <div className="w-4 h-4 bg-primary transform rotate-45 border-l border-t border-white/20"></div>
            </div>
            <div className="p-6 max-w-7xl mx-auto">
              <div className="h-80 overflow-hidden">
                <div className="columns-4 gap-6 space-y-3">
                  {translations[language].servicesDropdown.map(
                    (service, index) => (
                      <div
                        key={index}
                        className="text-gray-200 whitespace-nowrap hover:underline p-4 hover:text-white transition-colors cursor-pointer text-sm leading-relaxed break-inside-avoid"
                        onClick={() => {
                          setActiveSection('services');
                          setSelectedServiceName(service);
                          setIsServicesDropdownOpen(false);
                          setIsSearchOpen(false);
                          setSearchQuery('');
                        }}
                      >
                        {service}
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-8">
          {/* Language Switcher */}
          <button
            onClick={toggleLanguage}
            className="flex items-end gap-2 text-white hover:text-yellow-600 transition-colors"
          >
            <GlobeIcon width="20" height="20" />
            <span className="text-sm font-medium">
              {language.toUpperCase()}
            </span>
          </button>

          {/* Search Component */}
          <div className="relative">
            {!isSearchOpen ? (
              <div
                className="text-white cursor-pointer transition-all duration-300 hover:text-yellow-600 hover:scale-110"
                onClick={handleSearchToggle}
              >
                <SearchIcon width="20" height="20" />
              </div>
            ) : (
              <div className="flex items-center">
                <form
                  onSubmit={handleSearchSubmit}
                  className="flex items-center"
                >
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleSearchKeyDown}
                    placeholder="Search..."
                    className="bg-white text-gray-900 px-3 py-1 rounded-lg text-sm w-48 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all duration-300"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={handleSearchToggle}
                    className="ml-2 text-white hover:text-yellow-600 transition-colors"
                  >
                    <CloseIcon width="20" height="20" />
                  </button>
                </form>
              </div>
            )}
          </div>
          <button className="bg-transparent border border-white text-sm text-white px-4 py-2 rounded-lg hover:bg-white hover:text-primary transition-colors">
            {translations[language].bookAppointment}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden cursor-pointer text-white p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <MenuIcon width="24" height="24" isOpen={mobileMenuOpen} />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden transition-all duration-300 ${
          mobileMenuOpen
            ? 'max-h-96 opacity-100'
            : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        <div className="bg-primary px-4 py-4 gap-y-4">
          <a
            href="#home"
            className={`block font-semibold py-2 hover:text-yellow-600 transition-colors ${
              activeSection === 'home' ? 'text-yellow-600' : 'text-white'
            }`}
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('home');
            }}
          >
            {translations[language].home}
          </a>
          <a
            href="#about"
            className={`block font-semibold py-2 hover:text-yellow-600 transition-colors ${
              activeSection === 'about' ? 'text-yellow-600' : 'text-white'
            }`}
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('about');
            }}
          >
            {translations[language].about}
          </a>
          <div className="services-dropdown-container">
            <a
              href="#services"
              className={`block font-semibold py-2 hover:text-yellow-600 transition-colors ${
                activeSection === 'services' ? 'text-yellow-600' : 'text-white'
              }`}
              onClick={(e) => {
                e.preventDefault();
                handleServicesClick();
              }}
            >
              {translations[language].services}
            </a>

            {/* Mobile Services Dropdown */}
            {isServicesDropdownOpen && (
              <div className="ml-4 bg-primary-light rounded-lg p-4 h-64 overflow-hidden">
                <div className="columns-2 gap-4 space-y-2">
                  {translations[language].servicesDropdown.map(
                    (service, index) => (
                      <div
                        key={index}
                        className="text-gray-200 hover:text-white transition-colors cursor-pointer text-sm leading-relaxed py-1 break-inside-avoid"
                        onClick={() => {
                          setActiveSection('services');
                          setSelectedServiceName(service);
                          setIsServicesDropdownOpen(false);
                          setIsSearchOpen(false);
                          setSearchQuery('');
                          setMobileMenuOpen(false);
                        }}
                      >
                        {service}
                      </div>
                    )
                  )}
                </div>
              </div>
            )}
          </div>
          <a
            href="#blog"
            className={`block font-semibold py-2 hover:text-yellow-600 transition-colors ${
              activeSection === 'blog' ? 'text-yellow-600' : 'text-white'
            }`}
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('blog');
            }}
          >
            {translations[language].blog}
          </a>
          <a
            href="#team"
            className={`block font-semibold py-2 hover:text-yellow-600 transition-colors ${
              activeSection === 'team' ? 'text-yellow-600' : 'text-white'
            }`}
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('team');
            }}
          >
            {translations[language].team}
          </a>
          <a
            href="#contact"
            className={`block font-semibold py-2 hover:text-yellow-600 transition-colors ${
              activeSection === 'contact' ? 'text-yellow-600' : 'text-white'
            }`}
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('contact');
            }}
          >
            {translations[language].contact}
          </a>
          <div className="pt-4 border-t border-amber-700">
            <div className="flex items-center justify-between">
              {/* Mobile Language Switcher */}
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-2 text-white hover:text-yellow-600 transition-colors"
              >
                <GlobeIcon width="18" height="18" />
                <span className="text-xs font-medium">
                  {language.toUpperCase()}
                </span>
              </button>

              {/* Mobile Search Component */}
              <div className="relative">
                {!isSearchOpen ? (
                  <div
                    className="text-white cursor-pointer transition-all duration-300 hover:text-yellow-600 hover:scale-110"
                    onClick={handleSearchToggle}
                  >
                    <SearchIcon width="20" height="20" />
                  </div>
                ) : (
                  <div className="flex items-center">
                    <form
                      onSubmit={handleSearchSubmit}
                      className="flex items-center"
                    >
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={handleSearchKeyDown}
                        placeholder="Search..."
                        className="bg-white text-gray-900 px-3 py-1 rounded-lg text-sm w-32 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all duration-300"
                        autoFocus
                      />
                      <button
                        type="button"
                        onClick={handleSearchToggle}
                        className="ml-2 text-white hover:text-yellow-600 transition-colors"
                      >
                        <CloseIcon width="20" height="20" />
                      </button>
                    </form>
                  </div>
                )}
              </div>
              <button className="bg-transparent border border-white text-white px-4 py-2 rounded-lg hover:bg-white hover:text-primary transition-colors">
                {translations[language].bookAppointment}
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
