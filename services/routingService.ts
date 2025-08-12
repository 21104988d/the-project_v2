import React from 'react';
import type { Route, Token, Bridge } from '../types';
import { BRIDGES } from '../constants';
import { UnknownIcon } from '../components/Icons';

// --- Educational Bridge Information Service ---
// This service provides informational data about cross-chain bridges
// Users are redirected to external bridge websites to conduct actual transactions

const findBridgeInfo = (bridgeName: string): Bridge => {
  const found = BRIDGES.find(b => b.name.toLowerCase() === bridgeName.toLowerCase());
  if (found) return found;
  return { name: bridgeName, icon: React.createElement(UnknownIcon) };
};

// Mock Stargate Information Aggregation
async function getStargateInfo(fromAmount: number, fromToken: Token, toToken: Token): Promise<Route | null> {
  const isStableSwap = ['USDC', 'USDT'].includes(fromToken.symbol) && ['USDC', 'USDT'].includes(toToken.symbol);
  if (!isStableSwap || fromToken.chain.id === toToken.chain.id) return null;

  console.log(`Getting information from Stargate for ${fromAmount} ${fromToken.symbol} -> ${toToken.symbol}`);
  await new Promise(resolve => setTimeout(resolve, 300));

  const toAmount = fromAmount * 0.998; // Estimated after bridge fees/slippage
  const gasFee = 5.50;

  return {
    bridge: findBridgeInfo('Stargate'),
    rate: toAmount / fromAmount,
    fromAmount: fromAmount.toString(),
    toAmount: toAmount.toFixed(toToken.decimals),
    gasFee: `$${gasFee.toFixed(2)}`,
    serviceFee: '$0.00', // No service fees for informational platform
    estimatedTime: 5,
    aggregator: { id: 'stargate-direct', name: 'Stargate', icon: findBridgeInfo('Stargate').icon, supportedChainIds: new Set() },
    externalUrl: 'https://stargate.finance', // External bridge website
  };
}

// Mock Hop Protocol Information Aggregation
async function getHopInfo(fromAmount: number, fromToken: Token, toToken: Token): Promise<Route | null> {
    const supportedChains = ['ethereum', 'polygon', 'optimism', 'arbitrum'];
    const supportedTokens = ['USDC', 'USDT'];
    if (!supportedChains.includes(fromToken.chain.id) || !supportedChains.includes(toToken.chain.id) || !supportedTokens.includes(fromToken.symbol) || fromToken.chain.id === toToken.chain.id) {
        return null;
    }

    console.log(`Getting information from Hop for ${fromAmount} ${fromToken.symbol} -> ${toToken.symbol}`);
    await new Promise(resolve => setTimeout(resolve, 450));

    const toAmount = fromAmount * 0.999; // Estimated after bridge fees
    const gasFee = 3.20;

    return {
        bridge: findBridgeInfo('Hop'),
        rate: toAmount / fromAmount,
        fromAmount: fromAmount.toString(),
        toAmount: toAmount.toFixed(toToken.decimals),
        gasFee: `$${gasFee.toFixed(2)}`,
        serviceFee: '$0.00', // No service fees
        estimatedTime: 2,
        aggregator: { id: 'hop-direct', name: 'Hop', icon: findBridgeInfo('Hop').icon, supportedChainIds: new Set() },
        externalUrl: 'https://hop.exchange',
    };
}

// Mock Celer cBridge Information Aggregation
async function getCelerInfo(fromAmount: number, fromToken: Token, toToken: Token): Promise<Route | null> {
    if (fromToken.chain.id === toToken.chain.id) return null;

    console.log(`Getting information from Celer for ${fromAmount} ${fromToken.symbol} -> ${toToken.symbol}`);
    await new Promise(resolve => setTimeout(resolve, 600));

    const toAmount = fromAmount * 0.9985;
    const gasFee = 4.00;

    return {
        bridge: findBridgeInfo('Celer'),
        rate: toAmount / fromAmount,
        fromAmount: fromAmount.toString(),
        toAmount: toAmount.toFixed(toToken.decimals),
        gasFee: `$${gasFee.toFixed(2)}`,
        serviceFee: '$0.00', // No service fees
        estimatedTime: 10,
        aggregator: { id: 'celer-direct', name: 'Celer', icon: findBridgeInfo('Celer').icon, supportedChainIds: new Set() },
        externalUrl: 'https://cbridge.celer.network',
    };
}

// --- Main Information Aggregation Function ---
export const getQuotes = async (
  fromAmountStr: string, 
  fromToken: Token, 
  toToken: Token
): Promise<Route[]> => {
  if (!fromAmountStr || parseFloat(fromAmountStr) <= 0) {
    return [];
  }
  
  const fromAmountNumber = parseFloat(fromAmountStr);
  
  console.log(`Aggregating cross-chain bridge information for ${fromAmountNumber} ${fromToken.symbol} -> ${toToken.symbol}`);

  const infoPromises = [
    getStargateInfo(fromAmountNumber, fromToken, toToken),
    getHopInfo(fromAmountNumber, fromToken, toToken),
    getCelerInfo(fromAmountNumber, fromToken, toToken),
  ];

  try {
    const results = await Promise.allSettled(infoPromises);

    const availableRoutes = results
      .filter((result): result is PromiseFulfilledResult<Route> => result.status === 'fulfilled' && result.value !== null)
      .map(result => result.value as Route);

    if (availableRoutes.length === 0) {
        console.log("No bridge information found for this route.");
    }
      
    // Sort by best estimated output for user information
    availableRoutes.sort((a, b) => parseFloat(b.toAmount) - parseFloat(a.toAmount));
    
    return availableRoutes;

  } catch (error: any) {
    console.error(`Failed to aggregate bridge information:`, error.message || error);
    throw new Error(`Failed to get bridge data: ${error.message || 'Data unavailable'}`);
  }
};