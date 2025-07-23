import React from 'react';
import type { ImgHTMLAttributes, SVGProps } from 'react';

// Generic component for external image icons (Chains, Tokens, Bridges)
const ImgIcon = (props: ImgHTMLAttributes<HTMLImageElement>) => (
    <img alt="" {...props} />
);

// Asset Icons (pointing to where user can upload PNGs)
export const LogoIcon = (props: ImgHTMLAttributes<HTMLImageElement>) => <ImgIcon src="/icons/logo.png" {...props} />;
export const UsdtIcon = (props: ImgHTMLAttributes<HTMLImageElement>) => <ImgIcon src="/icons/usdt.png" {...props} />;
export const UsdcIcon = (props: ImgHTMLAttributes<HTMLImageElement>) => <ImgIcon src="/icons/usdc.png" {...props} />;

export const EthereumIcon = (props: ImgHTMLAttributes<HTMLImageElement>) => <ImgIcon src="/icons/ethereum.png" {...props} />;
export const ArbitrumIcon = (props: ImgHTMLAttributes<HTMLImageElement>) => <ImgIcon src="/icons/arbitrum.png" {...props} />;
export const PolygonIcon = (props: ImgHTMLAttributes<HTMLImageElement>) => <ImgIcon src="/icons/polygon.png" {...props} />;
export const OptimismIcon = (props: ImgHTMLAttributes<HTMLImageElement>) => <ImgIcon src="/icons/optimism.png" {...props} />;
export const BscIcon = (props: ImgHTMLAttributes<HTMLImageElement>) => <ImgIcon src="/icons/bsc.png" {...props} />;
export const AvalancheIcon = (props: ImgHTMLAttributes<HTMLImageElement>) => <ImgIcon src="/icons/avalanche.png" {...props} />;
export const SolanaIcon = (props: ImgHTMLAttributes<HTMLImageElement>) => <ImgIcon src="/icons/solana.png" {...props} />;
export const TronIcon = (props: ImgHTMLAttributes<HTMLImageElement>) => <ImgIcon src="/icons/tron.png" {...props} />;
export const SuiIcon = (props: ImgHTMLAttributes<HTMLImageElement>) => <ImgIcon src="/icons/sui.png" {...props} />;
export const NearIcon = (props: ImgHTMLAttributes<HTMLImageElement>) => <ImgIcon src="/icons/near.png" {...props} />;
export const CroIcon = (props: ImgHTMLAttributes<HTMLImageElement>) => <ImgIcon src="/icons/cro.png" {...props} />;
export const BaseIcon = (props: ImgHTMLAttributes<HTMLImageElement>) => <ImgIcon src="/icons/base.png" {...props} />;
export const GnosisIcon = (props: ImgHTMLAttributes<HTMLImageElement>) => <ImgIcon src="/icons/gnosis.png" {...props} />;
export const FantomIcon = (props: ImgHTMLAttributes<HTMLImageElement>) => <ImgIcon src="/icons/fantom.png" {...props} />;
export const PolygonZkEvmIcon = (props: ImgHTMLAttributes<HTMLImageElement>) => <ImgIcon src="/icons/polygon-zkevm.png" {...props} />;
export const ZkSyncIcon = (props: ImgHTMLAttributes<HTMLImageElement>) => <ImgIcon src="/icons/zksync.png" {...props} />;
export const LineaIcon = (props: ImgHTMLAttributes<HTMLImageElement>) => <ImgIcon src="/icons/linea.png" {...props} />;


export const StargateIcon = (props: ImgHTMLAttributes<HTMLImageElement>) => <ImgIcon src="/icons/stargate.png" {...props} />;
export const SynapseIcon = (props: ImgHTMLAttributes<HTMLImageElement>) => <ImgIcon src="/icons/synapse.png" {...props} />;
export const WormholeIcon = (props: ImgHTMLAttributes<HTMLImageElement>) => <ImgIcon src="/icons/wormhole.png" {...props} />;
export const RelayIcon = (props: ImgHTMLAttributes<HTMLImageElement>) => <ImgIcon src="/icons/relay.png" {...props} />;
export const CCTPIcon = (props: ImgHTMLAttributes<HTMLImageElement>) => <ImgIcon src="/icons/cctp.png" {...props} />;
export const CelerIcon = (props: ImgHTMLAttributes<HTMLImageElement>) => <ImgIcon src="/icons/celer.png" {...props} />;
export const MayanIcon = (props: ImgHTMLAttributes<HTMLImageElement>) => <ImgIcon src="/icons/mayan.png" {...props} />;
export const AcrossIcon = (props: ImgHTMLAttributes<HTMLImageElement>) => <ImgIcon src="/icons/across.png" {...props} />;
export const HopIcon = (props: ImgHTMLAttributes<HTMLImageElement>) => <ImgIcon src="/icons/hop.png" {...props} />;
export const HyphenIcon = (props: ImgHTMLAttributes<HTMLImageElement>) => <ImgIcon src="/icons/hyphen.png" {...props} />;
export const ConnextIcon = (props: ImgHTMLAttributes<HTMLImageElement>) => <ImgIcon src="/icons/connext.png" {...props} />;
export const DebridgeIcon = (props: ImgHTMLAttributes<HTMLImageElement>) => <ImgIcon src="/icons/debridge.png" {...props} />;
export const BaseBridgeIcon = (props: ImgHTMLAttributes<HTMLImageElement>) => <ImgIcon src="/icons/base.png" {...props} />;

export const SocketIcon = (props: ImgHTMLAttributes<HTMLImageElement>) => <ImgIcon src="/icons/socket.png" {...props} />;


// Wallet Icons
export const MetaMaskIcon = (props: ImgHTMLAttributes<HTMLImageElement>) => <ImgIcon src="/icons/metamask.png" {...props} />;
export const CoinbaseWalletIcon = (props: ImgHTMLAttributes<HTMLImageElement>) => <ImgIcon src="/icons/coinbase.png" {...props} />;
export const PhantomIcon = (props: ImgHTMLAttributes<HTMLImageElement>) => <ImgIcon src="/icons/phantom.png" {...props} />;
export const SolflareIcon = (props: ImgHTMLAttributes<HTMLImageElement>) => <ImgIcon src="/icons/solflare.png" {...props} />;
export const TronLinkIcon = (props: ImgHTMLAttributes<HTMLImageElement>) => <ImgIcon src="/icons/tronlink.png" {...props} />;
export const SuietIcon = (props: ImgHTMLAttributes<HTMLImageElement>) => <ImgIcon src="/icons/suiet.png" {...props} />;
export const SuiWalletIcon = (props: ImgHTMLAttributes<HTMLImageElement>) => <ImgIcon src="/icons/sui.png" {...props} />; // Re-using SUI icon
export const NearWalletIcon = (props: ImgHTMLAttributes<HTMLImageElement>) => <ImgIcon src="/icons/near.png" {...props} />; // Re-using NEAR icon
export const OkxWalletIcon = (props: ImgHTMLAttributes<HTMLImageElement>) => <ImgIcon src="/icons/okx.png" {...props} />;
export const CryptoComWalletIcon = (props: ImgHTMLAttributes<HTMLImageElement>) => <ImgIcon src="/icons/crypto.png" {...props} />;
export const BinanceWalletIcon = (props: ImgHTMLAttributes<HTMLImageElement>) => <ImgIcon src="/icons/binance.png" {...props} />;


// UI Icons (as clean SVGs for better styling and performance)
export const GithubIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" {...props}>
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
  </svg>
);

export const ArrowDownIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
        <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
    </svg>
);

export const SparklesIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.572L16.25 22l-.648-1.428a2.25 2.25 0 01-1.49-1.49L12.75 18l1.428-.648a2.25 2.25 0 011.49-1.49L16.25 14l.648 1.428a2.25 2.25 0 011.49 1.49L20 18l-1.428.648a2.25 2.25 0 01-1.49 1.49z" />
    </svg>
);

export const LoadingSpinner = (props: SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" {...props} className={"animate-spin " + (props.className || '')}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0011.667 0l3.181-3.183m-11.667-11.667l3.181 3.183m0 0l-3.181 3.183m0 0l3.181-3.183m0 0h4.992M10.343 3.343v4.992m0 0h4.993m-4.993 0l-3.181-3.183a8.25 8.25 0 00-11.667 0l-3.181 3.183" />
    </svg>
);

export const WalletIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25-2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3" />
    </svg>
);

export const CheckCircleIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

export const XCircleIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

export const XMarkIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

export const InformationCircleIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.852l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

export const BestRateIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.75A.75.75 0 013 4.5h.75m0 0h.75A.75.75 0 015.25 6v.75m0 0v.75A.75.75 0 014.5 8.25h-.75m0 0h-.75A.75.75 0 012.25 7.5v-.75M3 15v-2.25A.75.75 0 013.75 12h.75m0 0h.75A.75.75 0 016 12.75v2.25m0 0v.75A.75.75 0 015.25 16.5h-.75m0 0h-.75a.75.75 0 01-.75-.75v-.75m3.75-9h.75a.75.75 0 01.75.75v.75m0 0v.75a.75.75 0 01-.75.75h-.75m0 0H9m9 6h.75a.75.75 0 01.75.75v.75m0 0v.75a.75.75 0 01-.75.75h-.75m0 0h-3v-3h3m0 0h.75a.75.75 0 01.75.75v.75m0 0v.75a.75.75 0 01-.75.75h-.75m0 0H9" />
    </svg>
);

export const FastestRouteIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
    </svg>
);

export const UnknownIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
    </svg>
);

export const HistoryIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);