const btcUtxosAddrList = `
/**
 * Gets available UTXOs for a specific Bitcoin address.
 * 
 * This code interacts with a smart contract to call the btcUtxosAddrList method,
 * which is mapped to a precompile at address: 0x41.
 * 
 * Pagination is supported by passing a starting index and a maximum number of UTXOs to return.
 * 
 * Precompile Address: 0x41
 */

// Define the Bitcoin address to retrieve UTXOs for.
// This should be replaced by the user with their actual Bitcoin address.
const btcAddress = "<REPLACE_WITH_BTC_ADDRESS>";

// Define the pagination parameters (starting index and max number of UTXOs).
// These values should be replaced by the user depending on their desired pagination settings.
const startIndex = 0; // Start from the first UTXO
const maxUtxos = 10; // Limit to 10 UTXOs per call

// Get the signer from the provider, which is provided through the state.
const signer = await state.provider.getSigner();

// Create a new contract instance with the contract address and ABI.
// The contract address is also provided through the state.
const contract = new Contract(state.contractAddress, ABI, signer);

// This function calls the precompile at address 0x41 to retrieve the UTXOs for the specified address.
const utxos = await contract.btcUtxosAddrList(btcAddress, startIndex, maxUtxos);

// Return the UTXO list retrieved by the contract call.
return utxos;
`

export default btcUtxosAddrList
