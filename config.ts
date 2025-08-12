// Project configuration for the cross-chain information aggregator

export const PROJECT_CONFIG = {
  name: 'The Project',
  version: 'v3.0.0',
  description: 'Cross-chain bridge information aggregator',
  isInformationalOnly: true,
  disclaimer: 'This platform provides information only and does not execute transactions.',
  repositoryUrl: 'https://github.com/21104988d/the-project_v2',
};

// Bridge API endpoints for information aggregation
export const BRIDGE_API_ENDPOINTS = {
  stargate: {
    mainnet: 'https://api.stargate.finance',
    testnet: 'https://api-testnet.stargate.finance',
  },
  hop: {
    mainnet: 'https://api.hop.exchange',
    testnet: 'https://api-goerli.hop.exchange',
  },
  celer: {
    mainnet: 'https://cbridge-prod2.celer.app',
    testnet: 'https://cbridge-v2-test.celer.network',
  },
  wormhole: {
    mainnet: 'https://api.wormhole.com',
    testnet: 'https://api.testnet.wormhole.com',
  },
  across: {
    mainnet: 'https://across.to/api',
    testnet: 'https://testnet.across.to/api',
  },
  // Add more bridge APIs as needed
};

// Rate limiting and caching configuration
export const API_CONFIG = {
  quoteCacheTime: 30000, // 30 seconds
  bridgeDataCacheTime: 300000, // 5 minutes
  maxRetries: 3,
  retryDelay: 1000, // 1 second
  requestTimeout: 10000, // 10 seconds
};

// Feature flags for development
export const FEATURE_FLAGS = {
  enableRealBridgeAPIs: false, // Set to true when implementing real API calls
  enablePriceData: false, // Future feature
  enableMultiLanguage: false, // Future feature
};

// Network configuration for display purposes only
export const NETWORK_CONFIG = {
  ethereum: {
    rpcUrl: 'https://eth-mainnet.alchemyapi.io/v2/your-api-key',
    explorerUrl: 'https://etherscan.io',
    explorerTxPath: '/tx/',
  },
  arbitrum: {
    rpcUrl: 'https://arb-mainnet.g.alchemy.com/v2/your-api-key',
    explorerUrl: 'https://arbiscan.io',
    explorerTxPath: '/tx/',
  },
  polygon: {
    rpcUrl: 'https://polygon-mainnet.g.alchemy.com/v2/your-api-key',
    explorerUrl: 'https://polygonscan.com',
    explorerTxPath: '/tx/',
  },
  // Add more networks as needed
};