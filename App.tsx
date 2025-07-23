import React, { useState, useCallback, useEffect } from 'react';
import { FEE_MANAGER_CONTRACT_ADDRESSES } from './config';
import { SwapCard } from './components/SwapCard';
import { ConnectWalletButton } from './components/ConnectWalletButton';
import { TransactionStatusModal } from './components/TransactionStatusModal';
import { TokenSelector } from './components/TokenSelector';
import { InfoModal } from './components/InfoModal';
import { ConnectWalletModal } from './components/ConnectWalletModal';
import { TransactionHistory } from './components/TransactionHistory';
import { LogoIcon, GithubIcon, HistoryIcon } from './components/Icons';
import type { Token, TransactionStatus, Route, TransactionRecord } from './types';
import { TOKENS, WALLET_PROVIDERS } from './constants';
import { ethers } from 'ethers';
import { saveTransaction } from './services/historyService';

declare global {
  interface Window {
    ethereum?: any;
    solana?: any;
    tronWeb?: any;
    suiWallet?: any; 
    suiet?: any;
    phantom?: { solana: any };
    solflare?: { solana: any };
    coinbaseWalletExtension?: any;
    okxwallet?: any;
    crypto?: { ethereum: any };
    BinanceChain?: any;
  }
}

export default function App(): React.ReactNode {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [userAddress, setUserAddress] = useState<string | null>(null);
  const [activeProviderId, setActiveProviderId] = useState<string | null>(null);

  const [transactionStatus, setTransactionStatus] = useState<TransactionStatus>('idle');
  const [txHash, setTxHash] = useState<string | null>(null);

  const [fromToken, setFromToken] = useState<Token>(TOKENS[0]); // Default USDT on Ethereum
  const [toToken, setToToken] = useState<Token>(TOKENS[3]); // Default USDC on Arbitrum

  // Solana warning state
  const [solanaWarning, setSolanaWarning] = useState<string | null>(null);

  const [fromTokenBalance, setFromTokenBalance] = useState<string | null>(null);

  const [isFromSelectorOpen, setIsFromSelectorOpen] = useState(false);
  const [isToSelectorOpen, setIsToSelectorOpen] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [infoModalContent, setInfoModalContent] = useState({ title: '', message: '' });

  const showInfoModal = useCallback((title: string, message: string) => {
    setInfoModalContent({ title, message });
    setIsInfoModalOpen(true);
  }, []);

  const fetchEvmBalance = useCallback(async (token: Token, address: string) => {
    let rawProvider: any;
    
    switch(activeProviderId) {
        case 'metamask': rawProvider = window.ethereum; break;
        case 'coinbase': rawProvider = window.coinbaseWalletExtension; break;
        case 'okxwallet': rawProvider = window.okxwallet; break;
        case 'cryptocom': rawProvider = window.crypto?.ethereum; break;
        case 'binancewallet': rawProvider = window.BinanceChain; break;
        default: rawProvider = window.ethereum; // Default fallback
    }

    if (!rawProvider) {
      console.error(`EVM provider (${activeProviderId || 'default'}) not available for balance check.`);
      setFromTokenBalance('N/A');
      return;
    }
    
    const provider = new ethers.BrowserProvider(rawProvider);

    try {
      if (!token.contractAddress) { // Native asset (ETH) balance
        const balance = await provider.getBalance(address);
        setFromTokenBalance(ethers.formatUnits(balance, token.decimals).substring(0, 6));
      } else { // ERC20 token balance
        const erc20Abi = ["function balanceOf(address owner) view returns (uint256)"];
        const contract = new ethers.Contract(token.contractAddress, erc20Abi, provider);
        const balance = await contract.balanceOf(address);
        setFromTokenBalance(ethers.formatUnits(balance, token.decimals).substring(0, 6));
      }
    } catch (error) {
      console.error("Failed to fetch EVM balance:", error);
      setFromTokenBalance('0.00');
    }
  }, [activeProviderId]);

  const fetchSolanaBalance = useCallback(async (token: Token, address: string) => {
    // Check if Solana contract address is configured
    if (!FEE_MANAGER_CONTRACT_ADDRESSES['solana'] || FEE_MANAGER_CONTRACT_ADDRESSES['solana'].includes('YourSolanaFeeVaultPublicKey') || FEE_MANAGER_CONTRACT_ADDRESSES['solana'].startsWith('FEESarL3iGjWbEa1d2t6jWau1EXNf6C1j5aPjKk2zQz')) {
      setSolanaWarning('Solana features are unavailable: Solana contract is not deployed or configured.');
      setFromTokenBalance('0.00');
      return;
    }
    // Placeholder: In production, fetch from Solana RPC or use @solana/web3.js
    setFromTokenBalance('123.45');
  }, []);


  const fetchTronBalance = useCallback(async (token: Token, address: string) => {
    if (!window.tronWeb || !window.tronWeb.ready) {
      setFromTokenBalance('0.00');
      return;
    }
    try {
      if (token.contractAddress) { // TRC20 token
          const contract = await window.tronWeb.contract().at(token.contractAddress);
          const balanceBigNumber = await contract.balanceOf(address).call();
          const balance = (Number(BigInt(balanceBigNumber.toString())) / (10 ** token.decimals)).toFixed(4);
          setFromTokenBalance(balance);
      } else { // Native TRX
          const balanceInSun = await window.tronWeb.trx.getBalance(address);
          const balance = (balanceInSun / (10 ** token.decimals)).toFixed(4);
          setFromTokenBalance(balance);
      }
    } catch (error) {
        console.error("Failed to fetch Tron balance:", error);
        setFromTokenBalance('0.00');
    }
  }, []);

  const fetchSuiBalance = useCallback(async (token: Token, address: string) => {
    console.warn("Sui balance fetching is not implemented and uses a placeholder value.");
    setFromTokenBalance('345.67');
  }, []);

  const fetchNearBalance = useCallback(async (token: Token, address:string) => {
    console.warn("NEAR balance fetching is not implemented and uses a placeholder value.");
    setFromTokenBalance('456.78');
  }, []);


  const fetchBalance = useCallback(async (token: Token, address: string) => {
    setFromTokenBalance(null);
    switch (token.chain.walletStandard) {
      case 'evm':
        await fetchEvmBalance(token, address);
        break;
      case 'solana':
        await fetchSolanaBalance(token, address);
        break;
      case 'tron':
        await fetchTronBalance(token, address);
        break;
      case 'sui':
        await fetchSuiBalance(token, address);
        break;
      case 'near':
        await fetchNearBalance(token, address);
        break;
      default:
        console.error(`Unsupported chain standard for balance fetch: ${token.chain.walletStandard}`);
        setFromTokenBalance('N/A');
    }
  }, [fetchEvmBalance, fetchSolanaBalance, fetchTronBalance, fetchSuiBalance, fetchNearBalance]);


  useEffect(() => {
    if (isWalletConnected && userAddress && fromToken) {
      fetchBalance(fromToken, userAddress);
    } else {
      setFromTokenBalance(null);
    }
  }, [isWalletConnected, userAddress, fromToken, fetchBalance]);
  
  const handleConnect = useCallback(async (providerId: string) => {
    setIsConnectModalOpen(false);
    const providerInfo = WALLET_PROVIDERS.find(p => p.id === providerId);
    if (!providerInfo) {
      showInfoModal('Connection Error', 'Selected wallet provider is not supported.');
      return;
    }

    try {
      let address: string | null = null;
      let accounts: string[] = [];
      
      switch (providerId) {
        // Injected EVM Wallets
        case 'metamask':
        case 'coinbase':
        case 'okxwallet':
        case 'cryptocom':
        case 'binancewallet':
            let injectedProvider: any;
            switch(providerId) {
                case 'metamask': injectedProvider = window.ethereum; break;
                case 'coinbase': injectedProvider = window.coinbaseWalletExtension; break;
                case 'okxwallet': injectedProvider = window.okxwallet; break;
                case 'cryptocom': injectedProvider = window.crypto?.ethereum; break;
                case 'binancewallet': injectedProvider = window.BinanceChain; break;
            }
            if (!injectedProvider) {
                showInfoModal('Wallet Not Found', `Please install ${providerInfo.name}.`);
                return;
            }
            accounts = await injectedProvider.request({ method: 'eth_requestAccounts' });
            if (accounts.length > 0) address = accounts[0];
            break;
          
        // Solana
        case 'phantom':
        case 'solflare':
           const solProvider = providerId === 'phantom' ? window.phantom?.solana : window.solflare;
           if (!solProvider) {
             showInfoModal('Wallet Not Found', `Please install ${providerInfo.name}.`);
             return;
           }
           const solResp = await solProvider.connect();
           address = solResp.publicKey.toString();
           break;

        // Tron
        case 'tronlink':
          if (!window.tronWeb || !window.tronWeb.ready) {
            showInfoModal('Wallet Not Found', 'Please install TronLink.');
            return;
          }
          const tronResp = await window.tronWeb.request({ method: 'tron_requestAccounts' });
          if (tronResp.code === 200) {
             address = window.tronWeb.defaultAddress.base58;
          } else {
             throw new Error('Could not connect to TronLink.');
          }
          break;

        // Sui
        case 'suiet':
        case 'suiwallet':
          const suiProvider = providerId === 'suiet' ? (window as any).suiet : (window as any).suiWallet;
          if (!suiProvider) {
              showInfoModal('Wallet Not Found', `Please install ${providerInfo.name}.`);
              return;
          }
          await suiProvider.connect();
          const suiAccounts = await suiProvider.getAccounts();
          if (suiAccounts.length > 0) address = suiAccounts[0];
          break;
        
        case 'nearwallet':
            showInfoModal('Coming Soon', 'NEAR Wallet connection involves a redirect flow and is currently under development.');
            return;
            
        default:
          showInfoModal('Unsupported Wallet', `The wallet ${providerInfo.name} is not integrated yet.`);
          return;
      }
      
      if (address) {
        setUserAddress(address);
        setIsWalletConnected(true);
        setActiveProviderId(providerId);
      } else {
        showInfoModal('Connection Error', 'No accounts found. Please ensure your wallet is set up correctly.');
      }
    } catch (error: any) {
      console.error(`Failed to connect with ${providerInfo.name}:`, error);
      showInfoModal('Connection Failed', error.message || `Failed to connect with ${providerInfo.name}. Please try again.`);
    }
  }, [showInfoModal]);


  const handleDisconnect = () => {
    setIsWalletConnected(false);
    setUserAddress(null);
    setFromTokenBalance(null);
    setActiveProviderId(null);
  };

  const handleSwap = useCallback(async (route: Route, receiverAddress: string) => {
    setTransactionStatus('pending');
    console.log("Swapping with receiver address:", receiverAddress, "using route:", route);
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    const mockTxHash = `0x${[...Array(64)].map(() => Math.floor(Math.random() * 16).toString(16)).join('')}`;
    setTxHash(mockTxHash);

    await new Promise(resolve => setTimeout(resolve, 3000));
    setTransactionStatus('success');

    if (userAddress) {
      saveTransaction({
        fromToken,
        toToken,
        fromAmount: route.fromAmount,
        toAmount: route.toAmount,
        senderAddress: userAddress,
        receiverAddress,
        txHash: mockTxHash,
        serviceFee: route.serviceFee,
        gasFee: route.gasFee,
        status: 'success',
      });
    }

  }, [userAddress, fromToken, toToken]);
  
  const resetTransaction = () => {
    setTransactionStatus('idle');
    setTxHash(null);
  };

  const handleSelectFromToken = (token: Token) => {
    if (token.id === toToken.id) {
      setToToken(fromToken);
    }
    setFromToken(token);
    setIsFromSelectorOpen(false);
  };
  
  const handleSelectToToken = (token: Token) => {
    if (token.id === fromToken.id) {
      setFromToken(toToken);
    }
    setToToken(token);
    setIsToSelectorOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-200 flex flex-col items-center relative overflow-hidden">
      {solanaWarning && (
        <div style={{ background: '#fff3cd', color: '#856404', padding: '12px', borderRadius: '6px', margin: '16px 0', border: '1px solid #ffeeba' }}>
          <strong>Warning:</strong> {solanaWarning}
        </div>
      )}
      <div className="absolute top-0 left-0 w-full h-full bg-grid-slate-800/20 [mask-image:linear-gradient(to_bottom,white_5%,transparent_50%)]"></div>
      
      <header className="w-full max-w-6xl mx-auto flex justify-between items-center p-4 z-10">
        <div className="flex items-center gap-3">
          <LogoIcon className="h-10 w-10" />
          <h1 className="text-2xl tracking-tighter">
            <span className="font-semibold text-slate-400">the </span>
            <span className="font-bold text-brand-primary">Project</span>
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setIsHistoryModalOpen(true)} 
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors"
            aria-label="Transaction History"
          >
            <HistoryIcon className="h-6 w-6 text-slate-300" />
          </button>
          <ConnectWalletButton
            isConnected={isWalletConnected}
            address={userAddress}
            onConnect={() => setIsConnectModalOpen(true)}
            onDisconnect={handleDisconnect}
          />
        </div>
      </header>

      <main className="w-full flex-grow flex items-start justify-center p-4 z-10">
        <div className="w-full max-w-md">
            <SwapCard 
                isWalletConnected={isWalletConnected}
                userAddress={userAddress}
                fromToken={fromToken}
                toToken={toToken}
                fromTokenBalance={fromTokenBalance}
                onConnectWallet={() => setIsConnectModalOpen(true)}
                onSwap={handleSwap}
                onFromTokenSelect={() => setIsFromSelectorOpen(true)}
                onToTokenSelect={() => setIsToSelectorOpen(true)}
            />
        </div>
      </main>

      <footer className="w-full text-center p-4 text-slate-500 z-10">
         <a href="https://github.com/21104988d/project1" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-slate-300 transition-colors">
            <GithubIcon className="h-5 w-5" />
            <span>Cross-Chain Swaps</span>
         </a>
      </footer>

      <TransactionStatusModal
        status={transactionStatus}
        txHash={txHash}
        isOpen={transactionStatus !== 'idle' && transactionStatus !== 'loading'}
        onClose={resetTransaction}
        sourceChain={fromToken.chain}
      />
      
      <TokenSelector 
        isOpen={isFromSelectorOpen} 
        onClose={() => setIsFromSelectorOpen(false)}
        onSelect={handleSelectFromToken}
        title="Send from"
      />
      
      <TokenSelector 
        isOpen={isToSelectorOpen} 
        onClose={() => setIsToSelectorOpen(false)}
        onSelect={handleSelectToToken}
        title="Receive on"
      />
      
      <InfoModal
        isOpen={isInfoModalOpen}
        title={infoModalContent.title}
        message={infoModalContent.message}
        onClose={() => setIsInfoModalOpen(false)}
      />
      
      <ConnectWalletModal
        isOpen={isConnectModalOpen}
        onClose={() => setIsConnectModalOpen(false)}
        onConnect={handleConnect}
        chain={fromToken.chain}
      />

      <TransactionHistory
        isOpen={isHistoryModalOpen}
        onClose={() => setIsHistoryModalOpen(false)}
      />
    </div>
  );
}