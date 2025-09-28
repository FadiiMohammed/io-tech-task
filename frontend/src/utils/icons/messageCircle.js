import * as React from 'react';

const MessageCircleIcon = ({
  className = '',
  width = 80,
  height = 80,
  ...props
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1"
    className={className}
    {...props}
  >
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
    <path d="M13 8H7"></path>
    <path d="M17 12H7"></path>
  </svg>
);

export default MessageCircleIcon;
