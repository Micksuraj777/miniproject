// Button.jsx
import React from 'react';


// Button component that accepts props for customization
const Button = ({
  text, // Button text
  onClick, // Click handler
  color = 'bg-blue-500', // Default color (blue)
  size = 'py-2 px-4', // Default size (padding)
  rounded = 'rounded-lg', // Default rounded corners
  icon, // Optional icon
  disabled = false, // Disabled state
  loading = false, // Loading state
  className = '', // Additional custom classes
}) => {
  // Additional styles for loading or disabled state
  const buttonStyle = `inline-flex items-center justify-center ${color} ${size} ${rounded} text-white font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${className}`;
  
  return (
    <button
      onClick={onClick}
      className={buttonStyle}
      disabled={disabled || loading}
    >
      {/* If loading, show a spinner instead of text */}
      {loading ? (
        <div className="loader"></div>
      ) : (
        <>
          {/* If an icon is passed, display the icon first */}
          {icon && <span className="mr-2">{icon}</span>}
          <span>{text}</span>
        </>
      )}
    </button>
  );
};

export default Button;
