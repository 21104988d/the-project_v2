import React, { useState, useEffect } from 'react';
import type { Token, Route } from '../types';
import { getQuotes } from '../services/routingService';
import { QuoteList } from './QuoteList';
import { ArrowDownIcon, LoadingSpinner } from './Icons';

interface SwapCardProps {
  fromToken: Token;
  toToken: Token;
  onSwapTokens: () => void;
  onSelectFromToken: () => void;
  onSelectToToken: () => void;
  onRouteSelect: (route: Route) => void;
  showInfoModal: (title: string, message: string) => void;
}

export function SwapCard({
  fromToken,
  toToken,
  onSwapTokens,
  onSelectFromToken,
  onSelectToToken,
  onRouteSelect,
  showInfoModal,
}: SwapCardProps): React.ReactNode {
  const [amount, setAmount] = useState('100');
  const [routes, setRoutes] = useState<Route[]>([]);
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (fromToken && toToken && amount && parseFloat(amount) > 0) {
      fetchQuotes();
    } else {
      setRoutes([]);
      setSelectedRoute(null);
    }
  }, [fromToken, toToken, amount]);

  const fetchQuotes = async () => {
    setIsLoading(true);
    setRoutes([]);
    setSelectedRoute(null);

    try {
      const numericAmount = parseFloat(amount);
      if (isNaN(numericAmount) || numericAmount <= 0) {
        throw new Error('Invalid amount');
      }

      const fetchedRoutes = await getQuotes(amount, fromToken, toToken);
      setRoutes(fetchedRoutes);
      if (fetchedRoutes.length > 0) {
        setSelectedRoute(fetchedRoutes[0]);
      }
    } catch (error) {
      console.error('Failed to fetch quotes:', error);
      showInfoModal('Quote Error', 'Failed to fetch route information. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || (!isNaN(parseFloat(value)) && parseFloat(value) >= 0)) {
      setAmount(value);
    }
  };

  const handleRouteSelect = (route: Route) => {
    setSelectedRoute(route);
    onRouteSelect(route);
  };

  return (
    <div className="space-y-6">
      {/* Amount Input Section */}
      <div className="space-y-4">
        <div className="border border-gray-200 rounded-xl p-4 bg-gray-50">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600">From</span>
          </div>
          <div className="flex items-center space-x-3">
            <input
              type="text"
              value={amount}
              onChange={handleAmountChange}
              placeholder="0.00"
              className="flex-1 text-2xl font-semibold bg-transparent border-none outline-none text-gray-900"
            />
            <button
              onClick={onSelectFromToken}
              className="flex items-center space-x-2 bg-white border border-gray-200 rounded-lg px-3 py-2 hover:bg-gray-50"
            >
              {fromToken.icon}
              <div className="text-left">
                <div className="font-medium text-gray-900">{fromToken.symbol}</div>
                <div className="text-xs text-gray-500">{fromToken.chain.name}</div>
              </div>
            </button>
          </div>
        </div>

        {/* Swap Direction Button */}
        <div className="flex justify-center">
          <button
            onClick={onSwapTokens}
            className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 shadow-sm"
          >
            <ArrowDownIcon />
          </button>
        </div>

        <div className="border border-gray-200 rounded-xl p-4 bg-gray-50">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600">To</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex-1 text-2xl font-semibold text-gray-500">
              {selectedRoute ? selectedRoute.toAmount : '0.00'}
            </div>
            <button
              onClick={onSelectToToken}
              className="flex items-center space-x-2 bg-white border border-gray-200 rounded-lg px-3 py-2 hover:bg-gray-50"
            >
              {toToken.icon}
              <div className="text-left">
                <div className="font-medium text-gray-900">{toToken.symbol}</div>
                <div className="text-xs text-gray-500">{toToken.chain.name}</div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Routes Section */}
      {isLoading && (
        <div className="flex justify-center items-center py-8">
          <LoadingSpinner />
          <span className="ml-2 text-gray-600">Finding best routes...</span>
        </div>
      )}

      {!isLoading && routes.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Available Routes</h3>
          <QuoteList
            routes={routes}
            selectedRoute={selectedRoute}
            onSelectRoute={handleRouteSelect}
            toToken={toToken}
          />
        </div>
      )}

      {!isLoading && routes.length === 0 && amount && parseFloat(amount) > 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>No routes available for this token pair.</p>
          <p className="text-sm mt-1">Try selecting different tokens or check back later.</p>
        </div>
      )}

      {/* Information Banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          <strong>Information Only:</strong> This platform displays routing options from various bridge providers. 
          Click on a route to visit the provider's website and execute the transaction.
        </p>
      </div>
    </div>
  );
}
