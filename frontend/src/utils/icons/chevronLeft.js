import * as React from 'react';

const ChevronLeftIcon = ({
  className = '',
  width = 24,
  height = 24,
  language = 'en',
  ...props
}) => (
  <svg
    className={className}
    width={width}
    height={height}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d={language === 'ar' ? 'M9 19l7-7-7-7' : 'M15 19l-7-7 7-7'}
    />
  </svg>
);

export default ChevronLeftIcon;
