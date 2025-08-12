import React from 'react';
import type { TransactionStatus, Chain } from '../types';
import { LoadingSpinner, CheckCircleIcon, XCircleIcon } from './Icons';

interface TransactionStatusModalProps {
  status: TransactionStatus;
  txHash: string | null;
  isOpen: boolean;
  onClose: () => void;
  sourceChain: Chain | null;
}

const statusInfo = {
  pending: {
    icon: <LoadingSpinner className="h-16 w-16 text-blue-400" />,
    title: 'Redirecting to Bridge',
    message: 'You are being redirected to the bridge provider\'s official website to complete your transaction.',
  },
  success: {
    icon: <CheckCircleIcon className="h-16 w-16 text-brand-primary" />,
    title: 'Information Gathered',
    message: 'Bridge information has been collected. You can now proceed on the external bridge website.',
  },
  error: {
    icon: <XCircleIcon className="h-16 w-16 text-red-500" />,
    title: 'Information Unavailable',
    message: 'Unable to gather bridge information at this time. Please try again or check the bridge directly.',
  },
};

export function TransactionStatusModal({ status, txHash, isOpen, onClose, sourceChain }: TransactionStatusModalProps): React.ReactNode {
  if (!isOpen || status === 'idle' || status === 'loading') return null;

  const currentStatus = statusInfo[status];
  const explorerUrl = sourceChain?.blockExplorerUrl && sourceChain?.blockExplorerTxPath && txHash
    ? `${sourceChain.blockExplorerUrl}${sourceChain.blockExplorerTxPath}${txHash}`
    : '#';


  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-sm m-4 p-8 text-center flex flex-col items-center gap-4">
        {currentStatus.icon}
        <h2 className="text-2xl font-bold text-slate-100">{currentStatus.title}</h2>
        <p className="text-slate-400">{currentStatus.message}</p>
        
        {txHash && (
          <div className="w-full text-left mt-4">
             <p className="text-xs text-slate-500 mb-1">Transaction Hash</p>
             <a
              href={explorerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-sm font-mono text-blue-400 bg-slate-800 p-2 rounded-lg truncate hover:underline"
            >
              {txHash}
            </a>
          </div>
        )}

        <button
          onClick={onClose}
          className="mt-6 w-full bg-brand-primary hover:bg-brand-primary-hover text-white font-bold py-3 rounded-xl transition-colors"
        >
          {status === 'success' || status === 'error' ? 'Close' : 'Dismiss'}
        </button>
      </div>
    </div>
  );
}