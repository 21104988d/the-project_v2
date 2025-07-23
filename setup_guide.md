# The Project - Cross-Chain Swap Aggregator

This repository contains a powerful dApp that functions as a cross-chain swap aggregator. It is designed to find the most efficient routes for swapping crypto assets by connecting directly to multiple cross-chain bridges. The dApp features a robust, multi-chain architecture for collecting service fees, with distinct smart contracts for different blockchain ecosystems.

## Architecture Overview

- **Frontend**: A client-side application built with React and TypeScript. It does not require a dedicated backend server.
- **Routing Engine**: The frontend directly queries multiple bridge APIs (simulated as direct integrations) in parallel to find the best swap routes for the user.
- **Fee Collection**: Service fees are handled by a set of on-chain smart contracts. The dApp is designed to use a specific fee contract based on the destination chain of the swap, allowing for a mix of EVM (Solidity), Solana (Rust), Tron (Solidity), Sui (Move), and NEAR (Rust) contracts.

---

## 1. Prerequisites

Before you begin, you must install the necessary toolchains for all supported ecosystems on your development machine using your terminal.

- **Node.js and npm**: Required for running the frontend and EVM deployment scripts. We recommend using a version manager like `nvm`.
  ```bash
  # Install nvm (Node Version Manager)

  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
  
  # Close and reopen your terminal, then install and use the latest LTS version of Node.js
  nvm install --lts
  nvm use --lts



  ```

- **Git**: For cloning the repository.
  ```bash
  # On macOS (using Homebrew)
  brew install git

  # On Debian/Ubuntu
  sudo apt-get update
  sudo apt-get install git
  ```

- **Rust & Cargo**: Required for building Solana and NEAR smart contracts.
  ```bash
  # Install Rust and Cargo via rustup
  curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

  # Close and reopen your terminal, then add the wasm32 target required for NEAR
  rustup target add wasm32-unknown-unknown
  ```

- **Solana Tool Suite**: Required for deploying Solana programs.
  ```bash
  # Install the Solana CLI tools
  sh -c "$(curl -sSfL https://release.solana.com/v1.18.17/install)"
  ```
  **Important: Update your system's PATH**

  After the installation finishes, the script will display a message asking you to update your `PATH`. This is a crucial step that allows your terminal to find and use the Solana commands (like `solana`, `solana-keygen`, etc.).

  1.  **Copy the command** provided by the installer. It will look similar to this:
      ```bash
      export PATH="/Users/your_username/.local/share/solana/install/active_release/bin:$PATH"
      ```

  2.  **Add it to your shell configuration file** to make the change permanent. Common files are `~/.bash_profile`, `~/.bashrc`, or `~/.zshrc` (for macOS Catalina and newer).
      ```bash
      # Example for zsh (common on modern macOS)
      echo 'export PATH="/Users/your_username/.local/share/solana/install/active_release/bin:$PATH"' >> ~/.zshrc

      # Example for bash
      echo 'export PATH="/Users/your_username/.local/share/solana/install/active_release/bin:$PATH"' >> ~/.bash_profile
      ```
      *Remember to replace the example path with the actual path given by the installer output.*

  3.  **Reload your shell** or open a new terminal window for the changes to take effect.
      ```bash
      # Example for zsh
      source ~/.zshrc

      # Example for bash
      source ~/.bash_profile
      ```

- **Anchor CLI**: The framework used for the Solana smart contract.
  ```bash
  # Install the Anchor Version Manager (avm) and then Anchor itself
  cargo install --git https://github.com/coral-xyz/anchor avm --locked --force
  avm install latest
  avm use latest
  ```

- **Sui CLI**: Required for deploying Sui Move modules.
  ```bash
  # Install the Sui CLI from source using Cargo
  cargo install --locked --git https://github.com/MystenLabs/sui.git --branch devnet sui
  ```

- **NEAR CLI**: Required for deploying NEAR smart contracts.
  ```bash
  # Install the NEAR CLI globally using npm
  npm install -g near-cli
  ```

- **TronLink Wallet**: A **browser extension** required for deploying to the Tron network. This must be installed from your browser's extension store.
  - [Install TronLink](https://www.tronlink.org/)


---

## 2. Initial Setup

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/21104988d/the-project_v2.git
    cd project1
    ```

2.  **Install Node.js Dependencies**
    This will install `ethers`, `solc`, `dotenv`, and other packages needed for EVM contract deployment.
    ```bash
    npm install
    ```

3.  **Install Additional Frontend Dependencies**
    Some components require extra libraries such as `clsx` for conditional class names. If you see errors about missing modules (e.g., `clsx`), install them as follows:
    ```bash
    npm install clsx
    ```
    If you encounter similar errors for other missing packages, install them using `npm install <package>`.

4.  **Install and Run Vite (Development Server)**
    Vite is used to run the frontend locally for development. If prompted, confirm installation by typing `y` when asked.
    ```bash
    npx vite
    # If prompted:
    # Need to install the following packages: vite@7.0.5
    # Ok to proceed? (y)
    # Type y and press Enter
    ```
    If you see errors about missing modules (such as 'clsx'), install them as described above and rerun `npx vite`.
    When the development server starts successfully, you will see output similar to:
    ```
    VITE v7.0.5  ready in ... ms
    ➜  Local:   http://localhost:5173/
    ➜  Network: use --host to expose
    ➜  press h + enter to show help
    ```
    Open the local URL in your browser to view the dApp. If you see a black screen, check the browser console for errors and ensure all dependencies are installed.

5.  **Configure Environment Variables**
    Create a `.env` file in the root of the project by copying the example file.
    ```bash
    cp .env.example .env
    ```
    Now, edit the `.env` file and add your sensitive information:
    -   `PRIVATE_KEY`: The private key of the wallet you will use to deploy the **EVM** smart contract. This wallet will be the owner of the contract and will pay for gas.
    -   `RPC_URL`: The JSON-RPC endpoint for the EVM-compatible network you want to deploy to (e.g., from Alchemy or Infura).

    **SECURITY WARNING**: Never commit your `.env` file to version control.

---

## 3. Smart Contract Deployment

You must deploy a fee manager contract for each blockchain ecosystem you wish to collect fees on.

### A. EVM Chains (Ethereum, Polygon, etc.)

The deployment script uses the variables from your `.env` file.

1.  **Compile the Contract:**
    ```bash
    npm run compile:evm
    ```
2.  **Deploy the Contract:**
    ```bash
    npm run deploy:evm
    ```
    After a successful deployment, the script will print the deployed contract address to the console. **Copy this address.**

### B. Solana

Deploying a Solana program built with Anchor requires the Solana Tool Suite and the Anchor CLI.

1.  **Build the Program**

    Navigate to the `contracts/solana/fee_manager` directory and run the `anchor build` command. This will compile the Rust code and generate the program's IDL (Interface Definition Language).

    ```bash
    cd contracts/solana/fee_manager
    anchor build
    ```

    The compiled program will be located at `target/deploy/fee_manager.so`. A new keypair for the program will also be generated at `target/deploy/fee_manager-keypair.json`.

2.  **Configure Solana CLI**

    Set your Solana CLI to point to the desired cluster (e.g., `devnet`, `testnet`, or `mainnet-beta`) and your wallet.

    ```bash
    # Example for Devnet
    solana config set --url https://api.devnet.solana.com
    solana config set --keypair /path/to/your/wallet-keypair.json
    ```

3.  **Deploy the Program**

    Use the `anchor deploy` command to deploy the program to the configured cluster.

    ```bash
    anchor deploy
    ```

    After a successful deployment, the command will output the **Program ID**. This is the public key of your deployed program.

4.  **Initialize the Fee Vault**

    The program itself is stateless; you need to create an instance of the `FeeVault` account. This is typically done via a client-side script or transaction. You will need to write a simple script using `@solana/web3.js` and `@coral-xyz/anchor` to call the `initialize` instruction, which creates the `feeVault` account and sets its owner.

5.  **Get the Address**

    The public key of your initialized `feeVault` account is the "contract address" you will use in the dApp configuration. **Copy this address.**

### C. Tron

The recommended method for deploying to Tron is using the browser-based **Tron-IDE** with the **TronLink** wallet extension.

1.  **Open Tron-IDE**: Visit the [Tron-IDE website](https://tronide.io/).
2.  **Import Contract**: Copy the contents of `contracts/tron/FeeManager.sol` and paste it into a new file in the IDE.
3.  **Compile the Contract**:
    -   Navigate to the "Compile" tab.
    -   Select a compatible compiler version (e.g., `0.8.20` or higher).
    -   Click the "Compile" button.
4.  **Deploy the Contract**:
    -   Navigate to the "Deploy" tab.
    -   Connect your TronLink wallet. Ensure you are on the correct network (Mainnet, Shasta, etc.) and have enough TRX for the deployment fee.
    -   Select the `FeeManager` contract from the dropdown menu.
    -   Click "Deploy".
5.  **Confirm Transaction**: Approve the transaction in the TronLink pop-up.

Once deployed, the Tron-IDE will display the **Contract Address**. **Copy this address.**

### D. Sui

Deployment on Sui involves publishing a "Move module" using the Sui CLI.

1.  **Configure the Sui CLI**:
    Set up a client environment and switch to the network you want to deploy to (e.g., `devnet`).
    ```bash
    # Create a new client environment if you don't have one
    sui client new-env

    # Switch to the devnet
    sui client switch --env devnet
    ```
    Ensure you have an active address with SUI tokens for gas fees.
    ```bash
    # View your active address
    sui client active-address

    # Get devnet SUI tokens from the faucet if needed
    sui client faucet
    ```

2.  **Publish the Module**:
    Navigate to the `contracts/sui` directory and run the `sui client publish` command. This compiles and deploys your module.
    ```bash
    cd contracts/sui
    sui client publish --gas-budget 50000000
    ```

After a successful publication, the CLI will output transaction details. The most important piece of information is the **`FeeVault` Object ID** created by the `init` function. **Copy this Object ID.**

### E. NEAR

Deployment to the NEAR blockchain is done via the `near-cli`.

1.  **Build the Smart Contract**:
    Navigate to the `contracts/near` directory and run the build command. This compiles the Rust code into a WebAssembly (`.wasm`) file.
    ```bash
    cd contracts/near
    cargo build --target wasm32-unknown-unknown --release
    ```
    The compiled contract will be at `target/wasm32-unknown-unknown/release/near_fee_manager.wasm`.

2.  **Deploy the Contract**:
    You need a NEAR account to deploy the contract to (e.g., `your-account.testnet`).
    ```bash
    # Login to your NEAR account (this will open a browser window)
    near login

    # Deploy the contract to your account
    # Replace 'your-account.testnet' with your actual account ID
    near deploy --accountId your-account.testnet --wasmFile target/wasm32-unknown-unknown/release/near_fee_manager.wasm
    ```

3.  **Initialize the Contract**:
    After deploying the code, you must initialize the contract's state by calling the `new` function and setting the owner.
    - `FEE_CONTRACT_ACCOUNT`: The account you deployed to (e.g., `your-account.testnet`).
    - `OWNER_ACCOUNT`: The account that should have permission to withdraw fees (e.g., `your-main-account.testnet`).
    ```bash
    # Call the 'new' function to initialize the contract
    near call FEE_CONTRACT_ACCOUNT new '{"owner_id": "OWNER_ACCOUNT"}' --accountId FEE_CONTRACT_ACCOUNT
    ```
The "contract address" for NEAR is the account ID you deployed to (`FEE_CONTRACT_ACCOUNT`). **Copy this account ID.**

---

## 4. Update dApp Configuration

After deploying your smart contracts, you must update the frontend to use them.

1.  Open the `config.ts` file.
2.  Locate the `FEE_MANAGER_CONTRACT_ADDRESSES` object.
3.  Update the placeholder addresses with the actual contract addresses you obtained during the deployment steps.

**Example `config.ts`:**
```typescript
export const FEE_MANAGER_CONTRACT_ADDRESSES: { [key in WalletStandard]?: string } = {
  'evm': '0xYourEVMFeeManagerAddress...', // From step 3A
  'solana': 'YourSolanaFeeVaultPublicKey...', // From step 3B
  'tron': 'YourTronFeeManagerAddress...', // From step 3C
  'sui': 'YourSuiFeeVaultObjectID...', // From step 3D
  'near': 'your-near-fee-manager.testnet', // From step 3E
};
```

---

## 5. Running the Frontend Application

This project is a static React application. You can serve it locally using any simple HTTP server. A common choice is the `serve` package.

1.  **Install `serve` (if you don't have it):**
    ```bash
    npm install -g serve
    ```

2.  **Serve the project root directory:**
    ```bash
    serve .
    ```

The command will output a local URL (e.g., `http://localhost:3000`). Open this URL in your browser to use the dApp.