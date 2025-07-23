import React, { useState, useMemo } from 'react';
import { TOKENS, CHAINS } from '../constants';
import type { Token, Chain } from '../types';
import clsx from 'clsx';

// A local SVG component to avoid modifying the main Icons.tsx file
const SearchIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
    </svg>
);


interface TokenSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (token: Token) => void;
  title: string;
}

export function TokenSelector({ isOpen, onClose, onSelect, title }: TokenSelectorProps): React.ReactNode {
  const [selectedAssetSymbol, setSelectedAssetSymbol] = useState<string | null>(null);
  const [tokenSearchQuery, setTokenSearchQuery] = useState('');
  const [chainSearchQuery, setChainSearchQuery] = useState('');

  const uniqueAssets = useMemo(() => {
    const assets = new Map<string, { symbol: string; name: string; icon: React.ReactNode }>();
    TOKENS.forEach(token => {
      if (!assets.has(token.symbol)) {
        assets.set(token.symbol, {
          symbol: token.symbol,
          name: token.name,
          icon: token.icon,
        });
      }
    });
    return Array.from(assets.values());
  }, []);

  const lowercasedTokenQuery = tokenSearchQuery.toLowerCase();
  const lowercasedChainQuery = chainSearchQuery.toLowerCase();

  const filteredAssets = useMemo(() => {
    if (!lowercasedTokenQuery) return uniqueAssets;
    return uniqueAssets.filter(asset =>
      asset.symbol.toLowerCase().includes(lowercasedTokenQuery) ||
      asset.name.toLowerCase().includes(lowercasedTokenQuery)
    );
  }, [uniqueAssets, lowercasedTokenQuery]);

  const visibleChains = useMemo(() => {
    if (!lowercasedChainQuery) return CHAINS;
    return CHAINS.filter(chain =>
      chain.name.toLowerCase().includes(lowercasedChainQuery)
    );
  }, [lowercasedChainQuery]);

  const availableChains = useMemo(() => {
    if (!selectedAssetSymbol) return new Set();
    return new Set(
      TOKENS.filter(t => t.symbol === selectedAssetSymbol).map(t => t.chain.id)
    );
  }, [selectedAssetSymbol]);

  const handleSelectAsset = (symbol: string) => {
    setSelectedAssetSymbol(symbol);
  };

  const handleSelectChain = (chain: Chain) => {
    if (!selectedAssetSymbol || !availableChains.has(chain.id)) return;
    
    const token = TOKENS.find(t => t.symbol === selectedAssetSymbol && t.chain.id === chain.id);
    if (token) {
      onSelect(token);
    }
  };

  const handleClose = () => {
    setSelectedAssetSymbol(null);
    setTokenSearchQuery('');
    setChainSearchQuery('');
    onClose();
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50" onClick={handleClose}>
      <div className="bg-slate-850 border border-slate-700 rounded-2xl w-full max-w-2xl m-4 flex flex-col" onClick={e => e.stopPropagation()}>
         <div className="p-4 border-b border-slate-700">
          <h2 className="text-lg font-bold text-slate-100">{title}</h2>
        </div>
        <div className="flex" style={{ height: '60vh', maxHeight: '500px' }}>
          {/* Column 1: Assets */}
          <div className="w-1/2 border-r border-slate-700 flex flex-col">
            <div className="p-4 border-b border-slate-700">
                <h3 className="text-md font-semibold text-slate-300 mb-2">Select Token</h3>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <SearchIcon className="h-5 w-5 text-slate-500" />
                    </div>
                    <input
                        type="search"
                        placeholder="Search token..."
                        value={tokenSearchQuery}
                        onChange={(e) => setTokenSearchQuery(e.target.value)}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 pl-10 text-sm placeholder-slate-500 focus:ring-1 focus:ring-brand-primary focus:border-brand-primary transition"
                        autoComplete="off"
                    />
                </div>
            </div>
            <div className="overflow-y-auto flex-grow">
              {filteredAssets.length > 0 ? (
                <ul>
                  {filteredAssets.map(asset => (
                    <li key={asset.symbol}>
                      <button
                        onClick={() => handleSelectAsset(asset.symbol)}
                        className={clsx(
                          "w-full flex items-center gap-4 p-4 text-left transition-colors",
                          selectedAssetSymbol === asset.symbol ? "bg-brand-primary/20" : "hover:bg-slate-800"
                        )}
                      >
                        <span className="h-8 w-8">{asset.icon}</span>
                        <div>
                          <p className="font-bold text-slate-100">{asset.symbol}</p>
                          <p className="text-sm text-slate-400">{asset.name}</p>
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                  <div className="p-4 text-center text-slate-500">No tokens found.</div>
              )}
            </div>
          </div>
          {/* Column 2: Chains */}
          <div className="w-1/2 flex flex-col">
            <div className="p-4 border-b border-slate-700">
                <h3 className="text-md font-semibold text-slate-300 mb-2">Select Chain</h3>
                 <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <SearchIcon className="h-5 w-5 text-slate-500" />
                    </div>
                    <input
                        type="search"
                        placeholder="Search chain..."
                        value={chainSearchQuery}
                        onChange={(e) => setChainSearchQuery(e.target.value)}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 pl-10 text-sm placeholder-slate-500 focus:ring-1 focus:ring-brand-primary focus:border-brand-primary transition"
                        autoComplete="off"
                    />
                </div>
            </div>
            <div className="overflow-y-auto flex-grow">
              {visibleChains.length > 0 ? (
                <ul>
                  {visibleChains.map(chain => {
                    const isAvailable = availableChains.has(chain.id);
                    return (
                      <li key={chain.id}>
                        <button
                          onClick={() => handleSelectChain(chain)}
                          disabled={!isAvailable}
                          className={clsx(
                            "w-full flex items-center gap-4 p-4 text-left transition-colors",
                            isAvailable ? "hover:bg-slate-800" : "opacity-40 cursor-not-allowed"
                          )}
                        >
                          <span className="h-8 w-8">{chain.icon}</span>
                          <div>
                            <p className="font-bold text-slate-100">{chain.name}</p>
                            {!chain.isSupported && (
                              <p className="text-xs text-yellow-500/80">Swaps unavailable</p>
                            )}
                          </div>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                  <div className="p-4 text-center text-slate-500">No chains found.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}