import { DefaultCode } from 'types/defaultCode'

const code = `
/**
 * Returns the canonical header at index N in the Bitcoin chain hVM is aware of.
 * 
 * This code interacts with a smart contract to call the btcHeaderN method,
 * which is mapped to a precompile at address: 0x45.
 * 
 * Precompile Address: 0x45
 */

// Define the index N to retrieve the canonical Bitcoin header.
// This should be replaced by the user with the desired index value.
const headerIndex = "<REPLACE_WITH_HEADER_INDEX>";

// Get the contract instance with the contract address and ABI using wagmi/viem.
// The contract address is also provided through the state.
const contract = getContract({
  client: walletClient,
  address: contractAddress,
  abi: ABI,
});

// Call the btcHeaderN function on the contract with the index N.
// This function calls the precompile at address 0x45 to retrieve the canonical header.
const header = await contract.read.btcHeaderN([headerIndex]);

// Return the canonical header at index N of the Bitcoin chain.
return header;
`

const btcHeaderN: DefaultCode = {
  name: 'btcHeaderN',
  label: 'Get Block Header by Height',
  description: 'Fetches the block header for a specific block height.',
  code,
}

export default btcHeaderN
