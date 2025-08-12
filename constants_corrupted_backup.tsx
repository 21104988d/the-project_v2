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

  // === MAJOR CRYPTOCURRENCIES ===
  
  // Ethereum Native & Wrapped Assets
  {
    id: 'eth-ethereum',
    symbol: 'ETH',
    name: 'Ethereum',
    chain: CHAINS[0], // Ethereum
    icon: <EthIcon />,
    decimals: 18,
    // No contract address for native ETH
  },
  {
    id: 'weth-ethereum',
    symbol: 'WETH',
    name: 'Wrapped Ethereum',
    chain: CHAINS[0], // Ethereum
    icon: <WethIcon />,
    decimals: 18,
    contractAddress: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
  },
  {
    id: 'wbtc-ethereum',
    symbol: 'WBTC',
    name: 'Wrapped Bitcoin',
    chain: CHAINS[0], // Ethereum
    icon: <WbtcIcon />,
    decimals: 8,
    contractAddress: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
  },

  // Additional Stablecoins on Ethereum
  {
    id: 'dai-ethereum',
    symbol: 'DAI',
    name: 'Dai Stablecoin',
    chain: CHAINS[0], // Ethereum
    icon: <DaiIcon />,
    decimals: 18,
    contractAddress: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
  },
  {
    id: 'frax-ethereum',
    symbol: 'FRAX',
    name: 'Frax',
    chain: CHAINS[0], // Ethereum
    icon: <FraxIcon />,
    decimals: 18,
    contractAddress: '0x853d955aCEf822Db058eb8505911ED77F175b99e',
  },

  // Arbitrum Native Assets
  {
    id: 'eth-arbitrum',
    symbol: 'ETH',
    name: 'Ethereum',
    chain: CHAINS[1], // Arbitrum
    icon: <EthIcon />,
    decimals: 18,
    // Native ETH on Arbitrum
  },
  {
    id: 'weth-arbitrum',
    symbol: 'WETH',
    name: 'Wrapped Ethereum',
    chain: CHAINS[1], // Arbitrum
    icon: <WethIcon />,
    decimals: 18,
    contractAddress: '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1',
  },

  // Polygon Native Assets
  {
    id: 'matic-polygon',
    symbol: 'MATIC',
    name: 'Polygon',
    chain: CHAINS[2], // Polygon
    icon: <MaticIcon />,
    decimals: 18,
    // Native MATIC
  },
  {
    id: 'weth-polygon',
    symbol: 'WETH',
    name: 'Wrapped Ethereum',
    chain: CHAINS[2], // Polygon
    icon: <WethIcon />,
    decimals: 18,
    contractAddress: '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619',
  },

  // BSC Native Assets
  {
    id: 'bnb-bsc',
    symbol: 'BNB',
    name: 'BNB',
    chain: CHAINS[4], // BSC
    icon: <BnbIcon />,
    decimals: 18,
    // Native BNB
  },
  {
    id: 'busd-bsc',
    symbol: 'BUSD',
    name: 'Binance USD',
    chain: CHAINS[4], // BSC
    icon: <BusdIcon />,
    decimals: 18,
    contractAddress: '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56',
  },
  {
    id: 'weth-bsc',
    symbol: 'WETH',
    name: 'Wrapped Ethereum',
    chain: CHAINS[4], // BSC
    icon: <WethIcon />,
    decimals: 18,
    contractAddress: '0x2170Ed0880ac9A755fd29B2688956BD959F933F8',
  },

  // Avalanche Native Assets
  {
    id: 'avax-avalanche',
    symbol: 'AVAX',
    name: 'Avalanche',
    chain: CHAINS[5], // Avalanche
    icon: <AvaxIcon />,
    decimals: 18,
    // Native AVAX
  },
  {
    id: 'weth-avalanche',
    symbol: 'WETH',
    name: 'Wrapped Ethereum',
    chain: CHAINS[5], // Avalanche
    icon: <WethIcon />,
    decimals: 18,
    contractAddress: '0x49D5c2BdFfac6CE2BFdB6640F4F80f226bc10bAB',
  },

  // Solana Native Assets
  {
    id: 'sol-solana',
    symbol: 'SOL',
    name: 'Solana',
    chain: CHAINS[6], // Solana
    icon: <SolIcon />,
    decimals: 9,
    // Native SOL
  },

  // Tron Native Assets
  {
    id: 'trx-tron',
    symbol: 'TRX',
    name: 'TRON',
    chain: CHAINS[7], // Tron
    icon: <TrxIcon />,
    decimals: 6,
    // Native TRX
  },

  // Sui Native Assets
  {
    id: 'sui-sui',
    symbol: 'SUI',
    name: 'Sui',
    chain: CHAINS[8], // Sui
    icon: <SuiTokenIcon />,
    decimals: 9,
    // Native SUI
  },

  // NEAR Native Assets
  {
    id: 'near-near',
    symbol: 'NEAR',
    name: 'NEAR Protocol',
    chain: CHAINS[9], // NEAR
    icon: <NearTokenIcon />,
    decimals: 24,
    // Native NEAR
  },
];
    address: '0x0000000000000000000000000000000000000000',
    decimals: 18,
    network: 'Ethereum',
    icon: 'https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png?1696501400',
    category: 'major'
  },

  {
    symbol: 'XRP',
    name: 'XRP',
    address: '0x0000000000000000000000000000000000000000',
    decimals: 18,
    network: 'Ethereum',
    icon: 'https://coin-images.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png?1696501442',
    category: 'major'
  },

  {
    symbol: 'STETH',
    name: 'Lido Staked Ether',
    address: '0x0000000000000000000000000000000000000000',
    decimals: 18,
    network: 'Ethereum',
    icon: 'https://coin-images.coingecko.com/coins/images/13442/large/steth_logo.png?1696513206',
    category: 'major'
  },

  {
    symbol: 'DOGE',
    name: 'Dogecoin',
    address: '0x0000000000000000000000000000000000000000',
    decimals: 18,
    network: 'Ethereum',
    icon: 'https://coin-images.coingecko.com/coins/images/5/large/dogecoin.png?1696501409',
    category: 'major'
  },

  {
    symbol: 'ADA',
    name: 'Cardano',
    address: '0x0000000000000000000000000000000000000000',
    decimals: 18,
    network: 'Ethereum',
    icon: 'https://coin-images.coingecko.com/coins/images/975/large/cardano.png?1696502090',
    category: 'major'
  },

  {
    symbol: 'WSTETH',
    name: 'Wrapped stETH',
    address: '0x0000000000000000000000000000000000000000',
    decimals: 18,
    network: 'Ethereum',
    icon: 'https://coin-images.coingecko.com/coins/images/18834/large/wstETH.png?1696518295',
    category: 'major'
  },

  {
    symbol: 'LINK',
    name: 'Chainlink',
    address: '0x0000000000000000000000000000000000000000',
    decimals: 18,
    network: 'Ethereum',
    icon: 'https://coin-images.coingecko.com/coins/images/877/large/chainlink-new-logo.png?1696502009',
    category: 'major'
  },

  {
    symbol: 'HYPE',
    name: 'Hyperliquid',
    address: '0x0000000000000000000000000000000000000000',
    decimals: 18,
    network: 'Ethereum',
    icon: 'https://coin-images.coingecko.com/coins/images/50882/large/hyperliquid.jpg?1729431300',
    category: 'major'
  },

  {
    symbol: 'WBETH',
    name: 'Wrapped Beacon ETH',
    address: '0x0000000000000000000000000000000000000000',
    decimals: 18,
    network: 'Ethereum',
    icon: 'https://coin-images.coingecko.com/coins/images/30061/large/wbeth-icon.png?1696528983',
    category: 'major'
  },

  {
    symbol: 'XLM',
    name: 'Stellar',
    address: '0x0000000000000000000000000000000000000000',
    decimals: 18,
    network: 'Ethereum',
    icon: 'https://coin-images.coingecko.com/coins/images/100/large/fmpFRHHQ_400x400.jpg?1735231350',
    category: 'major'
  },

  {
    symbol: 'WEETH',
    name: 'Wrapped eETH',
    address: '0x0000000000000000000000000000000000000000',
    decimals: 18,
    network: 'Ethereum',
    icon: 'https://coin-images.coingecko.com/coins/images/33033/large/weETH.png?1701438396',
    category: 'major'
  },

  {
    symbol: 'BCH',
    name: 'Bitcoin Cash',
    address: '0x0000000000000000000000000000000000000000',
    decimals: 18,
    network: 'Ethereum',
    icon: 'https://coin-images.coingecko.com/coins/images/780/large/bitcoin-cash-circle.png?1696501932',
    category: 'major'
  },

  {
    symbol: 'HBAR',
    name: 'Hedera',
    address: '0x0000000000000000000000000000000000000000',
    decimals: 18,
    network: 'Ethereum',
    icon: 'https://coin-images.coingecko.com/coins/images/3688/large/hbar.png?1696504364',
    category: 'major'
  },

  {
    symbol: 'USDE',
    name: 'Ethena USDe',
    address: '0x0000000000000000000000000000000000000000',
    decimals: 18,
    network: 'Ethereum',
    icon: 'https://coin-images.coingecko.com/coins/images/33613/large/usde.png?1733810059',
    category: 'major'
  },

  {
    symbol: 'LTC',
    name: 'Litecoin',
    address: '0x0000000000000000000000000000000000000000',
    decimals: 18,
    network: 'Ethereum',
    icon: 'https://coin-images.coingecko.com/coins/images/2/large/litecoin.png?1696501400',
    category: 'major'
  },

  {
    symbol: 'TON',
    name: 'Toncoin',
    address: '0x0000000000000000000000000000000000000000',
    decimals: 18,
    network: 'Ethereum',
    icon: 'https://coin-images.coingecko.com/coins/images/17980/large/photo_2024-09-10_17.09.00.jpeg?1725963446',
    category: 'major'
  },

  {
    symbol: 'LEO',
    name: 'LEO Token',
    address: '0x0000000000000000000000000000000000000000',
    decimals: 18,
    network: 'Ethereum',
    icon: 'https://coin-images.coingecko.com/coins/images/8418/large/leo-token.png?1696508607',
    category: 'major'
  },

  {
    symbol: 'SHIB',
    name: 'Shiba Inu',
    address: '0x0000000000000000000000000000000000000000',
    decimals: 18,
    network: 'Ethereum',
    icon: 'https://coin-images.coingecko.com/coins/images/11939/large/shiba.png?1696511800',
    category: 'major'
  },

  {
    symbol: 'USDS',
    name: 'USDS',
    address: '0x0000000000000000000000000000000000000000',
    decimals: 18,
    network: 'Ethereum',
    icon: 'https://coin-images.coingecko.com/coins/images/39926/large/usds.webp?1726666683',
    category: 'major'
  },

  {
    symbol: 'BSC-USD',
    name: 'Binance Bridged USDT (BNB Smart Chain)',
    address: '0x0000000000000000000000000000000000000000',
    decimals: 18,
    network: 'Ethereum',
    icon: 'https://coin-images.coingecko.com/coins/images/35021/large/USDT.png?1707233575',
    category: 'major'
  },

  {
    symbol: 'UNI',
    name: 'Uniswap',
    address: '0x0000000000000000000000000000000000000000',
    decimals: 18,
    network: 'Ethereum',
    icon: 'https://coin-images.coingecko.com/coins/images/12504/large/uniswap-logo.png?1720676669',
    category: 'defi'
  },

  {
    symbol: 'WBT',
    name: 'WhiteBIT Coin',
    address: '0x0000000000000000000000000000000000000000',
    decimals: 18,
    network: 'Ethereum',
    icon: 'https://coin-images.coingecko.com/coins/images/27045/large/wbt_token.png?1696526096',
    category: 'major'
  },

  {
    symbol: 'CBBTC',
    name: 'Coinbase Wrapped BTC',
    address: '0x0000000000000000000000000000000000000000',
    decimals: 18,
    network: 'Ethereum',
    icon: 'https://coin-images.coingecko.com/coins/images/40143/large/cbbtc.webp?1726136727',
    category: 'major'
  },

  {
    symbol: 'DOT',
    name: 'Polkadot',
    address: '0x0000000000000000000000000000000000000000',
    decimals: 18,
    network: 'Ethereum',
    icon: 'https://coin-images.coingecko.com/coins/images/12171/large/polkadot.png?1696512008',
    category: 'major'
  },

  {
    symbol: 'CRO',
    name: 'Cronos',
    address: '0x0000000000000000000000000000000000000000',
    decimals: 18,
    network: 'Ethereum',
    icon: 'https://coin-images.coingecko.com/coins/images/7310/large/cro_token_logo.png?1696507599',
    category: 'major'
  },

  {
    symbol: 'ENA',
    name: 'Ethena',
    address: '0x0000000000000000000000000000000000000000',
    decimals: 18,
    network: 'Ethereum',
    icon: 'https://coin-images.coingecko.com/coins/images/36530/large/ethena.png?1711701436',
    category: 'major'
  },

  {
    symbol: 'SUSDE',
    name: 'Ethena Staked USDe',
    address: '0x0000000000000000000000000000000000000000',
    decimals: 18,
    network: 'Ethereum',
    icon: 'https://coin-images.coingecko.com/coins/images/33669/large/sUSDe-Symbol-Color.png?1716307680',
    category: 'major'
  },

  {
    symbol: 'BGB',
    name: 'Bitget Token',
    address: '0x0000000000000000000000000000000000000000',
    decimals: 18,
    network: 'Ethereum',
    icon: 'https://coin-images.coingecko.com/coins/images/11610/large/Bitget_logo.png?1736925727',
    category: 'major'
  },

  {
    symbol: 'PEPE',
    name: 'Pepe',
    address: '0x0000000000000000000000000000000000000000',
    decimals: 18,
    network: 'Ethereum',
    icon: 'https://coin-images.coingecko.com/coins/images/29850/large/pepe-token.jpeg?1696528776',
    category: 'major'
  },

  {
    symbol: 'AAVE',
    name: 'Aave',
    address: '0x0000000000000000000000000000000000000000',
    decimals: 18,
    network: 'Ethereum',
    icon: 'https://coin-images.coingecko.com/coins/images/12645/large/aave-token-round.png?1720472354',
    category: 'defi'
  },

  {
    symbol: 'XMR',
    name: 'Monero',
    address: '0x0000000000000000000000000000000000000000',
    decimals: 18,
    network: 'Ethereum',
    icon: 'https://coin-images.coingecko.com/coins/images/69/large/monero_logo.png?1696501460',
    category: 'major'
  },

  {
    symbol: 'TAO',
    name: 'Bittensor',
    address: '0x0000000000000000000000000000000000000000',
    decimals: 18,
    network: 'Ethereum',
    icon: 'https://coin-images.coingecko.com/coins/images/28452/large/ARUsPeNQ_400x400.jpeg?1696527447',
    category: 'major'
  },

  {
    symbol: 'ETC',
    name: 'Ethereum Classic',
    address: '0x0000000000000000000000000000000000000000',
    decimals: 18,
    network: 'Ethereum',
    icon: 'https://coin-images.coingecko.com/coins/images/453/large/ethereum-classic-logo.png?1696501717',
    category: 'major'
  },

  {
    symbol: 'MNT',
    name: 'Mantle',
    address: '0x0000000000000000000000000000000000000000',
    decimals: 18,
    network: 'Ethereum',
    icon: 'https://coin-images.coingecko.com/coins/images/30980/large/Mantle-Logo-mark.png?1739213200',
    category: 'major'
  },

  {
    symbol: 'ONDO',
    name: 'Ondo',
    address: '0x0000000000000000000000000000000000000000',
    decimals: 18,
    network: 'Ethereum',
    icon: 'https://coin-images.coingecko.com/coins/images/26580/large/ONDO.png?1696525656',
    category: 'major'
  },

  {
    symbol: 'APT',
    name: 'Aptos',
    address: '0x0000000000000000000000000000000000000000',
    decimals: 18,
    network: 'Ethereum',
    icon: 'https://coin-images.coingecko.com/coins/images/26455/large/aptos_round.png?1696525528',
    category: 'major'
  },

  {
    symbol: 'PI',
    name: 'Pi Network',
    address: '0x0000000000000000000000000000000000000000',
    decimals: 18,
    network: 'Ethereum',
    icon: 'https://coin-images.coingecko.com/coins/images/54342/large/pi_network.jpg?1739347576',
    category: 'major'
  },

  {
    symbol: 'ICP',
    name: 'Internet Computer',
    address: '0x0000000000000000000000000000000000000000',
    decimals: 18,
    network: 'Ethereum',
    icon: 'https://coin-images.coingecko.com/coins/images/14495/large/Internet_Computer_logo.png?1696514180',
    category: 'major'
  },

  {
    symbol: 'JITOSOL',
    name: 'Jito Staked SOL',
    address: '0x0000000000000000000000000000000000000000',
    decimals: 18,
    network: 'Ethereum',
    icon: 'https://coin-images.coingecko.com/coins/images/28046/large/JitoSOL-200.png?1696527060',
    category: 'major'
  },

  {
    symbol: 'OKB',
    name: 'OKB',
    address: '0x0000000000000000000000000000000000000000',
    decimals: 18,
    network: 'Ethereum',
    icon: 'https://coin-images.coingecko.com/coins/images/4463/large/WeChat_Image_20220118095654.png?1696505053',
    category: 'major'
  },

  {
    symbol: 'KAS',
    name: 'Kaspa',
    address: '0x0000000000000000000000000000000000000000',
    decimals: 18,
    network: 'Ethereum',
    icon: 'https://coin-images.coingecko.com/coins/images/25751/large/kaspa-icon-exchanges.png?1696524837',
    category: 'major'
  },

  {
    symbol: 'ARB',
    name: 'Arbitrum',
    address: '0x0000000000000000000000000000000000000000',
    decimals: 18,
    network: 'Ethereum',
    icon: 'https://coin-images.coingecko.com/coins/images/16547/large/arb.jpg?1721358242',
    category: 'layer2'
  },

  {
    symbol: 'BUIDL',
    name: 'BlackRock USD Institutional Digital Liquidity Fund',
    address: '0x0000000000000000000000000000000000000000',
    decimals: 18,
    network: 'Ethereum',
    icon: 'https://coin-images.coingecko.com/coins/images/36291/large/blackrock.png?1711013223',
    category: 'major'
  },

  {
    symbol: 'ALGO',
    name: 'Algorand',
    address: '0x0000000000000000000000000000000000000000',
    decimals: 18,
    network: 'Ethereum',
    icon: 'https://coin-images.coingecko.com/coins/images/4380/large/download.png?1696504978',
    category: 'major'
  },

  {
    symbol: 'PENGU',
    name: 'Pudgy Penguins',
    address: '0x0000000000000000000000000000000000000000',
    decimals: 18,
    network: 'Ethereum',
    icon: 'https://coin-images.coingecko.com/coins/images/52622/large/PUDGY_PENGUINS_PENGU_PFP.png?1733809110',
    category: 'major'
  },

  {
    symbol: 'POL',
    name: 'POL (ex-MATIC)',
    address: '0x0000000000000000000000000000000000000000',
    decimals: 18,
    network: 'Ethereum',
    icon: 'https://coin-images.coingecko.com/coins/images/32440/large/polygon.png?1698233684',
    category: 'layer2'
  },

  {
    symbol: 'USD1',
    name: 'USD1',
    address: '0x0000000000000000000000000000000000000000',
    decimals: 18,
    network: 'Ethereum',
    icon: 'https://coin-images.coingecko.com/coins/images/54977/large/USD1_1000x1000_transparent.png?1749297002',
    category: 'major'
  },

  {
    symbol: 'VET',
    name: 'VeChain',
    address: '0x0000000000000000000000000000000000000000',
    decimals: 18,
    network: 'Ethereum',
    icon: 'https://coin-images.coingecko.com/coins/images/1167/large/VET.png?1742383283',
    category: 'major'
  },

  {
    symbol: 'ATOM',
    name: 'Cosmos Hub',
    address: '0x0000000000000000000000000000000000000000',
    decimals: 18,
    network: 'Ethereum',
    icon: 'https://coin-images.coingecko.com/coins/images/1481/large/cosmos_hub.png?1696502525',
    category: 'major'
  },

  {
    symbol: 'RETH',
    name: 'Rocket Pool ETH',
    address: '0x0000000000000000000000000000000000000000',
    decimals: 18,
    network: 'Ethereum',
    icon: 'https://coin-images.coingecko.com/coins/images/20764/large/reth.png?1696520159',
    category: 'major'
  },

  {
    symbol: 'RENDER',
    name: 'Render',
    address: '0x0000000000000000000000000000000000000000',
    decimals: 18,
    network: 'Ethereum',
    icon: 'https://coin-images.coingecko.com/coins/images/11636/large/rndr.png?1696511529',
    category: 'major'
  },

  {
    symbol: 'RSETH',
    name: 'Kelp DAO Restaked ETH',
    address: '0x0000000000000000000000000000000000000000',
    decimals: 18,
    network: 'Ethereum',
    icon: 'https://coin-images.coingecko.com/coins/images/33800/large/Icon___Dark.png?1702991855',
    category: 'major'
  },

  {
    symbol: 'FTN',
    name: 'Fasttoken',
    address: '0x0000000000000000000000000000000000000000',
    decimals: 18,
    network: 'Ethereum',
    icon: 'https://coin-images.coingecko.com/coins/images/28478/large/lightenicon_200x200.png?1696527472',
    category: 'major'
  },

  {
    symbol: 'GT',
    name: 'Gate',
    address: '0x0000000000000000000000000000000000000000',
    decimals: 18,
    network: 'Ethereum',
    icon: 'https://coin-images.coingecko.com/coins/images/8183/large/200X200.png?1735246724',
    category: 'major'
  },

  {
    symbol: 'BONK',
    name: 'Bonk',
    address: '0x0000000000000000000000000000000000000000',
    decimals: 18,
    network: 'Ethereum',
    icon: 'https://coin-images.coingecko.com/coins/images/28600/large/bonk.jpg?1696527587',
    category: 'major'
  },

  {
    symbol: 'WLD',
    name: 'Worldcoin',
    address: '0x0000000000000000000000000000000000000000',
    decimals: 18,
    network: 'Ethereum',
    icon: 'https://coin-images.coingecko.com/coins/images/31069/large/worldcoin.jpeg?1696529903',
    category: 'major'
  },

  {
    symbol: 'SUSDS',
    name: 'sUSDS',
    address: '0x0000000000000000000000000000000000000000',
    decimals: 18,
    network: 'Ethereum',
    icon: 'https://coin-images.coingecko.com/coins/images/52721/large/sUSDS_Coin.png?1734086971',
    category: 'major'
  },

  {
    symbol: 'BNSOL',
    name: 'Binance Staked SOL',
    address: '0x0000000000000000000000000000000000000000',
    decimals: 18,
    network: 'Ethereum',
    icon: 'https://coin-images.coingecko.com/coins/images/40132/large/bnsol.png?1725968367',
    category: 'major'
  },

  {
    symbol: 'FET',
    name: 'Artificial Superintelligence Alliance',
    address: '0x0000000000000000000000000000000000000000',
    decimals: 18,
    network: 'Ethereum',
    icon: 'https://coin-images.coingecko.com/coins/images/5681/large/ASI.png?1719827289',
    category: 'major'
  },

  {
    symbol: 'SEI',
    name: 'Sei',
    address: '0x0000000000000000000000000000000000000000',
    decimals: 18,
    network: 'Ethereum',
    icon: 'https://coin-images.coingecko.com/coins/images/28205/large/Sei_Logo_-_Transparent.png?1696527207',
    category: 'major'
  },

  {
    symbol: 'JLP',
    name: 'Jupiter Perpetuals Liquidity Provider Token',
    address: '0x0000000000000000000000000000000000000000',
    decimals: 18,
    network: 'Ethereum',
    icon: 'https://coin-images.coingecko.com/coins/images/33094/large/jlp.png?1700631386',
    category: 'major'
  },

  {
    symbol: 'TRUMP',
    name: 'Official Trump',
    address: '0x0000000000000000000000000000000000000000',
    decimals: 18,
    network: 'Ethereum',
    icon: 'https://coin-images.coingecko.com/coins/images/53746/large/trump.png?1737171561',
    category: 'major'
  },

  {
    symbol: 'SKY',
    name: 'Sky',
    address: '0x0000000000000000000000000000000000000000',
    decimals: 18,
    network: 'Ethereum',
    icon: 'https://coin-images.coingecko.com/coins/images/39925/large/sky.jpg?1724827980',
    category: 'major'
  },

  {
    symbol: 'FIL',
    name: 'Filecoin',
    address: '0x0000000000000000000000000000000000000000',
    decimals: 18,
    network: 'Ethereum',
    icon: 'https://coin-images.coingecko.com/coins/images/12817/large/filecoin.png?1696512609',
    category: 'major'
  },

  {
    symbol: 'IP',
    name: 'Story',
    address: '0x0000000000000000000000000000000000000000',
    decimals: 18,
    network: 'Ethereum',
    icon: 'https://coin-images.coingecko.com/coins/images/54035/large/Transparent_bg.png?1738075331',
    category: 'major'
  },

  {
    symbol: 'OSETH',
    name: 'StakeWise Staked ETH',
    address: '0x0000000000000000000000000000000000000000',
    decimals: 18,
    network: 'Ethereum',
    icon: 'https://coin-images.coingecko.com/coins/images/33117/large/Frame_27513839.png?1700732599',
    category: 'major'
  },

  {
    symbol: 'SPX',
    name: 'SPX6900',
    address: '0x0000000000000000000000000000000000000000',
    decimals: 18,
    network: 'Ethereum',
    icon: 'https://coin-images.coingecko.com/coins/images/31401/large/centeredcoin_%281%29.png?1737048493',
    category: 'major'
  },

  {
    symbol: 'QNT',
    name: 'Quant',
    address: '0x0000000000000000000000000000000000000000',
    decimals: 18,
    network: 'Ethereum',
    icon: 'https://coin-images.coingecko.com/coins/images/3370/large/5ZOu7brX_400x400.jpg?1696504070',
    category: 'major'
  },

  {
    symbol: 'FLR',
    name: 'Flare',
    address: '0x0000000000000000000000000000000000000000',
    decimals: 18,
    network: 'Ethereum',
    icon: 'https://coin-images.coingecko.com/coins/images/28624/large/FLR-icon200x200.png?1696527609',
    category: 'major'
  },

  {
    symbol: 'LBTC',
    name: 'Lombard Staked BTC',
    address: '0x0000000000000000000000000000000000000000',
    decimals: 18,
    network: 'Ethereum',
    icon: 'https://coin-images.coingecko.com/coins/images/39969/large/LBTC_Logo.png?1724959872',
    category: 'major'
  },

  {
    symbol: 'LSETH',
    name: 'Liquid Staked ETH',
    address: '0x0000000000000000000000000000000000000000',
    decimals: 18,
    network: 'Ethereum',
    icon: 'https://coin-images.coingecko.com/coins/images/28848/large/LsETH-receipt-token-circle.png?1696527824',
    category: 'major'
  },

  {
    symbol: 'JUP',
    name: 'Jupiter',
    address: '0x0000000000000000000000000000000000000000',
    decimals: 18,
    network: 'Ethereum',
    icon: 'https://coin-images.coingecko.com/coins/images/34188/large/jup.png?1704266489',
    category: 'major'
  },

  {
    symbol: 'METH',
    name: 'Mantle Staked Ether',
    address: '0x0000000000000000000000000000000000000000',
    decimals: 18,
    network: 'Ethereum',
    icon: 'https://coin-images.coingecko.com/coins/images/33345/large/symbol_transparent_bg.png?1701697066',
    category: 'major'
  },

  {
    symbol: 'KCS',
    name: 'KuCoin',
    address: '0x0000000000000000000000000000000000000000',
    decimals: 18,
    network: 'Ethereum',
    icon: 'https://coin-images.coingecko.com/coins/images/1047/large/sa9z79.png?1696502152',
    category: 'major'
  },

  {
    symbol: 'USDTB',
    name: 'USDtb',
    address: '0x0000000000000000000000000000000000000000',
    decimals: 18,
    network: 'Ethereum',
    icon: 'https://coin-images.coingecko.com/coins/images/52804/large/USDtbSmall.png?1734344946',
    category: 'major'
  },

  {
    symbol: 'XDC',
    name: 'XDC Network',
    address: '0x0000000000000000000000000000000000000000',
    decimals: 18,
    network: 'Ethereum',
    icon: 'https://coin-images.coingecko.com/coins/images/2912/large/xdc-icon.png?1696503661',
    category: 'major'
  },

  {
    symbol: 'INJ',
    name: 'Injective',
    address: '0x0000000000000000000000000000000000000000',
    decimals: 18,
    network: 'Ethereum',
    icon: 'https://coin-images.coingecko.com/coins/images/12882/large/Other_200x200.png?1738782212',
    category: 'major'
  },

  {
    symbol: 'LDO',
    name: 'Lido DAO',
    address: '0x0000000000000000000000000000000000000000',
    decimals: 18,
    network: 'Ethereum',
    icon: 'https://coin-images.coingecko.com/coins/images/13573/large/Lido_DAO.png?1696513326',
    category: 'major'
  },

  {
    symbol: 'HASH',
    name: 'Provenance Blockchain',
    address: '0x0000000000000000000000000000000000000000',
    decimals: 18,
    network: 'Ethereum',
    icon: 'https://coin-images.coingecko.com/coins/images/66154/large/Hastra_Icon.png?1748497203',
    category: 'major'
  },

  {
    symbol: 'PUMP',
    name: 'Pump.fun',
    address: '0x0000000000000000000000000000000000000000',
    decimals: 18,
    network: 'Ethereum',
    icon: 'https://coin-images.coingecko.com/coins/images/67164/large/pump.jpg?1751949376',
    category: 'major'
  },

  {
    symbol: 'OP',
    name: 'Optimism',
    address: '0x0000000000000000000000000000000000000000',
    decimals: 18,
    network: 'Ethereum',
    icon: 'https://coin-images.coingecko.com/coins/images/25244/large/Optimism.png?1696524385',
    category: 'layer2'
  },

  {
    symbol: 'USDT0',
    name: 'USDT0',
    address: '0x0000000000000000000000000000000000000000',
    decimals: 18,
    network: 'Ethereum',
    icon: 'https://coin-images.coingecko.com/coins/images/53705/large/usdt0.jpg?1737086183',
    category: 'major'
  },

  {
    symbol: 'NEXO',
    name: 'NEXO',
    address: '0x0000000000000000000000000000000000000000',
    decimals: 18,
    network: 'Ethereum',
    icon: 'https://coin-images.coingecko.com/coins/images/3695/large/CG-nexo-token-200x200_2x.png?1730414360',
    category: 'major'
  },

  {
    symbol: 'TIA',
    name: 'Celestia',
    address: '0x0000000000000000000000000000000000000000',
    decimals: 18,
    network: 'Ethereum',
    icon: 'https://coin-images.coingecko.com/coins/images/31967/large/tia.jpg?1696530772',
    category: 'major'
  },

  {
    symbol: 'EZETH',
    name: 'Renzo Restaked ETH',
    address: '0x0000000000000000000000000000000000000000',
    decimals: 18,
    network: 'Ethereum',
    icon: 'https://coin-images.coingecko.com/coins/images/34753/large/Ezeth_logo_circle.png?1713496404',
    category: 'major'
  },

  {
    symbol: 'CRV',
    name: 'Curve DAO',
    address: '0x0000000000000000000000000000000000000000',
    decimals: 18,
    network: 'Ethereum',
    icon: 'https://coin-images.coingecko.com/coins/images/12124/large/Curve.png?1696511967',
    category: 'defi'
  },

  {
    symbol: 'STX',
    name: 'Stacks',
    address: '0x0000000000000000000000000000000000000000',
    decimals: 18,
    network: 'Ethereum',
    icon: 'https://coin-images.coingecko.com/coins/images/2069/large/Stacks_Logo_png.png?1709979332',
    category: 'major'
  },

  {
    symbol: 'AAVE',
    name: 'Aave',
    address: '0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9',
    decimals: 18,
    network: 'Ethereum',
    icon: '👻',
    category: 'defi'
  },

  {
    symbol: 'COMP',
    name: 'Compound',
    address: '0xc00e94Cb662C3520282E6f5717214004A7f26888',
    decimals: 18,
    network: 'Ethereum',
    icon: '🏛️',
    category: 'defi'
  },

  {
    symbol: 'MKR',
    name: 'Maker',
    address: '0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2',
    decimals: 18,
    network: 'Ethereum',
    icon: '🏗️',
    category: 'defi'
  },

  {
    symbol: 'SNX',
    name: 'Synthetix',
    address: '0xC011a73ee8576Fb46F5E1c5751cA3B9Fe0af2a6F',
    decimals: 18,
    network: 'Ethereum',
    icon: '⚡',
    category: 'defi'
  },

  {
    symbol: 'YFI',
    name: 'yearn.finance',
    address: '0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e',
    decimals: 18,
    network: 'Ethereum',
    icon: '🌾',
    category: 'defi'
  },

  {
    symbol: 'ARB',
    name: 'Arbitrum',
    address: '0x912CE59144191C1204E64559FE8253a0e49E6548',
    decimals: 18,
    network: 'Arbitrum',
    icon: '🔵',
    category: 'layer2'
  },

  {
    symbol: 'OP',
    name: 'Optimism',
    address: '0x4200000000000000000000000000000000000042',
    decimals: 18,
    network: 'Optimism',
    icon: '🔴',
    category: 'layer2'
  },

  {
    symbol: 'CAKE',
    name: 'PancakeSwap',
    address: '0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82',
    decimals: 18,
    network: 'BSC',
    icon: '🥞',
    category: 'dex'
  },

  {
    symbol: 'QUICK',
    name: 'QuickSwap',
    address: '0x831753DD7087CaC61aB5644b308642cc1c33Dc13',
    decimals: 18,
    network: 'Polygon',
    icon: '⚡',
    category: 'dex'
  },

  {
    symbol: 'JOE',
    name: 'Trader Joe',
    address: '0x6e84a6216eA6dACC71eE8E6b0a5B7322EEbC0fDd',
    decimals: 18,
    network: 'Avalanche',
    icon: '☕',
    category: 'dex'
  },

  {
    symbol: 'RAY',
    name: 'Raydium',
    address: '4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R',
    decimals: 6,
    network: 'Solana',
    icon: '🌞',
    category: 'dex'
  },
];