import React from 'react';
import '../styles/PopUp.css';

interface PopupProps {
  show: boolean;
  message: string;
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ show, message, onClose }) => {
  if (!show) return null;

  return (
    <div className="popup">
      <div className="popup-content">
        <button onClick={onClose}>Close</button>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Popup;
