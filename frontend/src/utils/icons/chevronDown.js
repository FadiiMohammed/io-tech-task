import * as React from 'react';

const ChevronDownIcon = ({
  className = '',
  width = 12,
  height = 12,
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
    <polyline points="6,9 12,15 18,9"></polyline>
  </svg>
);

export default ChevronDownIcon;
