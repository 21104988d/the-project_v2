import React from 'react';
import type { Route, Token } from '../types';
import { ExternalLinkIcon } from './Icons';
import clsx from 'clsx';

interface QuoteListProps {
  routes: Route[];
  selectedRoute: Route | null;
  onSelectRoute: (route: Route) => void;
  fromToken: Token;
  toToken: Token;
}

export function QuoteList({ routes, selectedRoute, onSelectRoute, fromToken, toToken }: QuoteListProps): React.ReactNode {
  if (routes.length === 0) {
    return (
      <div className="text-center text-slate-400 py-8">
        <p>No bridge information available for this route.</p>
        <p className="text-xs mt-1">Try a different token pair or amount.</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-sm font-medium text-slate-300">Available Bridge Options</h3>
        <span className="text-xs text-slate-500">Informational Only</span>
      </div>
      
      {routes.map((route, index) => (
        <div
          key={`${route.bridge.name}-${index}`}
          onClick={() => onSelectRoute(route)}
          className={clsx(
            "p-3 rounded-lg border cursor-pointer transition-all duration-200 hover:bg-slate-800/50",
            selectedRoute === route
              ? "bg-brand-primary/10 border-brand-primary/50"
              : "bg-slate-850/50 border-slate-700/50 hover:border-slate-600"
          )}
        >
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-2">
              <span className="h-6 w-6">{route.bridge.icon}</span>
              <div>
                <p className="font-medium text-slate-200">{route.bridge.name}</p>
                <p className="text-xs text-slate-400">≈{route.estimatedTime} min</p>
              </div>
            </div>
            
            <div className="text-right">
              <p className="font-mono text-slate-200">
                {parseFloat(route.toAmount).toFixed(2)} {toToken.symbol}
              </p>
              <p className="text-xs text-slate-400">
                Gas: {route.gasFee}
              </p>
            </div>
          </div>
          
          {route.externalUrl && (
            <div className="mt-2 pt-2 border-t border-slate-700/50">
              <a
                href={route.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLinkIcon className="h-3 w-3" />
                Visit {route.bridge.name}
              </a>
            </div>
          )}
        </div>
      ))}
      
      <div className="mt-3 p-2 bg-slate-800/30 rounded-lg">
        <p className="text-xs text-slate-500 text-center">
          Select an option above to view detailed information and proceed on the bridge's official website.
        </p>
      </div>
    </div>
  );
}