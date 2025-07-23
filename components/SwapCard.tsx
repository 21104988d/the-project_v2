import React, { useState, useEffect, useMemo } from 'react';
import type { Token, Route, Chain } from '../types';
import { getQuotes } from '../services/routingService';
import { QuoteList } from './QuoteList';
import { ArrowDownIcon, LoadingSpinner } from './Icons';
import clsx from 'clsx';

interface SwapCardProps {
  isWalletConnected: boolean;
  userAddress: string | null;
  fromToken: Token;
  toToken: Token;
  fromTokenBalance: string | null;
  onConnectWallet: () => void;
  onSwap: (route: Route, receiverAddress: string) => void;
  onFromTokenSelect: () => void;
  onToTokenSelect: () => void;
}

// --- Start of address validation logic ---
const evmRegex = /^0x[a-fA-F0-9]{40}$/;
const solanaRegex = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;
const tronRegex = /^T[1-9A-HJ-NP-Za-km-z]{33}$/;
const suiRegex = /^0x[a-fA-F0-9]{64}$/;
const nearRegex = /(^([\w-]+\.)+[\w-]+$)|(^[a-f0-9]{64}$)/;

function isValidAddress(address: string, chain: Chain): boolean {
  if (!address) {
    return false;
  }

  switch (chain.walletStandard) {
    case 'evm': return evmRegex.test(address);
    case 'solana': return solanaRegex.test(address);
    case 'tron': return tronRegex.test(address);
    case 'sui': return suiRegex.test(address);
    case 'near': return nearRegex.test(address);
    default: return false;
  }
}
// --- End of address validation logic ---


export function SwapCard({
  isWalletConnected,
  userAddress,
  fromToken,
  toToken,
  fromTokenBalance,
  onConnectWallet,
  onSwap,
  onFromTokenSelect,
  onToTokenSelect
}: SwapCardProps): React.ReactNode {
  const [fromAmount, setFromAmount] = useState<string>('');
  const [toAmount, setToAmount] = useState<string>('');
  const [receiverAddress, setReceiverAddress] = useState<string>('');
  const [isReceiverInvalid, setIsReceiverInvalid] = useState(false);

  const [routes, setRoutes] = useState<Route[] | null>(null);
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    if (isWalletConnected && userAddress && !receiverAddress) {
      setReceiverAddress(userAddress);
    }
  }, [isWalletConnected, userAddress, receiverAddress]);
  
  useEffect(() => {
    setIsReceiverInvalid(!!receiverAddress && !isValidAddress(receiverAddress, toToken.chain));
  }, [receiverAddress, toToken]);

  useEffect(() => {
    setRoutes(null);
    setSelectedRoute(null);
    setToAmount('');
    setError(null);

    const amount = parseFloat(fromAmount);
    if (amount > 0) {
      setIsLoading(true);
      
      const handler = setTimeout(() => {
        getQuotes(fromAmount, fromToken, toToken)
          .then(newRoutes => {
            if (newRoutes.length > 0) {
              setRoutes(newRoutes);
              setSelectedRoute(newRoutes[0]);
              setToAmount(newRoutes[0].toAmount);
            } else {
              setError('No routes found for this swap.');
            }
          })
          .catch(err => {
            setError(err.message || 'Could not fetch quotes.');
            console.error(err);
            setRoutes(null);
          })
          .finally(() => {
            setIsLoading(false);
          });
      }, 500); // Debounce API calls

      return () => clearTimeout(handler);
    } else {
      setIsLoading(false);
    }
  }, [fromAmount, fromToken, toToken]);
  
  const handleFromAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setFromAmount(value);
    }
  };

  const handleSetMax = () => {
    if (fromTokenBalance) {
      setFromAmount(fromTokenBalance);
    }
  };

  const handleSelectRoute = (route: Route) => {
    setSelectedRoute(route);
    setToAmount(route.toAmount);
  };
  
  const handleSwapAction = () => {
    if (selectedRoute && receiverAddress) {
      onSwap(selectedRoute, receiverAddress);
    }
  };
  
  const handleUseMyAddress = () => {
    if (userAddress) {
      setReceiverAddress(userAddress);
    }
  }

  const swapButtonText = useMemo(() => {
    if (!isWalletConnected) return 'Connect Wallet';
    if (!fromAmount) return 'Enter an amount';
    if (!receiverAddress) return 'Enter Receiver Address';
    if (isReceiverInvalid) return 'Invalid Receiver Address Format';
    if (isLoading) return 'Finding Routes...';
    if (error) return 'Try Again';
    if (!routes || routes.length === 0) return 'No Routes Found';
    if (!selectedRoute) return 'Select a Route';
    return 'Swap';
  }, [isWalletConnected, fromAmount, isLoading, error, routes, selectedRoute, receiverAddress, isReceiverInvalid]);
  
  const isSwapDisabled = !isWalletConnected || !!error || !selectedRoute || isLoading || !fromAmount || !receiverAddress || isReceiverInvalid;

  return (
    <div className="w-full max-w-md bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 shadow-2xl shadow-slate-950/50">
      <div className="space-y-4">
        {/* FROM */}
        <div className="bg-slate-850 p-4 rounded-xl">
          <div className="flex justify-between items-center mb-2 text-xs text-slate-400">
            <span>You send</span>
            {isWalletConnected && fromTokenBalance && (
              <div className="flex items-center gap-1">
                <span>Balance: {fromTokenBalance}</span>
                <button onClick={handleSetMax} className="font-bold text-brand-primary/80 hover:text-brand-primary transition-colors">MAX</button>
              </div>
            )}
          </div>
          <div className="flex justify-between items-center gap-4">
            <input
              type="text"
              placeholder="0"
              className="w-full bg-transparent text-3xl font-mono text-slate-100 placeholder-slate-500 focus:outline-none"
              value={fromAmount}
              onChange={handleFromAmountChange}
            />
            <button onClick={onFromTokenSelect} className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 transition-colors p-2 rounded-lg text-lg font-medium">
              <span className="h-6 w-6">{fromToken.icon}</span>
              {fromToken.symbol}
              <ArrowDownIcon className="h-4 w-4 text-slate-400" />
            </button>
          </div>
           <div className="text-xs text-slate-500 mt-1">On {fromToken.chain.name}</div>
        </div>

        {/* TO */}
        <div className="bg-slate-850 p-4 rounded-xl">
           <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-slate-400">You receive (estimated)</span>
          </div>
          <div className="flex justify-between items-center gap-4">
            <input
              type="text"
              readOnly
              placeholder="0"
              className="w-full bg-transparent text-3xl font-mono text-slate-100 placeholder-slate-500 focus:outline-none"
              value={toAmount}
            />
            <button onClick={onToTokenSelect} className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 transition-colors p-2 rounded-lg text-lg font-medium">
              <span className="h-6 w-6">{toToken.icon}</span>
              {toToken.symbol}
              <ArrowDownIcon className="h-4 w-4 text-slate-400" />
            </button>
          </div>
          <div className="text-xs text-slate-500 mt-1">On {toToken.chain.name}</div>
        </div>
      </div>
      
      <div className="mt-4 min-h-[100px]">
        {isLoading && (
           <div className="flex justify-center items-center h-[76px]">
               <LoadingSpinner className="h-6 w-6 text-slate-400"/>
           </div>
        )}
        
        {error && !isLoading && (
            <div className="flex justify-center items-center h-[76px] text-center text-red-400 bg-red-900/20 p-3 rounded-lg">
                {error}
            </div>
        )}
        
        {routes && !isLoading && !error && (
          <QuoteList 
            routes={routes}
            selectedRoute={selectedRoute}
            onSelectRoute={handleSelectRoute}
            fromToken={fromToken}
            toToken={toToken}
          />
        )}
      </div>

      <div className="mt-6 space-y-4">
          {/* Receiver Address (always visible) */}
          <div>
            <div className="flex justify-between items-center">
              <label htmlFor="receiver-address" className="text-xs text-slate-400">Receiver Address</label>
              {isWalletConnected && userAddress && (
                 <button onClick={handleUseMyAddress} className="text-xs text-brand-secondary hover:text-brand-secondary-hover">Use my address</button>
              )}
            </div>
            <input 
              id="receiver-address"
              type="text"
              value={receiverAddress}
              onChange={(e) => setReceiverAddress(e.target.value)}
              placeholder="Enter receiver address"
              className={clsx(
                "mt-1 w-full bg-slate-850 border rounded-lg p-2 text-sm font-mono focus:ring-2 transition-colors",
                isReceiverInvalid 
                  ? "border-red-500/50 ring-1 ring-red-500/50 focus:border-red-500 focus:ring-red-500"
                  : "border-slate-700 focus:border-brand-primary focus:ring-brand-primary/50"
              )}
            />
            {isReceiverInvalid && (
              <p className="mt-1 text-xs text-red-400">Invalid {toToken.chain.name} address format.</p>
            )}
          </div>
          
          {/* Sender Address (only when connected) */}
          {isWalletConnected && userAddress && (
            <div>
              <label className="text-xs text-slate-400">Sender Address (You)</label>
              <input 
                type="text"
                readOnly
                value={userAddress}
                className="mt-1 w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-sm font-mono text-slate-400 cursor-not-allowed"
              />
            </div>
          )}
      </div>


      <div className="mt-6">
        <button
          onClick={isWalletConnected ? handleSwapAction : onConnectWallet}
          disabled={isSwapDisabled}
          className="w-full bg-brand-primary hover:bg-brand-primary-hover disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed text-white text-xl font-bold py-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-brand-primary/50"
        >
          {swapButtonText}
        </button>
      </div>
    </div>
  );
}