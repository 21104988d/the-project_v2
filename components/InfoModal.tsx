import React from 'react';
import { InformationCircleIcon, XMarkIcon } from './Icons';

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
}

export function InfoModal({ isOpen, onClose, title, message }: InfoModalProps): React.ReactNode {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-sm m-4 p-6 text-center flex flex-col items-center gap-4" onClick={e => e.stopPropagation()}>
        <InformationCircleIcon className="h-12 w-12 text-blue-400" />
        <h2 className="text-2xl font-bold text-slate-100">{title}</h2>
        <p className="text-slate-400">{message}</p>
        <button
          onClick={onClose}
          className="mt-4 w-full bg-brand-primary hover:bg-brand-primary-hover text-white font-bold py-3 rounded-xl transition-colors"
        >
          OK
        </button>
      </div>
    </div>
  );
}