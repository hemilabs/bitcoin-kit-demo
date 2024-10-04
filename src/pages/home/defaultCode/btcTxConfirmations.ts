const btcTxConfirmations = `
/**
 * Returns the number of confirmations for a Bitcoin TxID.
 * 
 * This code interacts with a smart contract to call the btcTxConfirmations method,
 * which is mapped to a precompile at address: 0x43.
 * 
 * Precompile Address: 0x43
 */

// Define the TxID (transaction ID) to retrieve the number of confirmations.
// This should be replaced by the user with the actual TxID.
const txid = "0x<REPLACE_WITH_TXID>";

// Convert the TxID from hexadecimal string to BytesLike using ethers.getBytes.
const txidBytes = getBytes(txid);

// Get the signer from the provider, which is provided through the state.
const signer = await state.provider.getSigner();

// Create a new contract instance with the contract address and ABI.
// The contract address is also provided through the state.
const contract = new Contract(state.contractAddress, ABI, signer);

// This function calls the precompile at address 0x43 to retrieve the number of confirmations.
const confirmations = await contract.btcTxConfirmations(txidBytes);

// Return the number of confirmations retrieved by the contract call.
return confirmations;
`

export default btcTxConfirmations
