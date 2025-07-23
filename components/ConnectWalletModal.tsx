import React, { useMemo } from 'react';
import type { Chain, WalletProvider } from '../types';
import { WALLET_PROVIDERS } from '../constants';
import { XMarkIcon } from './Icons';

interface ConnectWalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnect: (providerId: string) => void;
  chain: Chain;
}

export function ConnectWalletModal({ isOpen, onClose, onConnect, chain }: ConnectWalletModalProps): React.ReactNode {
  if (!isOpen) return null;

  const availableWallets = useMemo(() => {
    return WALLET_PROVIDERS.filter(p => p.standard === chain.walletStandard);
  }, [chain]);

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-slate-850 border border-slate-700 rounded-2xl w-full max-w-sm m-4 p-6 relative" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-slate-100">Connect Wallet</h2>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-200 transition-colors">
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <p className="text-sm text-slate-400 mb-4">
          Choose your wallet for the <span className="font-bold text-slate-200">{chain.name}</span> network.
        </p>

        <div className="space-y-3">
          {availableWallets.length > 0 ? (
            availableWallets.map(wallet => (
              <button
                key={wallet.id}
                onClick={() => onConnect(wallet.id)}
                className="w-full flex items-center gap-4 p-4 text-left transition-colors bg-slate-800 hover:bg-slate-700 rounded-xl border border-slate-700"
              >
                <span className="h-10 w-10">{wallet.icon}</span>
                <span className="font-bold text-lg text-slate-100">{wallet.name}</span>
              </button>
            ))
          ) : (
            <div className="text-center text-slate-500 p-4">
              No wallets available for the {chain.name} network.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
