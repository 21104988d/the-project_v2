
import React from 'react';
import { WalletIcon } from './Icons';

interface ConnectWalletButtonProps {
  isConnected: boolean;
  address: string | null;
  onConnect: () => void;
  onDisconnect: () => void;
}

export function ConnectWalletButton({
  isConnected,
  address,
  onConnect,
  onDisconnect,
}: ConnectWalletButtonProps): React.ReactNode {
  if (isConnected && address) {
    return (
      <button
        onClick={onDisconnect}
        className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 font-mono text-sm py-2 px-4 rounded-lg transition-colors flex items-center gap-2"
      >
        <span>{`${address.slice(0, 6)}...${address.slice(-4)}`}</span>
      </button>
    );
  }

  return (
    <button
      onClick={onConnect}
      className="bg-brand-primary hover:bg-brand-primary-hover text-white font-bold py-2 px-4 rounded-lg transition-colors flex items-center gap-2"
    >
      <WalletIcon className="h-5 w-5" />
      <span>Connect Wallet</span>
    </button>
  );
}