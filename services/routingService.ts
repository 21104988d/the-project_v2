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
  const supportedTokens = ['USDC', 'USDT', 'ETH', 'WETH'];
  const isSupported = supportedTokens.includes(fromToken.symbol) && supportedTokens.includes(toToken.symbol);
  if (!isSupported || fromToken.chain.id === toToken.chain.id) return null;

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
    const supportedTokens = ['USDC', 'USDT', 'ETH', 'WETH', 'MATIC'];
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

// Mock Across Protocol Information Aggregation
async function getAcrossInfo(fromAmount: number, fromToken: Token, toToken: Token): Promise<Route | null> {
    const supportedChains = ['ethereum', 'polygon', 'optimism', 'arbitrum', 'base'];
    const supportedTokens = ['USDC', 'USDT', 'ETH', 'WETH'];
    if (!supportedChains.includes(fromToken.chain.id) || !supportedChains.includes(toToken.chain.id) || !supportedTokens.includes(fromToken.symbol) || fromToken.chain.id === toToken.chain.id) {
        return null;
    }

    console.log(`Getting information from Across for ${fromAmount} ${fromToken.symbol} -> ${toToken.symbol}`);
    await new Promise(resolve => setTimeout(resolve, 350));

    const toAmount = fromAmount * 0.9995; // Very competitive rates
    const gasFee = 2.80;

    return {
        bridge: findBridgeInfo('Across'),
        rate: toAmount / fromAmount,
        fromAmount: fromAmount.toString(),
        toAmount: toAmount.toFixed(toToken.decimals),
        gasFee: `$${gasFee.toFixed(2)}`,
        serviceFee: '$0.00',
        estimatedTime: 3,
        aggregator: { id: 'across-direct', name: 'Across', icon: findBridgeInfo('Across').icon, supportedChainIds: new Set() },
        externalUrl: 'https://across.to',
    };
}

// Mock Wormhole Information Aggregation
async function getWormholeInfo(fromAmount: number, fromToken: Token, toToken: Token): Promise<Route | null> {
    // Wormhole supports more diverse chains including Solana
    const supportedTokens = ['USDC', 'USDT', 'ETH', 'WETH', 'SOL', 'WBTC'];
    if (!supportedTokens.includes(fromToken.symbol) || fromToken.chain.id === toToken.chain.id) {
        return null;
    }

    console.log(`Getting information from Wormhole for ${fromAmount} ${fromToken.symbol} -> ${toToken.symbol}`);
    await new Promise(resolve => setTimeout(resolve, 500));

    const toAmount = fromAmount * 0.997; // Slightly higher fees for cross-ecosystem
    const gasFee = 8.50;

    return {
        bridge: findBridgeInfo('Wormhole'),
        rate: toAmount / fromAmount,
        fromAmount: fromAmount.toString(),
        toAmount: toAmount.toFixed(toToken.decimals),
        gasFee: `$${gasFee.toFixed(2)}`,
        serviceFee: '$0.00',
        estimatedTime: 15,
        aggregator: { id: 'wormhole-direct', name: 'Wormhole', icon: findBridgeInfo('Wormhole').icon, supportedChainIds: new Set() },
        externalUrl: 'https://portalbridge.com',
    };
}

// Mock Synapse Protocol Information Aggregation
async function getSynapseInfo(fromAmount: number, fromToken: Token, toToken: Token): Promise<Route | null> {
    const supportedChains = ['ethereum', 'bsc', 'avalanche', 'arbitrum', 'polygon'];
    const supportedTokens = ['USDC', 'USDT', 'ETH', 'WETH', 'BNB', 'AVAX'];
    if (!supportedChains.includes(fromToken.chain.id) || !supportedChains.includes(toToken.chain.id) || !supportedTokens.includes(fromToken.symbol) || fromToken.chain.id === toToken.chain.id) {
        return null;
    }

    console.log(`Getting information from Synapse for ${fromAmount} ${fromToken.symbol} -> ${toToken.symbol}`);
    await new Promise(resolve => setTimeout(resolve, 400));

    const toAmount = fromAmount * 0.9975;
    const gasFee = 6.20;

    return {
        bridge: findBridgeInfo('Synapse'),
        rate: toAmount / fromAmount,
        fromAmount: fromAmount.toString(),
        toAmount: toAmount.toFixed(toToken.decimals),
        gasFee: `$${gasFee.toFixed(2)}`,
        serviceFee: '$0.00',
        estimatedTime: 8,
        aggregator: { id: 'synapse-direct', name: 'Synapse', icon: findBridgeInfo('Synapse').icon, supportedChainIds: new Set() },
        externalUrl: 'https://synapseprotocol.com',
    };
}

// Mock CCTP (Circle) Information Aggregation - for USDC only
async function getCCTPInfo(fromAmount: number, fromToken: Token, toToken: Token): Promise<Route | null> {
    const supportedChains = ['ethereum', 'arbitrum', 'optimism', 'polygon', 'avalanche', 'base'];
    if (!supportedChains.includes(fromToken.chain.id) || !supportedChains.includes(toToken.chain.id) || fromToken.symbol !== 'USDC' || toToken.symbol !== 'USDC' || fromToken.chain.id === toToken.chain.id) {
        return null;
    }

    console.log(`Getting information from CCTP for ${fromAmount} ${fromToken.symbol} -> ${toToken.symbol}`);
    await new Promise(resolve => setTimeout(resolve, 250));

    const toAmount = fromAmount * 1.0; // Native USDC, no slippage
    const gasFee = 4.50;

    return {
        bridge: findBridgeInfo('CCTP'),
        rate: toAmount / fromAmount,
        fromAmount: fromAmount.toString(),
        toAmount: toAmount.toFixed(toToken.decimals),
        gasFee: `$${gasFee.toFixed(2)}`,
        serviceFee: '$0.00',
        estimatedTime: 4,
        aggregator: { id: 'cctp-direct', name: 'CCTP', icon: findBridgeInfo('CCTP').icon, supportedChainIds: new Set() },
        externalUrl: 'https://www.centre.io/usdc-multichain',
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
    getAcrossInfo(fromAmountNumber, fromToken, toToken),
    getWormholeInfo(fromAmountNumber, fromToken, toToken),
    getSynapseInfo(fromAmountNumber, fromToken, toToken),
    getCCTPInfo(fromAmountNumber, fromToken, toToken),
    // Phase 1: Critical Missing Bridges
    getPortalBridgeInfo(fromAmountNumber, fromToken, toToken),
    getPolygonBridgeInfo(fromAmountNumber, fromToken, toToken),
    getOptimismBridgeInfo(fromAmountNumber, fromToken, toToken),
    getAvalancheBridgeInfo(fromAmountNumber, fromToken, toToken),
    // Phase 2: Growing Volume Bridges
    getRouterProtocolInfo(fromAmountNumber, fromToken, toToken),
    getLiFiInfo(fromAmountNumber, fromToken, toToken),
    getOrbiterFinanceInfo(fromAmountNumber, fromToken, toToken),
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

// ===========================================
// PHASE 1: CRITICAL MISSING BRIDGES
// ===========================================

// Mock Portal Bridge Information (Solana-focused)
async function getPortalBridgeInfo(fromAmount: number, fromToken: Token, toToken: Token): Promise<Route | null> {
  const supportedTokens = ['USDC', 'USDT', 'SOL', 'ETH'];
  const solanaChains = ['solana'];
  
  const isSolanaRoute = solanaChains.includes(fromToken.chain.id) || solanaChains.includes(toToken.chain.id);
  const isSupported = supportedTokens.includes(fromToken.symbol) && supportedTokens.includes(toToken.symbol) && isSolanaRoute;
  
  if (!isSupported || fromToken.chain.id === toToken.chain.id) return null;

  console.log(`Getting information from Portal Bridge for ${fromAmount} ${fromToken.symbol} -> ${toToken.symbol}`);
  await new Promise(resolve => setTimeout(resolve, 400));

  const toAmount = fromAmount * 0.997; // Portal Bridge fees
  const gasFee = 3.20;

  return {
    bridge: findBridgeInfo('Portal Bridge'),
    rate: toAmount / fromAmount,
    fromAmount: fromAmount.toString(),
    toAmount: toAmount.toFixed(toToken.decimals),
    gasFee: `$${gasFee.toFixed(2)}`,
    serviceFee: '$0.00',
    estimatedTime: 8,
    aggregator: { id: 'portal-bridge', name: 'Portal Bridge', icon: findBridgeInfo('Portal Bridge').icon, supportedChainIds: new Set() },
    externalUrl: 'https://portalbridge.com',
  };
}

// Mock Polygon Bridge Information (Official)
async function getPolygonBridgeInfo(fromAmount: number, fromToken: Token, toToken: Token): Promise<Route | null> {
  const supportedTokens = ['USDC', 'USDT', 'ETH', 'WETH', 'MATIC'];
  const polygonRoute = (fromToken.chain.id === 'ethereum' && toToken.chain.id === 'polygon') ||
                      (fromToken.chain.id === 'polygon' && toToken.chain.id === 'ethereum');
  
  if (!polygonRoute || !supportedTokens.includes(fromToken.symbol) || fromToken.chain.id === toToken.chain.id) return null;

  console.log(`Getting information from Polygon Bridge for ${fromAmount} ${fromToken.symbol} -> ${toToken.symbol}`);
  await new Promise(resolve => setTimeout(resolve, 350));

  const toAmount = fromAmount * 0.999; // Minimal fees for official bridge
  const gasFee = fromToken.chain.id === 'ethereum' ? 8.50 : 0.02; // Higher for Ethereum deposits

  return {
    bridge: findBridgeInfo('Polygon Bridge'),
    rate: toAmount / fromAmount,
    fromAmount: fromAmount.toString(),
    toAmount: toAmount.toFixed(toToken.decimals),
    gasFee: `$${gasFee.toFixed(2)}`,
    serviceFee: '$0.00',
    estimatedTime: fromToken.chain.id === 'ethereum' ? 7 : 180, // 7 min deposits, 3 hours withdrawals
    aggregator: { id: 'polygon-bridge', name: 'Polygon Bridge', icon: findBridgeInfo('Polygon Bridge').icon, supportedChainIds: new Set() },
    externalUrl: 'https://wallet.polygon.technology/polygon/bridge',
  };
}

// Mock Optimism Bridge Information (Official)
async function getOptimismBridgeInfo(fromAmount: number, fromToken: Token, toToken: Token): Promise<Route | null> {
  const supportedTokens = ['USDC', 'USDT', 'ETH', 'WETH'];
  const optimismRoute = (fromToken.chain.id === 'ethereum' && toToken.chain.id === 'optimism') ||
                       (fromToken.chain.id === 'optimism' && toToken.chain.id === 'ethereum');
  
  if (!optimismRoute || !supportedTokens.includes(fromToken.symbol) || fromToken.chain.id === toToken.chain.id) return null;

  console.log(`Getting information from Optimism Bridge for ${fromAmount} ${fromToken.symbol} -> ${toToken.symbol}`);
  await new Promise(resolve => setTimeout(resolve, 320));

  const toAmount = fromAmount * 0.999; // Minimal fees for official bridge
  const gasFee = fromToken.chain.id === 'ethereum' ? 7.20 : 0.03;

  return {
    bridge: findBridgeInfo('Optimism Bridge'),
    rate: toAmount / fromAmount,
    fromAmount: fromAmount.toString(),
    toAmount: toAmount.toFixed(toToken.decimals),
    gasFee: `$${gasFee.toFixed(2)}`,
    serviceFee: '$0.00',
    estimatedTime: fromToken.chain.id === 'ethereum' ? 1 : 10080, // Instant deposits, 7-day withdrawals
    aggregator: { id: 'optimism-bridge', name: 'Optimism Bridge', icon: findBridgeInfo('Optimism Bridge').icon, supportedChainIds: new Set() },
    externalUrl: 'https://app.optimism.io/bridge',
  };
}

// Mock Avalanche Bridge Information (Official)
async function getAvalancheBridgeInfo(fromAmount: number, fromToken: Token, toToken: Token): Promise<Route | null> {
  const supportedTokens = ['USDC', 'USDT', 'ETH', 'WETH', 'AVAX'];
  const avalancheRoute = (fromToken.chain.id === 'ethereum' && toToken.chain.id === 'avalanche') ||
                        (fromToken.chain.id === 'avalanche' && toToken.chain.id === 'ethereum');
  
  if (!avalancheRoute || !supportedTokens.includes(fromToken.symbol) || fromToken.chain.id === toToken.chain.id) return null;

  console.log(`Getting information from Avalanche Bridge for ${fromAmount} ${fromToken.symbol} -> ${toToken.symbol}`);
  await new Promise(resolve => setTimeout(resolve, 380));

  const toAmount = fromAmount * 0.998; // Small bridge fees
  const gasFee = 4.80;

  return {
    bridge: findBridgeInfo('Avalanche Bridge'),
    rate: toAmount / fromAmount,
    fromAmount: fromAmount.toString(),
    toAmount: toAmount.toFixed(toToken.decimals),
    gasFee: `$${gasFee.toFixed(2)}`,
    serviceFee: '$0.00',
    estimatedTime: 15,
    aggregator: { id: 'avalanche-bridge', name: 'Avalanche Bridge', icon: findBridgeInfo('Avalanche Bridge').icon, supportedChainIds: new Set() },
    externalUrl: 'https://core.app/bridge',
  };
}

// ===========================================
// PHASE 2: GROWING VOLUME BRIDGES
// ===========================================

// Mock Router Protocol Information (Intent-based)
async function getRouterProtocolInfo(fromAmount: number, fromToken: Token, toToken: Token): Promise<Route | null> {
  const supportedTokens = ['USDC', 'USDT', 'ETH', 'WETH'];
  const supportedChains = ['ethereum', 'polygon', 'arbitrum', 'optimism', 'bsc', 'avalanche'];
  
  const isSupported = supportedTokens.includes(fromToken.symbol) && supportedTokens.includes(toToken.symbol) &&
                     supportedChains.includes(fromToken.chain.id) && supportedChains.includes(toToken.chain.id);
  
  if (!isSupported || fromToken.chain.id === toToken.chain.id) return null;

  console.log(`Getting information from Router Protocol for ${fromAmount} ${fromToken.symbol} -> ${toToken.symbol}`);
  await new Promise(resolve => setTimeout(resolve, 420));

  const toAmount = fromAmount * 0.9975; // Intent-based optimization
  const gasFee = 4.10;

  return {
    bridge: findBridgeInfo('Router Protocol'),
    rate: toAmount / fromAmount,
    fromAmount: fromAmount.toString(),
    toAmount: toAmount.toFixed(toToken.decimals),
    gasFee: `$${gasFee.toFixed(2)}`,
    serviceFee: '$0.00',
    estimatedTime: 6,
    aggregator: { id: 'router-protocol', name: 'Router Protocol', icon: findBridgeInfo('Router Protocol').icon, supportedChainIds: new Set() },
    externalUrl: 'https://app.routerprotocol.com',
  };
}

// Mock Li.Fi Information (Aggregator)
async function getLiFiInfo(fromAmount: number, fromToken: Token, toToken: Token): Promise<Route | null> {
  const supportedTokens = ['USDC', 'USDT', 'ETH', 'WETH'];
  const supportedChains = ['ethereum', 'polygon', 'arbitrum', 'optimism', 'bsc', 'avalanche'];
  
  const isSupported = supportedTokens.includes(fromToken.symbol) && supportedTokens.includes(toToken.symbol) &&
                     supportedChains.includes(fromToken.chain.id) && supportedChains.includes(toToken.chain.id);
  
  if (!isSupported || fromToken.chain.id === toToken.chain.id) return null;

  console.log(`Getting information from Li.Fi for ${fromAmount} ${fromToken.symbol} -> ${toToken.symbol}`);
  await new Promise(resolve => setTimeout(resolve, 460));

  const toAmount = fromAmount * 0.9972; // Aggregator optimization
  const gasFee = 5.60;

  return {
    bridge: findBridgeInfo('Li.Fi'),
    rate: toAmount / fromAmount,
    fromAmount: fromAmount.toString(),
    toAmount: toAmount.toFixed(toToken.decimals),
    gasFee: `$${gasFee.toFixed(2)}`,
    serviceFee: '$0.00',
    estimatedTime: 8,
    aggregator: { id: 'lifi', name: 'Li.Fi', icon: findBridgeInfo('Li.Fi').icon, supportedChainIds: new Set() },
    externalUrl: 'https://li.fi',
  };
}

// Mock Orbiter Finance Information (L2 specialist)
async function getOrbiterFinanceInfo(fromAmount: number, fromToken: Token, toToken: Token): Promise<Route | null> {
  const supportedTokens = ['USDC', 'USDT', 'ETH'];
  const l2Chains = ['arbitrum', 'optimism', 'polygon', 'base', 'zksync'];
  
  const isL2Route = l2Chains.includes(fromToken.chain.id) && l2Chains.includes(toToken.chain.id);
  const isSupported = supportedTokens.includes(fromToken.symbol) && supportedTokens.includes(toToken.symbol) && isL2Route;
  
  if (!isSupported || fromToken.chain.id === toToken.chain.id) return null;

  console.log(`Getting information from Orbiter Finance for ${fromAmount} ${fromToken.symbol} -> ${toToken.symbol}`);
  await new Promise(resolve => setTimeout(resolve, 290));

  const toAmount = fromAmount * 0.9985; // Fast L2 transfers
  const gasFee = 1.20;

  return {
    bridge: findBridgeInfo('Orbiter Finance'),
    rate: toAmount / fromAmount,
    fromAmount: fromAmount.toString(),
    toAmount: toAmount.toFixed(toToken.decimals),
    gasFee: `$${gasFee.toFixed(2)}`,
    serviceFee: '$0.00',
    estimatedTime: 3,
    aggregator: { id: 'orbiter-finance', name: 'Orbiter Finance', icon: findBridgeInfo('Orbiter Finance').icon, supportedChainIds: new Set() },
    externalUrl: 'https://www.orbiter.finance',
  };
}