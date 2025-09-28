import * as React from 'react';

const PhoneIcon = ({ className = '', width = 25, height = 24, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill="none"
    viewBox="0 0 25 24"
    className={className}
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M9.293 11.7a8 8 0 0 0 3.81 3.647.81.81 0 0 0 .77-.057l2.442-1.565a.8.8 0 0 1 .742-.066l4.57 1.884a.76.76 0 0 1 .372.314c.085.14.119.304.097.465a4.45 4.45 0 0 1-1.552 2.806 4.8 4.8 0 0 1-3.096 1.122c-3.523 0-6.9-1.343-9.392-3.735-2.49-2.39-3.89-5.634-3.89-9.015 0-1.094.416-2.151 1.17-2.972a4.75 4.75 0 0 1 2.922-1.49.8.8 0 0 1 .485.093.75.75 0 0 1 .326.356l1.963 4.397a.72.72 0 0 1-.059.703l-1.63 2.382a.73.73 0 0 0-.05.73M15.829 3.75a7.9 7.9 0 0 1 3.503 1.943 7.45 7.45 0 0 1 2.024 3.363M15.015 6.647a4.7 4.7 0 0 1 2.107 1.165 4.45 4.45 0 0 1 1.213 2.022"
    />
  </svg>
);

export default PhoneIcon;
