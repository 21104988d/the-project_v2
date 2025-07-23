import type { WalletStandard } from './types';

// === CONFIGURATION ===
// This file contains the core configuration for the application.
// You MUST update these values before deployment.

/**
 * A mapping of blockchain standards to your deployed FeeManager smart contract addresses.
 * This allows the dApp to collect fees on multiple, different blockchain ecosystems
 * by using the correct contract for each one.
 * 
 * - The 'evm' address will be used for all EVM-compatible chains (Ethereum, Polygon, etc.).
 * - The 'solana' address will be used for Solana.
 * - Add entries for other standards ('tron', 'sui', 'near') as you deploy contracts for them.
 * 
 * If an address is not provided for a specific standard, fees will be automatically
 * disabled for swaps to chains of that type.
 * 
 * IMPORTANT: These are placeholder addresses. You must replace them with your
 * actual deployed contract addresses to collect fees.
 */
export const FEE_MANAGER_CONTRACT_ADDRESSES: { [key in WalletStandard]?: string } = {
  'evm': '0x34a52862569c6230419357418a02a90503023a1b',
  'solana': 'FEESarL3iGjWbEa1d2t6jWau1EXNf6C1j5aPjKk2zQz',
  // 'tron': 'YOUR_TRON_FEE_CONTRACT_ADDRESS_HERE',
  // 'sui': 'YOUR_SUI_FEE_CONTRACT_ADDRESS_HERE',
  // 'near': 'YOUR_NEAR_FEE_CONTRACT_NAME_HERE',
};


/**
 * The service fee you want to charge, in basis points (BPS).
 * 1 basis point = 0.01%.
 * For example, a value of 50 means a 0.50% service fee.
 * 
 * This fee is calculated from the swap amount and sent to the appropriate
 * fee contract address from the map above.
 */
export const SERVICE_FEE_BPS: number = 50; // 50 BPS = 0.5%