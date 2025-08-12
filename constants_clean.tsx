import type { Chain, Token, Bridge, Aggregator } from './types';
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
  DaiIcon,
  BusdIcon,
  FraxIcon,
  EthIcon,
  WethIcon,
  WbtcIcon,
  BnbIcon,
  AvaxIcon,
  MaticIcon,
  SolIcon,
  TrxIcon,
  SuiTokenIcon,
  NearTokenIcon,
  StargateIcon,
  SynapseIcon, 
  WormholeIcon,
  RelayIcon,
  CCTPIcon,
  CelerIcon,
  MayanIcon,
  AcrossIcon,
  HopIcon,
  HyphenIcon,
  ConnextIcon,
  DebridgeIcon,
  BaseBridgeIcon,
  SocketIcon,
  PortalBridgeIcon,
  PolygonBridgeIcon,
  OptimismBridgeIcon,
  AvalancheBridgeIcon,
  RouterProtocolIcon,
  LiFiIcon,
  OrbiterFinanceIcon,
  AllbridgeIcon,
  RainbowBridgeIcon,
  AxelarIcon,
  ThorchainIcon
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
  // Critical Missing Bridges - Phase 1
  { name: 'Portal Bridge', icon: <PortalBridgeIcon /> },
  { name: 'Polygon Bridge', icon: <PolygonBridgeIcon /> },
  { name: 'Optimism Bridge', icon: <OptimismBridgeIcon /> },
  { name: 'Avalanche Bridge', icon: <AvalancheBridgeIcon /> },
  // Growing Bridges - Phase 2
  { name: 'Router Protocol', icon: <RouterProtocolIcon /> },
  { name: 'Li.Fi', icon: <LiFiIcon /> },
  { name: 'Orbiter Finance', icon: <OrbiterFinanceIcon /> },
  { name: 'Allbridge', icon: <AllbridgeIcon /> },
  { name: 'Rainbow Bridge', icon: <RainbowBridgeIcon /> },
  // Specialized Bridges - Phase 3
  { name: 'Axelar', icon: <AxelarIcon /> },
  { name: 'THORChain', icon: <ThorchainIcon /> },
  { name: 'LayerZero', icon: '🔗' },
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
  // Additional popular tokens on Ethereum
  {
    id: 'eth-ethereum',
    symbol: 'ETH',
    name: 'Ethereum',
    chain: CHAINS[0],
    icon: <EthIcon />,
    decimals: 18,
  },
  {
    id: 'weth-ethereum',
    symbol: 'WETH',
    name: 'Wrapped Ethereum',
    chain: CHAINS[0],
    icon: <WethIcon />,
    decimals: 18,
    contractAddress: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
  },
  {
    id: 'wbtc-ethereum',
    symbol: 'WBTC',
    name: 'Wrapped Bitcoin',
    chain: CHAINS[0],
    icon: <WbtcIcon />,
    decimals: 8,
    contractAddress: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
  },
  {
    id: 'dai-ethereum',
    symbol: 'DAI',
    name: 'Dai Stablecoin',
    chain: CHAINS[0],
    icon: <DaiIcon />,
    decimals: 18,
    contractAddress: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
  },
];
