# The Project - Cross-Chain Bridge Information Aggregator

This repository contains a **frontend-only dApp** that functions as an informational aggregator for cross-chain bridge options. It displays publicly available data from various bridge providers to help users compare routes and fees before redirecting them to official bridge websites.

## Architecture Overview

- **Frontend**: A static React application built with TypeScript and Vite
- **Information Aggregation**: The frontend queries bridge APIs to display routing options
- **No Backend**: This is a client-side only application with no server requirements
- **No Smart Contracts**: The app displays information only - all transactions happen on external bridge websites

---

## 1. Prerequisites

You only need Node.js and a web browser for this project.

- **Node.js (v18+) and npm**: Required for running the development server and building the app.
  ```bash
  # Install nvm (Node Version Manager) - macOS/Linux
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
  
  # Close and reopen your terminal, then install Node.js
  nvm install --lts
  nvm use --lts
  
  # Verify installation
  node --version
  npm --version
  ```

- **Git**: For cloning the repository.
  ```bash
  # On macOS (using Homebrew)
  brew install git

  # On Debian/Ubuntu
  sudo apt-get update
  sudo apt-get install git
  ```

---

## 2. Initial Setup

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/21104988d/the-project_v2.git
    cd the-project_v2
    ```

2.  **Clean Up Unused Files** (Optional)
    ```bash
    # Make the cleanup script executable and run it
    chmod +x cleanup.sh
    ./cleanup.sh
    ```

3.  **Install Dependencies**
    ```bash
    npm install
    ```

4.  **Set Up Icons** (Critical Step)
    
    The app requires cryptocurrency and wallet icons to display properly:
    
    ```bash
    # Create the icons directory
    mkdir -p public/icons/
    ```
    
    Download icons from https://cryptologos.cc/ and place them in `public/icons/`. See the detailed list in `/public/icons/README.md`.
    
    **Required icons for basic functionality:**
    - `usdt.png`, `usdc.png` (tokens)
    - `ethereum.png`, `arbitrum.png`, `polygon.png` (chains)
    - `metamask.png`, `phantom.png` (wallets)
    - `logo.png` (your custom project logo)

5.  **Start Development Server**
    ```bash
    npx vite
    ```
    
    If you see a prompt to install Vite, type `y` and press Enter.
    
    When successful, you'll see:
    ```
    VITE v7.0.5  ready in ... ms
    ➜  Local:   http://localhost:5173/
    ➜  Network: use --host to expose
    ```
    
    Open http://localhost:5173/ in your browser.

---

## 3. Project Structure

```
project-root/
├── components/           # React UI components
│   ├── SwapCard.tsx     # Main swap interface
│   ├── TokenSelector.tsx # Token selection modal
│   ├── ConnectWalletModal.tsx # Wallet connection
│   └── ...              # Other UI components
├── services/            # Data services
│   ├── routingService.ts # Bridge data aggregation
│   ├── walletService.ts # Wallet connections
│   └── historyService.ts # Local transaction history
├── public/              # Static assets
│   ├── icons/          # Cryptocurrency and wallet icons
│   └── favicon.ico     # Browser favicon
├── types.ts            # TypeScript type definitions
├── constants.ts        # App configuration and constants
├── config.ts           # Contract addresses (display only)
├── App.tsx             # Main application component
├── main.tsx            # Application entry point
├── index.css           # Global styles
├── index.html          # HTML template
├── README.md           # Project documentation
├── setup_guide.md      # This file
├── to_do_checklist.md  # Asset setup checklist
└── package.json        # Dependencies and scripts
```

---

## 4. Configuration

### Update Token and Chain Support

Edit `constants.ts` to add or modify supported tokens and chains:

```typescript
// Add new tokens
export const TOKENS: Token[] = [
  {
    id: 'usdt-ethereum',
    symbol: 'USDT',
    name: 'Tether USD',
    chain: CHAINS.ethereum,
    // ... other properties
  },
  // Add your tokens here
];

// Add new chains
export const CHAINS = {
  ethereum: {
    id: 1,
    name: 'Ethereum',
    // ... other properties
  },
  // Add your chains here
};
```

### Update Bridge Providers

Edit `services/routingService.ts` to add or modify bridge integrations:

```typescript
export async function getQuotes(
  fromAmount: string,
  fromToken: Token,
  toToken: Token
): Promise<Route[]> {
  // Add your bridge API integrations here
  // This is where you would call actual bridge APIs
  // Currently uses mock data for demonstration
}
```

---

## 5. Building for Production

1.  **Build the Application**
    ```bash
    npx vite build
    ```
    
    This creates a `dist/` folder with optimized static files.

2.  **Serve Locally** (for testing)
    ```bash
    # Install serve globally
    npm install -g serve
    
    # Serve the built files
    serve dist
    ```
    
    Open the provided URL (usually http://localhost:3000) to test the production build.

3.  **Deploy to Static Hosting**
    
    Upload the `dist/` folder to any static hosting provider:
    - GitHub Pages
    - Netlify
    - Vercel
    - AWS S3 + CloudFront
    - Any web server

---

## 6. Customization

### Branding
- Replace `/public/icons/logo.png` with your project logo
- Update colors in `index.css` (search for `--brand-primary`)
- Modify the project name in `App.tsx` and `package.json`

### Supported Wallets
Edit `constants.ts` to add or remove wallet providers:

```typescript
export const WALLET_PROVIDERS: WalletProvider[] = [
  {
    id: 'metamask',
    name: 'MetaMask',
    icon: <MetaMaskIcon className="h-8 w-8" />,
    supportedStandards: ['evm'],
  },
  // Add your wallet providers here
];
```

### Bridge Integrations
Implement real bridge API calls in `services/routingService.ts`:

```typescript
// Example: Real Stargate API integration
const stargateQuote = await fetch('https://api.stargate.finance/quote', {
  method: 'POST',
  body: JSON.stringify({
    fromChain: fromToken.chain.id,
    toChain: toToken.chain.id,
    amount: fromAmount,
    // ... other parameters
  })
});
```

---

## 7. Troubleshooting

### Common Issues

**Missing Icons / Black Screen**
- Ensure all required icons are in `/public/icons/`
- Check browser console for 404 errors
- Verify icon filenames match exactly with `components/Icons.tsx`

**Wallet Connection Issues**
- Install browser wallet extensions (MetaMask, Phantom, etc.)
- Check that wallets are unlocked and on the correct network
- Verify wallet detection in browser console

**Build Errors**
- Run `npm install` to ensure all dependencies are installed
- Check for TypeScript errors: `npx tsc --noEmit`
- Verify all imported files exist

**Development Server Issues**
- Clear cache: `rm -rf node_modules/.cache/`
- Restart development server: `npx vite`
- Check port 5173 is not in use by another application

### Getting Help

1. Check the browser console for detailed error messages
2. Verify all prerequisites are installed correctly
3. Ensure the `public/icons/` directory contains all required files
4. Review the `to_do_checklist.md` for asset setup requirements

---

## 8. Next Steps

1. **Complete Icon Setup**: Download all required icons from https://cryptologos.cc/
2. **Customize Branding**: Replace logos and colors with your brand
3. **Integrate Real APIs**: Replace mock data with actual bridge API calls
4. **Add More Bridges**: Expand the list of supported bridge providers
5. **Deploy**: Upload to your preferred static hosting platform

---

**Quick Start Summary:**
```bash
git clone https://github.com/21104988d/the-project_v2.git
cd the-project_v2
npm install
mkdir -p public/icons/
# Download icons from https://cryptologos.cc/
npx vite
# Open http://localhost:5173/
```

_Building transparent and accessible informational tools for the multi-chain world._