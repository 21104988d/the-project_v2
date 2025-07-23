import React, { useState, useEffect } from 'react';
import type { TransactionRecord } from '../types';
import { getTransactions } from '../services/historyService';
import { XMarkIcon, ArrowDownIcon } from './Icons';

interface TransactionHistoryProps {
  isOpen: boolean;
  onClose: () => void;
}

const ExplorerLink = ({ tx }: { tx: TransactionRecord }) => {
    if (!tx.fromToken.chain.blockExplorerUrl || !tx.fromToken.chain.blockExplorerTxPath) return null;

    const url = `${tx.fromToken.chain.blockExplorerUrl}${tx.fromToken.chain.blockExplorerTxPath}${tx.txHash}`;
    return (
        <a 
            href={url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 transition-colors text-xs font-mono"
        >
            View on Explorer
        </a>
    )
}


export function TransactionHistory({ isOpen, onClose }: TransactionHistoryProps): React.ReactNode {
  const [history, setHistory] = useState<TransactionRecord[]>([]);

  useEffect(() => {
    if (isOpen) {
      setHistory(getTransactions());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-slate-850 border border-slate-700 rounded-2xl w-full max-w-lg m-4 flex flex-col" onClick={e => e.stopPropagation()} style={{ height: '70vh', maxHeight: '600px' }}>
        <div className="flex justify-between items-center p-4 border-b border-slate-700">
          <h2 className="text-xl font-bold text-slate-100">Transaction History</h2>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-200 transition-colors">
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <div className="overflow-y-auto flex-grow p-4">
          {history.length > 0 ? (
            <ul className="space-y-4">
              {history.map(tx => (
                <li key={tx.id} className="bg-slate-800 p-4 rounded-lg border border-slate-700/50">
                    <div className="flex justify-between items-start">
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="h-5 w-5">{tx.fromToken.icon}</span>
                                <span className="font-bold">{tx.fromAmount} {tx.fromToken.symbol}</span>
                                <span className="text-slate-400 text-sm">on {tx.fromToken.chain.name}</span>
                            </div>
                            <div className="flex items-center text-slate-400 my-1 pl-1">
                                <ArrowDownIcon className="h-4 w-4" />
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="h-5 w-5">{tx.toToken.icon}</span>
                                <span className="font-bold">{tx.toAmount} {tx.toToken.symbol}</span>
                                <span className="text-slate-400 text-sm">on {tx.toToken.chain.name}</span>
                            </div>
                        </div>
                        <div className="text-right flex flex-col items-end">
                             <span className="text-xs text-slate-400">{new Date(tx.timestamp).toLocaleString()}</span>
                             <ExplorerLink tx={tx} />
                        </div>
                    </div>
                    <div className="mt-3 pt-2 border-t border-slate-700/50 text-xs text-slate-400 space-y-1">
                        <div className="flex justify-between items-center">
                            <span>Gas/Service Fee</span>
                            <span className="font-mono">{tx.gasFee} / {tx.serviceFee}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span>To Address</span>
                            <span className="font-mono">{`${tx.receiverAddress.slice(0, 6)}...${tx.receiverAddress.slice(-4)}`}</span>
                        </div>
                    </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="h-full flex items-center justify-center text-slate-500">
              No transactions recorded yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}