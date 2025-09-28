import * as React from 'react';

const EmailIcon = ({ className = '', width = 21, height = 16, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill="none"
    viewBox="0 0 21 16"
    className={className}
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M1 1h18.75v12.75c0 .199-.082.39-.229.53a.8.8 0 0 1-.552.22H1.78a.8.8 0 0 1-.552-.22.74.74 0 0 1-.229-.53z"
    />
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="m19.75 1-9.375 8.25L1 1"
    />
  </svg>
);

export default EmailIcon;
