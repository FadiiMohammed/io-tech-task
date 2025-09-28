import * as React from 'react';

const ArrowRightIcon = ({
  className = '',
  width = 21,
  height = 16,
  language = 'en',
  ...props
}) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d={language === 'ar' ? 'M19 12H5' : 'M5 12H19'}
      stroke="#4B2615"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d={language === 'ar' ? 'M12 5L5 12L12 19' : 'M12 5L19 12L12 19'}
      stroke="#4B2615"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default ArrowRightIcon;
