

import React, { useMemo } from 'react';
import clsx from 'clsx';
import type { Route, Token } from '../types';
import { BestRateIcon, FastestRouteIcon } from './Icons';

interface QuoteListProps {
  routes: Route[];
  selectedRoute: Route | null;
  onSelectRoute: (route: Route) => void;
  fromToken: Token;
  toToken: Token;
}

export function QuoteList({ routes, selectedRoute, onSelectRoute, fromToken, toToken }: QuoteListProps): React.ReactNode {

  const { bestRate, fastestTime } = useMemo(() => {
    if (!routes || routes.length === 0) {
      return { bestRate: 0, fastestTime: Infinity };
    }
    const bestRateValue = Math.max(...routes.map(r => parseFloat(r.toAmount)));
    const fastestTimeValue = Math.min(...routes.map(r => r.estimatedTime));
    return { bestRate: bestRateValue, fastestTime: fastestTimeValue };
  }, [routes]);

  return (
    <div className="space-y-2">
      {routes.map((route) => {
        const routeId = `${route.aggregator.id}-${route.bridge.name}`;
        const isSelected = selectedRoute ? `${selectedRoute.aggregator.id}-${selectedRoute.bridge.name}` === routeId : false;

        const isBestRate = parseFloat(route.toAmount) === bestRate;
        const isFastest = route.estimatedTime === fastestTime;

        const feeItems = [route.gasFee, route.serviceFee];
        const feeLabels = ['Gas', 'Service'];

        const aggregatorFeeValue = route.aggregatorFee ? parseFloat(route.aggregatorFee.replace('$', '')) : 0;
        if (aggregatorFeeValue > 0) {
            feeItems.push(route.aggregatorFee);
            feeLabels.push('Aggregator');
        }

        const feeDisplayString = feeItems.join(' + ');
        const feeLabelString = `Fees (${feeLabels.join(' + ')})`;

        return (
          <button
            key={routeId}
            onClick={() => onSelectRoute(route)}
            className={clsx(
              "w-full text-left p-3 rounded-lg transition-all duration-200 border-2",
              isSelected 
                ? 'bg-slate-700/50 border-brand-primary' 
                : 'bg-slate-800 border-transparent hover:border-slate-600'
            )}
          >
            {/* Top Section: Main Info */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="flex items-center -space-x-3">
                  <div className="h-8 w-8 rounded-full bg-slate-700 flex items-center justify-center ring-2 ring-slate-800 z-10">
                    {route.bridge.icon}
                  </div>
                  <div className="h-6 w-6 rounded-full bg-slate-700 flex items-center justify-center ring-2 ring-slate-800">
                    {route.aggregator.icon}
                  </div>
                </div>
                <div>
                    <span className="font-bold">{route.bridge.name}</span>
                    <div className="mt-1 flex items-center gap-2 text-xs">
                        {isBestRate && (
                        <div className="flex items-center gap-1 text-green-400 bg-green-900/50 px-2 py-0.5 rounded-full">
                            <BestRateIcon className="h-3 w-3" />
                            <span>Best Rate</span>
                        </div>
                        )}
                        {isFastest && (
                        <div className="flex items-center gap-1 text-cyan-400 bg-cyan-900/50 px-2 py-0.5 rounded-full">
                            <FastestRouteIcon className="h-3 w-3" />
                            <span>Fastest</span>
                        </div>
                        )}
                    </div>
                </div>
              </div>
              <div className="text-right">
                <p className="font-mono font-bold text-lg text-slate-100">{route.toAmount}</p>
                <p className="text-xs text-slate-400">~{route.estimatedTime} min</p>
              </div>
            </div>
            
            {/* Bottom Section: Details */}
            <div className="mt-3 pt-2 border-t border-slate-700/50 text-xs text-slate-400 space-y-1">
                <div className="flex justify-between items-center">
                    <span>Rate</span>
                    <span className="font-mono font-medium text-slate-300">
                        1 {fromToken.symbol} ≈ {route.rate.toFixed(5)} {toToken.symbol}
                    </span>
                </div>
                <div className="flex justify-between items-center">
                    <span>{feeLabelString}</span>
                    <span className="font-mono">{feeDisplayString}</span>
                </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}