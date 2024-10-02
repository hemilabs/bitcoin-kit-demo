const btcHeaderN = `
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

// Get the signer from the provider, which is provided through the state.
const signer = await state.provider.getSigner();

// Create a new contract instance with the contract address and ABI.
// The contract address is also provided through the state.
const contract = new Contract(state.contractAddress, ABI, signer);

// Call the btcHeaderN function on the contract with the index N.
// This function calls the precompile at address 0x45 to retrieve the canonical header.
const header = await contract.btcHeaderN(headerIndex);

// Return the canonical header at index N of the Bitcoin chain.
return header;
`

export default btcHeaderN
