// This script provides a simple way to deploy the FeeManager contract.
// To use it, you'll need to set up a Node.js environment.
//
// 1. Install dependencies:
//    npm install
//
// 2. Create a .env file from the project's .env.example and fill in your details:
//    - PRIVATE_KEY: The private key of the account you want to deploy from.
//    - RPC_URL: The URL of the blockchain node you want to deploy to (e.g., from Infura, Alchemy).
//
// 3. Compile the contract:
//    npm run compile:evm
//
// 4. Run the deploy script:
//    npm run deploy:evm

const { ethers } = require('ethers');
const fs = require('fs');
require('dotenv').config({ path: '../../.env' }); // Look for .env in root directory

async function main() {
  // 1. Setup Provider and Wallet
  const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
  console.log(`Deploying contracts with the account: ${wallet.address}`);

  // 2. Load Contract ABI and Bytecode
  const abiPath = './build/evm/contracts_evm_FeeManager_sol_FeeManager.abi';
  const binPath = './build/evm/contracts_evm_FeeManager_sol_FeeManager.bin';

  if (!fs.existsSync(abiPath) || !fs.existsSync(binPath)) {
    console.error('Contract ABI or Bytecode not found.');
    console.error('Please compile the contract first by running: npm run compile:evm');
    process.exit(1);
  }

  const abi = JSON.parse(fs.readFileSync(abiPath, 'utf8'));
  const bytecode = fs.readFileSync(binPath, 'utf8');

  // 3. Deploy Contract
  const contractFactory = new ethers.ContractFactory(abi, bytecode, wallet);

  console.log('Deploying FeeManager implementation...');
  
  // For a real UUPS proxy, you'd deploy a proxy contract (e.g., ERC1967Proxy)
  // that points to this implementation address.
  // For simplicity, we are deploying the implementation and initializing it directly.
  const contract = await contractFactory.deploy();
  await contract.waitForDeployment();
  const contractAddress = await contract.getAddress();
  
  console.log(`Contract implementation deployed to: ${contractAddress}`);

  // 4. Initialize the contract
  console.log('Initializing contract with owner...');
  const tx = await contract.initialize(wallet.address);
  await tx.wait(); // Wait for the transaction to be mined
  console.log('Contract initialized successfully.');
  
  const owner = await contract.owner();
  console.log(`Contract owner is set to: ${owner}`);
  console.log('Deployment complete! You can now use the implementation address in your dApp config.');
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });