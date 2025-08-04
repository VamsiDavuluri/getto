// src/Toast.js
import React, { useEffect } from 'react';
import './Toast.css';
import { FaTimes } from 'react-icons/fa';

const Toast = ({ message, type, onClose }) => {
  // This useEffect will now run for ANY message that appears.
  useEffect(() => {
    if (message) {
      // Set a timer to automatically close the banner after 4 seconds (4000ms)
      const timer = setTimeout(() => {
        onClose();
      }, 4000);

      // This is a cleanup function. It runs if the user closes the banner manually
      // or if the component is removed for any reason. It prevents errors.
      return () => clearTimeout(timer);
    }
  }, [message, type, onClose]); // Reruns whenever the message changes

  if (!message) return null;

  return (
    <div className={`toast-banner ${type}`}>
      <span>{message}</span>
      <button onClick={onClose} className="toast-close-btn" aria-label="Close">
        <FaTimes />
      </button>
    </div>
  );
};

export default Toast;