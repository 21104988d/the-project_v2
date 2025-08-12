import React from 'react';
import type { Route, Token } from '../types';
import { ExternalLinkIcon } from './Icons';
import clsx from 'clsx';

interface QuoteListProps {
  routes: Route[];
  selectedRoute: Route | null;
  onSelectRoute: (route: Route) => void;
  toToken: Token;
}

export function QuoteList({ routes, selectedRoute, onSelectRoute, toToken }: QuoteListProps): React.ReactNode {
  if (routes.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        <p>No bridge information available for this route.</p>
        <p className="text-xs mt-1">Try a different token pair or amount.</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-sm font-medium text-gray-600">Available Bridge Options</h3>
        <span className="text-xs text-gray-500">Informational Only</span>
      </div>
      
      {routes.map((route, index) => (
        <div
          key={`${route.bridge.name}-${index}`}
          onClick={() => onSelectRoute(route)}
          className={clsx(
            "p-3 rounded-lg border cursor-pointer transition-all duration-200 hover:bg-gray-100",
            selectedRoute === route
              ? "bg-blue-50 border-blue-200"
              : "bg-gray-50 border-gray-200 hover:border-gray-300"
          )}
        >
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-2">
              <span className="h-6 w-6">{route.bridge.icon}</span>
              <div>
                <p className="font-medium text-gray-800">{route.bridge.name}</p>
                <p className="text-xs text-gray-600">≈{route.estimatedTime} min</p>
              </div>
            </div>
            
            <div className="text-right">
              <p className="font-mono text-gray-800">
                {parseFloat(route.toAmount).toFixed(2)} {toToken.symbol}
              </p>
              <p className="text-xs text-gray-600">
                Gas: {route.gasFee}
              </p>
            </div>
          </div>
          
          {route.externalUrl && (
            <div className="mt-2 pt-2 border-t border-gray-200">
              <a
                href={route.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLinkIcon className="h-3 w-3" />
                Visit {route.bridge.name}
              </a>
            </div>
          )}
        </div>
      ))}
      
      <div className="mt-3 p-2 bg-gray-100 rounded-lg">
        <p className="text-xs text-gray-600 text-center">
          Select an option above to view detailed information and proceed on the bridge's official website.
        </p>
      </div>
    </div>
  );
}