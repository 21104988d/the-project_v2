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
    title: 'Transaction Submitted',
    message: 'Your transaction is being processed. Please wait for confirmation on the blockchain.',
  },
  success: {
    icon: <CheckCircleIcon className="h-16 w-16 text-brand-primary" />,
    title: 'Transaction Successful',
    message: 'Your assets have been successfully swapped and are on their way to the destination wallet.',
  },
  error: {
    icon: <XCircleIcon className="h-16 w-16 text-red-500" />,
    title: 'Transaction Failed',
    message: 'Something went wrong with your transaction. Please check your wallet and try again.',
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