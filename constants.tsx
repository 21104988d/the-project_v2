import React from 'react';
import type { Chain, Token, Bridge, Aggregator, WalletProvider } from './types';
import { 
  EthereumIcon, 
  ArbitrumIcon, 
  PolygonIcon,
  OptimismIcon,
  BscIcon,
  AvalancheIcon,
  SolanaIcon,
  TronIcon,
  SuiIcon,
  NearIcon,
  CroIcon,
  BaseIcon,
  GnosisIcon,
  FantomIcon,
  PolygonZkEvmIcon,
  ZkSyncIcon,
  LineaIcon,
  UsdtIcon, 
  UsdcIcon,
  StargateIcon,
  SynapseIcon,
  WormholeIcon,
  RelayIcon,
  SocketIcon,
  CCTPIcon,
  CelerIcon,
  MayanIcon,
  AcrossIcon,
  HopIcon,
  HyphenIcon,
  ConnextIcon,
  DebridgeIcon,
  BaseBridgeIcon,
  MetaMaskIcon,
  CoinbaseWalletIcon,
  PhantomIcon,
  SolflareIcon,
  TronLinkIcon,
  SuietIcon,
  SuiWalletIcon,
  NearWalletIcon,
  OkxWalletIcon,
  CryptoComWalletIcon,
  BinanceWalletIcon,
} from './components/Icons';

// --- START: AGGREGATOR DEFINITIONS ---
// This constant is kept for type-safety in the Route object but is no longer used for routing logic.
const SOCKET_SUPPORTED_CHAIN_IDS = new Set([137, 1, 100, 42161, 250, 10, 43114, 56, 1313161554, 1101, 324, 7777777, 8453, 59144, 5000, 534352, 81457, 34443, 57073, 89999, 146, 2741, 8333, 130, 80094, 480, 101, 728126428, 201, 202]);

export const AGGREGATORS: Aggregator[] = [
  {
    id: 'socket',
    name: 'Socket',
    icon: <SocketIcon />,
    supportedChainIds: SOCKET_SUPPORTED_CHAIN_IDS,
  },
];
// --- END: AGGREGATOR DEFINITIONS ---

// --- START: WALLET PROVIDER DEFINITIONS ---
export const WALLET_PROVIDERS: WalletProvider[] = [
  // EVM
  { id: 'metamask', name: 'MetaMask', icon: <MetaMaskIcon />, standard: 'evm' },
  { id: 'coinbase', name: 'Coinbase Wallet', icon: <CoinbaseWalletIcon />, standard: 'evm' },
  { id: 'okxwallet', name: 'OKX Wallet', icon: <OkxWalletIcon />, standard: 'evm' },
  { id: 'cryptocom', name: 'Crypto.com DeFi Wallet', icon: <CryptoComWalletIcon />, standard: 'evm' },
  { id: 'binancewallet', name: 'Binance Web3 Wallet', icon: <BinanceWalletIcon />, standard: 'evm' },
  // Solana
  { id: 'phantom', name: 'Phantom', icon: <PhantomIcon />, standard: 'solana' },
  { id: 'solflare', name: 'Solflare', icon: <SolflareIcon />, standard: 'solana' },
  // Tron
  { id: 'tronlink', name: 'TronLink', icon: <TronLinkIcon />, standard: 'tron' },
  // Sui
  { id: 'suiet', name: 'Suiet', icon: <SuietIcon />, standard: 'sui' },
  { id: 'suiwallet', name: 'Sui Wallet', icon: <SuiWalletIcon />, standard: 'sui' },
  // NEAR
  { id: 'nearwallet', name: 'NEAR Wallet', icon: <NearWalletIcon />, standard: 'near' },
];
// --- END: WALLET PROVIDER DEFINITIONS ---


// Define raw chains first, without support status
const RAW_CHAINS: Omit<Chain, 'isSupported'>[] = [
  { id: 'ethereum', name: 'Ethereum', icon: <EthereumIcon />, walletStandard: 'evm', blockExplorerUrl: 'https://etherscan.io', blockExplorerTxPath: '/tx/', socketChainId: 1 },
  { id: 'arbitrum', name: 'Arbitrum', icon: <ArbitrumIcon />, walletStandard: 'evm', blockExplorerUrl: 'https://arbiscan.io', blockExplorerTxPath: '/tx/', socketChainId: 42161 },
  { id: 'polygon', name: 'Polygon', icon: <PolygonIcon />, walletStandard: 'evm', blockExplorerUrl: 'https://polygonscan.com', blockExplorerTxPath: '/tx/', socketChainId: 137 },
  { id: 'optimism', name: 'Optimism', icon: <OptimismIcon />, walletStandard: 'evm', blockExplorerUrl: 'https://optimistic.etherscan.io', blockExplorerTxPath: '/tx/', socketChainId: 10 },
  { id: 'bsc', name: 'BNB Smart Chain', icon: <BscIcon />, walletStandard: 'evm', blockExplorerUrl: 'https://bscscan.com', blockExplorerTxPath: '/tx/', socketChainId: 56 },
  { id: 'avalanche', name: 'Avalanche', icon: <AvalancheIcon />, walletStandard: 'evm', blockExplorerUrl: 'https://snowtrace.io', blockExplorerTxPath: '/tx/', socketChainId: 43114 },
  { id: 'solana', name: 'Solana', icon: <SolanaIcon />, walletStandard: 'solana', blockExplorerUrl: 'https://solscan.io', blockExplorerTxPath: '/tx/', socketChainId: 101 },
  { id: 'tron', name: 'Tron', icon: <TronIcon />, walletStandard: 'tron', blockExplorerUrl: 'https://tronscan.org', blockExplorerTxPath: '/#/transaction/', socketChainId: 728126428 },
  { id: 'sui', name: 'Sui', icon: <SuiIcon />, walletStandard: 'sui', blockExplorerUrl: 'https://suiscan.xyz', blockExplorerTxPath: '/tx/', socketChainId: 201 },
  { id: 'near', name: 'NEAR Protocol', icon: <NearIcon />, walletStandard: 'near', blockExplorerUrl: 'https://nearblocks.io', blockExplorerTxPath: '/txns/', socketChainId: 202 },
  { id: 'cronos', name: 'Cronos', icon: <CroIcon />, walletStandard: 'evm', blockExplorerUrl: 'https://cronoscan.com', blockExplorerTxPath: '/tx/', socketChainId: 25 },
  { id: 'base', name: 'Base', icon: <BaseIcon />, walletStandard: 'evm', blockExplorerUrl: 'https://basescan.org', blockExplorerTxPath: '/tx/', socketChainId: 8453 },
  { id: 'gnosis', name: 'Gnosis', icon: <GnosisIcon />, walletStandard: 'evm', blockExplorerUrl: 'https://gnosisscan.io', blockExplorerTxPath: '/tx/', socketChainId: 100 },
  { id: 'fantom', name: 'Fantom', icon: <FantomIcon />, walletStandard: 'evm', blockExplorerUrl: 'https://ftmscan.com', blockExplorerTxPath: '/tx/', socketChainId: 250 },
  { id: 'polygon-zkevm', name: 'Polygon zkEVM', icon: <PolygonZkEvmIcon />, walletStandard: 'evm', blockExplorerUrl: 'https://zkevm.polygonscan.com', blockExplorerTxPath: '/tx/', socketChainId: 1101 },
  { id: 'zksync', name: 'zkSync Era', icon: <ZkSyncIcon />, walletStandard: 'evm', blockExplorerUrl: 'https://explorer.zksync.io', blockExplorerTxPath: '/tx/', socketChainId: 324 },
  { id: 'linea', name: 'Linea', icon: <LineaIcon />, walletStandard: 'evm', blockExplorerUrl: 'https://lineascan.build', blockExplorerTxPath: '/tx/', socketChainId: 59144 },
];

export const CHAINS: Chain[] = RAW_CHAINS.map(chain => ({
  ...chain,
  // Since we are moving to a direct-integration model, we assume all defined chains
  // are supported targets for our service. This removes the misleading "Swaps unavailable"
  // message that was tied to the old aggregator logic.
  isSupported: true
}));


export const BRIDGES: Bridge[] = [
  { name: 'Stargate', icon: <StargateIcon /> },
  { name: 'Synapse', icon: <SynapseIcon /> },
  { name: 'Wormhole', icon: <WormholeIcon /> },
  { name: 'Relay', icon: <RelayIcon /> },
  { name: 'Arbitrum', icon: <ArbitrumIcon /> },
  { name: 'CCTP', icon: <CCTPIcon /> },
  { name: 'Celer', icon: <CelerIcon /> },
  { name: 'Mayan', icon: <MayanIcon /> },
  { name: 'Across', icon: <AcrossIcon /> },
  { name: 'Hop', icon: <HopIcon /> },
  { name: 'Hyphen', icon: <HyphenIcon /> },
  { name: 'Connext', icon: <ConnextIcon /> },
  { name: 'deBridge', icon: <DebridgeIcon /> },
  { name: 'Base Bridge', icon: <BaseBridgeIcon /> },
];

export const TOKENS: Token[] = [
  // Ethereum (Chain index 0)
  {
    id: 'usdt-ethereum',
    symbol: 'USDT',
    name: 'Tether',
    chain: CHAINS[0],
    icon: <UsdtIcon />,
    decimals: 6,
    contractAddress: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
  },
  {
    id: 'usdc-ethereum',
    symbol: 'USDC',
    name: 'USD Coin',
    chain: CHAINS[0],
    icon: <UsdcIcon />,
    decimals: 6,
    contractAddress: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
  },
  // Arbitrum (Chain index 1)
  {
    id: 'usdt-arbitrum',
    symbol: 'USDT',
    name: 'Tether',
    chain: CHAINS[1],
    icon: <UsdtIcon />,
    decimals: 6,
    contractAddress: '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9',
  },
  {
    id: 'usdc-arbitrum',
    symbol: 'USDC',
    name: 'USD Coin',
    chain: CHAINS[1],
    icon: <UsdcIcon />,
    decimals: 6,
    contractAddress: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
  },
  // Polygon (Chain index 2)
  {
    id: 'usdt-polygon',
    symbol: 'USDT',
    name: 'Tether',
    chain: CHAINS[2],
    icon: <UsdtIcon />,
    decimals: 6,
    contractAddress: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
  },
  {
    id: 'usdc-polygon',
    symbol: 'USDC',
    name: 'USD Coin',
    chain: CHAINS[2],
    icon: <UsdcIcon />,
    decimals: 6,
    contractAddress: '0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359',
  },
  // Optimism (Chain index 3)
  {
    id: 'usdt-optimism',
    symbol: 'USDT',
    name: 'Tether',
    chain: CHAINS[3],
    icon: <UsdtIcon />,
    decimals: 6,
    contractAddress: '0x94b008aA00579c1307B0EF2c499aD98a8CE58e58',
  },
  {
    id: 'usdc-optimism',
    symbol: 'USDC',
    name: 'USD Coin',
    chain: CHAINS[3],
    icon: <UsdcIcon />,
    decimals: 6,
    contractAddress: '0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85',
  },
  // BNB Smart Chain (Chain index 4)
  {
    id: 'usdt-bsc',
    symbol: 'USDT',
    name: 'Tether',
    chain: CHAINS[4],
    icon: <UsdtIcon />,
    decimals: 18,
    contractAddress: '0x55d398326f99059fF775485246999027B3197955',
  },
  {
    id: 'usdc-bsc',
    symbol: 'USDC',
    name: 'USD Coin',
    chain: CHAINS[4],
    icon: <UsdcIcon />,
    decimals: 18,
    contractAddress: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
  },
  // Avalanche (Chain index 5)
  {
    id: 'usdt-avalanche',
    symbol: 'USDT',
    name: 'Tether',
    chain: CHAINS[5],
    icon: <UsdtIcon />,
    decimals: 6,
    contractAddress: '0x9702230A8Ea53601f5E2252422904b26e46624aE',
  },
  {
    id: 'usdc-avalanche',
    symbol: 'USDC',
    name: 'USD Coin',
    chain: CHAINS[5],
    icon: <UsdcIcon />,
    decimals: 6,
    contractAddress: '0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E',
  },
  // Solana (Chain index 6)
  {
    id: 'usdt-solana',
    symbol: 'USDT',
    name: 'Tether',
    chain: CHAINS[6],
    icon: <UsdtIcon />,
    decimals: 6,
    contractAddress: 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB',
  },
  {
    id: 'usdc-solana',
    symbol: 'USDC',
    name: 'USD Coin',
    chain: CHAINS[6],
    icon: <UsdcIcon />,
    decimals: 6,
    contractAddress: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
  },
  // Tron (Chain index 7)
  {
    id: 'usdt-tron',
    symbol: 'USDT',
    name: 'Tether',
    chain: CHAINS[7],
    icon: <UsdtIcon />,
    decimals: 6,
    contractAddress: 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t',
  },
  {
    id: 'usdc-tron',
    symbol: 'USDC',
    name: 'USD Coin',
    chain: CHAINS[7],
    icon: <UsdcIcon />,
    decimals: 6,
    contractAddress: 'TEkxiTehnzSmSe2XqrBj4w32RUN966rdz8',
  },
  // Sui (Chain index 8)
  {
    id: 'usdt-sui',
    symbol: 'USDT',
    name: 'Tether',
    chain: CHAINS[8],
    icon: <UsdtIcon />,
    decimals: 6,
    contractAddress: '0xc060006111016b8a020ad5b33834984a437aaa7d3c74c18e09a95d48aceab08c',
  },
  {
    id: 'usdc-sui',
    symbol: 'USDC',
    name: 'USD Coin',
    chain: CHAINS[8],
    icon: <UsdcIcon />,
    decimals: 6,
    contractAddress: '0x5d4b302506645c37ff133b98c4b50a5ae14841659738d6d733d59d0d2177a1ba',
  },
  // NEAR (Chain index 9)
  {
    id: 'usdt-near',
    symbol: 'USDT',
    name: 'Tether',
    chain: CHAINS[9],
    icon: <UsdtIcon />,
    decimals: 6,
    contractAddress: 'usdt.tether-token.near',
  },
  {
    id: 'usdc-near',
    symbol: 'USDC',
    name: 'USD Coin',
    chain: CHAINS[9],
    icon: <UsdcIcon />,
    decimals: 6,
    contractAddress: 'usdc.wormhole.near',
  },
  // Cronos (Chain index 10)
  {
    id: 'usdt-cronos',
    symbol: 'USDT',
    name: 'Tether',
    chain: CHAINS[10],
    icon: <UsdtIcon />,
    decimals: 6,
    contractAddress: '0x66e428c3f67a68878562e79A0234c1F83c208770',
  },
  {
    id: 'usdc-cronos',
    symbol: 'USDC',
    name: 'USD Coin',
    chain: CHAINS[10],
    icon: <UsdcIcon />,
    decimals: 6,
    contractAddress: '0xc21223249CA28397B4B651180d9e48052f83B10',
  },
  // Base (Chain index 11)
  {
    id: 'usdt-base',
    symbol: 'USDT',
    name: 'Tether',
    chain: CHAINS[11],
    icon: <UsdtIcon />,
    decimals: 6,
    contractAddress: '0xd9aAEc86B65D86f6A7B5B1b0c42FFA531710b6CA',
  },
  {
    id: 'usdc-base',
    symbol: 'USDC',
    name: 'USD Coin',
    chain: CHAINS[11],
    icon: <UsdcIcon />,
    decimals: 6,
    contractAddress: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
  },
  // Gnosis (Chain index 12)
  {
    id: 'usdt-gnosis',
    symbol: 'USDT',
    name: 'Tether',
    chain: CHAINS[12],
    icon: <UsdtIcon />,
    decimals: 6,
    contractAddress: '0x4ECaBa5870353805a9F068101A40E0f32ed605C6',
  },
  {
    id: 'usdc-gnosis',
    symbol: 'USDC',
    name: 'USD Coin',
    chain: CHAINS[12],
    icon: <UsdcIcon />,
    decimals: 6,
    contractAddress: '0xDDb64fE46a91D46ee29420539FC25FD07c5FEa3E',
  },
  // Fantom (Chain index 13)
  {
    id: 'usdt-fantom',
    symbol: 'USDT',
    name: 'Tether',
    chain: CHAINS[13],
    icon: <UsdtIcon />,
    decimals: 6,
    contractAddress: '0x049d68029688eAbF473097a2fC38ef61633A3C7A',
  },
  {
    id: 'usdc-fantom',
    symbol: 'USDC',
    name: 'USD Coin',
    chain: CHAINS[13],
    icon: <UsdcIcon />,
    decimals: 6,
    contractAddress: '0x04068DA6C83AFCFA0e13ba15A6696662335D5B75',
  },
  // Polygon zkEVM (Chain index 14)
  {
    id: 'usdt-polygon-zkevm',
    symbol: 'USDT',
    name: 'Tether',
    chain: CHAINS[14],
    icon: <UsdtIcon />,
    decimals: 6,
    contractAddress: '0x1E4a5963aBFD975d8c9021ce480b42188849D413',
  },
  {
    id: 'usdc-polygon-zkevm',
    symbol: 'USDC',
    name: 'USD Coin',
    chain: CHAINS[14],
    icon: <UsdcIcon />,
    decimals: 6,
    contractAddress: '0xA8CE8aee21bC2A48a5EF670af4667839C824C82b',
  },
  // zkSync Era (Chain index 15)
  {
    id: 'usdt-zksync',
    symbol: 'USDT',
    name: 'Tether',
    chain: CHAINS[15],
    icon: <UsdtIcon />,
    decimals: 6,
    contractAddress: '0x493257fD37EDB34451f62EDf8D2a0C418852BA24',
  },
  {
    id: 'usdc-zksync',
    symbol: 'USDC',
    name: 'USD Coin',
    chain: CHAINS[15],
    icon: <UsdcIcon />,
    decimals: 6,
    contractAddress: '0x3355df6D4c9C3035724Fd0e3914dE96A5a83aaf4',
  },
  // Linea (Chain index 16)
  {
    id: 'usdt-linea',
    symbol: 'USDT',
    name: 'Tether',
    chain: CHAINS[16],
    icon: <UsdtIcon />,
    decimals: 6,
    contractAddress: '0xA219439258ca9da29E9Cc442AFCD604473bfF5D7',
  },
  {
    id: 'usdc-linea',
    symbol: 'USDC',
    name: 'USD Coin',
    chain: CHAINS[16],
    icon: <UsdcIcon />,
    decimals: 6,
    contractAddress: '0x176211869cA2b568f2A7D4EE941E073a821EE1ff',
  },
];