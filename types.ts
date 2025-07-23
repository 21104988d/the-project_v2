import type { ReactNode } from 'react';

export interface Aggregator {
  id: string;
  name: string;
  icon: ReactNode;
  supportedChainIds: Set<number>;
}

export type WalletStandard = 'evm' | 'solana' | 'tron' | 'sui' | 'near';

export interface WalletProvider {
  id:string;
  name: string;
  icon: ReactNode;
  standard: WalletStandard;
}

export interface Chain {
  id: string;
  name: string;
  icon: ReactNode;
  walletStandard: WalletStandard;
  blockExplorerUrl?: string;
  blockExplorerTxPath?: string; // e.g., '/tx/' or '/#/transaction/'
  socketChainId: number;
  isSupported: boolean;
}

export interface Token {
  id:string;
  symbol: string;
  name: string;
  chain: Chain;
  icon: ReactNode;
  decimals: number;
  contractAddress?: string; // Undefined for native assets like ETH, SOL, TRX
}

export interface Bridge {
  name: string;
  icon: ReactNode;
}

export interface Route {
  bridge: Bridge;
  rate: number;
  fromAmount: string;
  toAmount: string;
  gasFee: string;
  serviceFee: string;
  aggregatorFee?: string;
  estimatedTime: number; // in minutes
  aggregator: Aggregator;
}

export type TransactionStatus = 'idle' | 'loading' | 'pending' | 'success' | 'error';

export interface TransactionRecord {
  id: string; // Using txHash for uniqueness
  timestamp: number;
  fromToken: Token;
  toToken: Token;
  fromAmount: string;
  toAmount: string;
  senderAddress: string;
  receiverAddress: string;
  txHash: string;
  serviceFee: string;
  gasFee: string;
  status: 'success'; // We only log successful transactions
}