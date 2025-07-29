// src/Toast.js
import React, { useEffect } from 'react';
import './Toast.css';

const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    // Automatically close the toast after 3 seconds
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    // Cleanup the timer if the component unmounts
    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);

  if (!message) return null;

  return (
    <div className={`toast ${type}`}>
      {message}
    </div>
  );
};

export default Toast;