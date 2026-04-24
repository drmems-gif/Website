import React from 'react';
import { FiAlertCircle, FiCheckCircle } from 'react-icons/fi';

const Alert = ({ type = 'info', message, onClose }) => {
  const bgColor = {
    success: 'bg-green-100 border-green-300',
    error: 'bg-red-100 border-red-300',
    warning: 'bg-yellow-100 border-yellow-300',
    info: 'bg-blue-100 border-blue-300',
  }[type];

  const textColor = {
    success: 'text-green-800',
    error: 'text-red-800',
    warning: 'text-yellow-800',
    info: 'text-blue-800',
  }[type];

  const Icon = type === 'success' ? FiCheckCircle : FiAlertCircle;

  return (
    <div className={`border-l-4 p-4 ${bgColor} ${textColor} flex items-center justify-between`}>
      <div className="flex items-center gap-3">
        <Icon size={20} />
        <span>{message}</span>
      </div>
      {onClose && (
        <button onClick={onClose} className="text-lg font-bold hover:opacity-70">
          ×
        </button>
      )}
    </div>
  );
};

export default Alert;
