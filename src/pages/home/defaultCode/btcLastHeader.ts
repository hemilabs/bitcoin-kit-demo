const btcLastHeader = `
/**
 * Retrieves the most recent Bitcoin block header.
 * 
 * This code interacts with a smart contract to call the btcLastHeader method,
 * which is mapped to a precompile at address: 0x44.
 * 
 * Precompile Address: 0x44
 */

// Get the signer from the provider, which is provided through the state.
const signer = await state.provider.getSigner();

// Create a new contract instance with the contract address and ABI.
// The contract address is also provided through the state.
const contract = new Contract(state.contractAddress, ABI, signer);

// Call the btcLastHeader function on the contract.
// This function calls the precompile at address 0x44 to retrieve the latest Bitcoin block header.
const lastHeader = await contract.btcLastHeader();

// Return the latest Bitcoin block header as a hex string.
return lastHeader;
`

export default btcLastHeader
