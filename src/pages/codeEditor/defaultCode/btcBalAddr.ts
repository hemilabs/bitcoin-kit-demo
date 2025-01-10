import { DefaultCode, DefaultCodeName } from 'types/defaultCode';

const code = `
/**
 * Retrieves the balance of a given Bitcoin address.
 * 
 * This code interacts with a smart contract to call the btcBalAddr method,
 * which is mapped to a precompile at address: 0x40.
 * 
 * Precompile Address: 0x40
 */

// Define the Bitcoin address to check the balance for.
// This should be replaced by the user with their own Public Bitcoin address.
const bitcoinAddress = "<REPLACE_WITH_BITCOIN_ADDRESS>";

// Get the contract instance with the contract address and ABI using wagmi/viem.
// The contract address is also provided through the state.
const contract = getContract({
  client: publicClient,
  address: contractAddress,
  abi: ABI,
});

// Call the btcBalAddr function on the contract with the Bitcoin address.
// This function calls the precompile at address 0x40 to retrieve the balance.
const satoshis = await contract.read.btcBalAddr([bitcoinAddress]);

// Return the amount in satoshis of the contract call.
return satoshis;
`;
const btcBalAddr: DefaultCode = {
  code,
  description:
    'Retrieves the current balance (in satoshis) of a specified Bitcoin address',
  label: 'Get Address Balance',
  name: DefaultCodeName.btcBalAddr,
};

export default btcBalAddr;
