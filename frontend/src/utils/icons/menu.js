import * as React from 'react';

const MenuIcon = ({
  className = '',
  width = 24,
  height = 24,
  isOpen = false,
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
    {isOpen ? (
      <path d="M18 6L6 18M6 6l12 12" />
    ) : (
      <path d="M3 12h18M3 6h18M3 18h18" />
    )}
  </svg>
);

export default MenuIcon;
