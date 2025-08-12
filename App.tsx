import React, { useState, useCallback } from 'react';
import { SwapCard } from './components/SwapCard';
import { TokenSelector } from './components/TokenSelector';
import { InfoModal } from './components/InfoModal';
import { LogoIcon, GithubIcon } from './components/Icons';
import type { Token, Route } from './types';
import { TOKENS } from './constants';

export default function App(): React.ReactNode {
  const [fromToken, setFromToken] = useState<Token>(TOKENS[0]); // Default USDT on Ethereum
  const [toToken, setToToken] = useState<Token>(TOKENS[3]); // Default USDC on Arbitrum

  const [isFromSelectorOpen, setIsFromSelectorOpen] = useState(false);
  const [isToSelectorOpen, setIsToSelectorOpen] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [infoModalContent, setInfoModalContent] = useState({ title: '', message: '' });

  const showInfoModal = useCallback((title: string, message: string) => {
    setInfoModalContent({ title, message });
    setIsInfoModalOpen(true);
  }, []);

  const handleSwapTokens = useCallback(() => {
    const temp = fromToken;
    setFromToken(toToken);
    setToToken(temp);
  }, [fromToken, toToken]);

  const handleRouteSelect = useCallback((route: Route) => {
    if (route.externalUrl) {
      window.open(route.externalUrl, '_blank', 'noopener,noreferrer');
    } else {
      showInfoModal(
        'Information Only', 
        'This is an informational platform. Please visit the bridge provider\'s website to execute transactions.'
      );
    }
  }, [showInfoModal]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="relative bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <LogoIcon />
              <div>
                <h1 className="text-xl font-bold text-gray-900">The Project</h1>
                <p className="text-xs text-gray-500">Information Aggregator v3.0.0</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => showInfoModal(
                  'About The Project', 
                  'The Project is a frontend-only information aggregator that displays routing options from multiple cross-chain bridge providers. We do not execute transactions - users are redirected to external bridge websites.'
                )}
                className="text-gray-600 hover:text-gray-900 text-sm font-medium"
              >
                About
              </button>
              <a
                href="https://github.com/21104988d/the-project_v2"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900"
                aria-label="View GitHub Repository"
              >
                <GithubIcon />
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Cross-Chain Bridge Information
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Compare routing options from multiple bridge providers. This platform provides information only - 
            actual transactions are conducted on external bridge websites.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <SwapCard
            fromToken={fromToken}
            toToken={toToken}
            onSwapTokens={handleSwapTokens}
            onSelectFromToken={() => setIsFromSelectorOpen(true)}
            onSelectToToken={() => setIsToSelectorOpen(true)}
            onRouteSelect={handleRouteSelect}
            showInfoModal={showInfoModal}
          />
        </div>

        {/* Disclaimer */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
          <p className="text-sm text-yellow-800">
            <strong>Disclaimer:</strong> This platform provides information only and does not execute transactions. 
            You will be redirected to external bridge providers to conduct actual transactions.
          </p>
        </div>
      </main>

      {/* Modals */}
      <TokenSelector
        isOpen={isFromSelectorOpen}
        onClose={() => setIsFromSelectorOpen(false)}
        tokens={TOKENS}
        onSelectToken={(token: Token) => {
          setFromToken(token);
          setIsFromSelectorOpen(false);
        }}
        title="Select Source Token"
      />

      <TokenSelector
        isOpen={isToSelectorOpen}
        onClose={() => setIsToSelectorOpen(false)}
        tokens={TOKENS}
        onSelectToken={(token: Token) => {
          setToToken(token);
          setIsToSelectorOpen(false);
        }}
        title="Select Destination Token"
      />

      <InfoModal
        isOpen={isInfoModalOpen}
        onClose={() => setIsInfoModalOpen(false)}
        title={infoModalContent.title}
        message={infoModalContent.message}
      />
    </div>
  );
}
