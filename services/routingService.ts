import React from 'react';
import type { Route, Token, Bridge, WalletStandard } from '../types';
import { BRIDGES } from '../constants';
import { UnknownIcon } from '../components/Icons';
import { FEE_MANAGER_CONTRACT_ADDRESSES, SERVICE_FEE_BPS } from '../config';

// --- Direct Bridge Integration Stubs ---
// These mock functions simulate fetching quotes from actual bridge APIs.
// They now accept a `feeCollectorAddress` to demonstrate how fees would be
// handled in a direct integration scenario.

const findBridgeInfo = (bridgeName: string): Bridge => {
  const found = BRIDGES.find(b => b.name.toLowerCase() === bridgeName.toLowerCase());
  if (found) return found;
  return { name: bridgeName, icon: React.createElement(UnknownIcon) };
};

// A helper to calculate the service fee.
// Returns 0 if no feeCollectorAddress is provided for the transaction.
const calculateServiceFee = (amount: number, feeBps: number, feeCollectorAddress?: string): number => {
  if (!feeCollectorAddress || feeBps <= 0) {
    return 0;
  }
  return amount * feeBps / 10000;
};


// Mock Stargate Integration
async function getStargateQuote(fromAmount: number, fromToken: Token, toToken: Token, feeCollectorAddress?: string): Promise<Route | null> {
  const isStableSwap = ['USDC', 'USDT'].includes(fromToken.symbol) && ['USDC', 'USDT'].includes(toToken.symbol);
  if (!isStableSwap || fromToken.chain.id === toToken.chain.id) return null;

  console.log(`Getting quote from Stargate for ${fromAmount} ${fromToken.symbol} -> ${toToken.symbol}`);
  await new Promise(resolve => setTimeout(resolve, 300));

  const serviceFee = calculateServiceFee(fromAmount, SERVICE_FEE_BPS, feeCollectorAddress);
  const toAmount = fromAmount * 0.998 - serviceFee; // 0.2% bridge fee/slippage
  const gasFee = 5.50;

  return {
    bridge: findBridgeInfo('Stargate'),
    rate: toAmount / fromAmount,
    fromAmount: fromAmount.toString(),
    toAmount: toAmount.toFixed(toToken.decimals),
    gasFee: `$${gasFee.toFixed(2)}`,
    serviceFee: `$${serviceFee.toFixed(2)}`,
    estimatedTime: 5,
    aggregator: { id: 'stargate-direct', name: 'Stargate', icon: findBridgeInfo('Stargate').icon, supportedChainIds: new Set() },
  };
}

// Mock Hop Protocol Integration
async function getHopQuote(fromAmount: number, fromToken: Token, toToken: Token, feeCollectorAddress?: string): Promise<Route | null> {
    const supportedChains = ['ethereum', 'polygon', 'optimism', 'arbitrum'];
    const supportedTokens = ['USDC', 'USDT'];
    if (!supportedChains.includes(fromToken.chain.id) || !supportedChains.includes(toToken.chain.id) || !supportedTokens.includes(fromToken.symbol) || fromToken.chain.id === toToken.chain.id) {
        return null;
    }

    console.log(`Getting quote from Hop for ${fromAmount} ${fromToken.symbol} -> ${toToken.symbol}`);
    await new Promise(resolve => setTimeout(resolve, 450));

    const serviceFee = calculateServiceFee(fromAmount, SERVICE_FEE_BPS, feeCollectorAddress);
    const toAmount = fromAmount * 0.999 - serviceFee; // Lower bridge fee
    const gasFee = 3.20;

    return {
        bridge: findBridgeInfo('Hop'),
        rate: toAmount / fromAmount,
        fromAmount: fromAmount.toString(),
        toAmount: toAmount.toFixed(toToken.decimals),
        gasFee: `$${gasFee.toFixed(2)}`,
        serviceFee: `$${serviceFee.toFixed(2)}`,
        estimatedTime: 2,
        aggregator: { id: 'hop-direct', name: 'Hop', icon: findBridgeInfo('Hop').icon, supportedChainIds: new Set() },
    };
}

// Mock Celer cBridge Integration
async function getCelerQuote(fromAmount: number, fromToken: Token, toToken: Token, feeCollectorAddress?: string): Promise<Route | null> {
    if (fromToken.chain.id === toToken.chain.id) return null;

    console.log(`Getting quote from Celer for ${fromAmount} ${fromToken.symbol} -> ${toToken.symbol}`);
    await new Promise(resolve => setTimeout(resolve, 600));

    const serviceFee = calculateServiceFee(fromAmount, SERVICE_FEE_BPS, feeCollectorAddress);
    const toAmount = fromAmount * 0.9985 - serviceFee;
    const gasFee = 4.00;

    return {
        bridge: findBridgeInfo('Celer'),
        rate: toAmount / fromAmount,
        fromAmount: fromAmount.toString(),
        toAmount: toAmount.toFixed(toToken.decimals),
        gasFee: `$${gasFee.toFixed(2)}`,
        serviceFee: `$${serviceFee.toFixed(2)}`,
        estimatedTime: 10,
        aggregator: { id: 'celer-direct', name: 'Celer', icon: findBridgeInfo('Celer').icon, supportedChainIds: new Set() },
    };
}


// --- Main Orchestrator Function ---
export const getQuotes = async (
  fromAmountStr: string, 
  fromToken: Token, 
  toToken: Token
): Promise<Route[]> => {
  if (!fromAmountStr || parseFloat(fromAmountStr) <= 0) {
    return [];
  }
  
  const fromAmountNumber = parseFloat(fromAmountStr);
  
  // Determine the correct fee collector address based on the DESTINATION chain's standard.
  const feeStandard = toToken.chain.walletStandard;
  const feeCollectorAddress = FEE_MANAGER_CONTRACT_ADDRESSES[feeStandard];

  if (feeCollectorAddress) {
    console.log(`Using fee address for ${feeStandard}: ${feeCollectorAddress}`);
  } else {
    console.log(`No fee address configured for ${feeStandard} chain standard. Service fees will be disabled for this route.`);
  }

  const quotePromises = [
    getStargateQuote(fromAmountNumber, fromToken, toToken, feeCollectorAddress),
    getHopQuote(fromAmountNumber, fromToken, toToken, feeCollectorAddress),
    getCelerQuote(fromAmountNumber, fromToken, toToken, feeCollectorAddress),
  ];

  try {
    const results = await Promise.allSettled(quotePromises);

    const successfulQuotes = results
      .filter((result): result is PromiseFulfilledResult<Route> => result.status === 'fulfilled' && result.value !== null)
      .map(result => result.value as Route);

    if (successfulQuotes.length === 0) {
        console.log("No valid routes found from any direct integration.");
    }
      
    successfulQuotes.sort((a, b) => parseFloat(b.toAmount) - parseFloat(a.toAmount));
    
    return successfulQuotes;

  } catch (error: any) {
    console.error(`Failed to get quotes from one or more bridges:`, error.message || error);
    throw new Error(`Failed to get quotes: ${error.message || 'Load failed'}`);
  }
};