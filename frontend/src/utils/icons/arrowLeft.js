import * as React from 'react';

const ArrowLeftIcon = ({
  className = '',
  width = 24,
  height = 24,
  language = 'en',
  ...props
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className={className}
    {...props}
  >
    <polyline
      points={language === 'ar' ? '9,18 15,12 9,6' : '15,18 9,12 15,6'}
    ></polyline>
  </svg>
);

export default ArrowLeftIcon;
