const btcTxByTxid = `
/**
 * Gets a transaction by a TxID.
 * 
 * This code interacts with a smart contract to call the btcTxByTxid method,
 * which is mapped to a precompile at address: 0x42.
 * 
 * Bitflags can be used to optimize the information returned, such as only fetching inputs or outputs, 
 * excluding unspendable outputs, etc., to save gas.
 * 
 * Precompile Address: 0x42
 */

// Define the TxID (transaction ID) to retrieve the Bitcoin transaction.
// This should be replaced by the user with the actual TxID.
const txid = "0x<REPLACE_WITH_TXID>";

// Convert the TxID from hexadecimal string to BytesLike using ethers.getBytes.
const txidBytes = getBytes(txid);

// Get the signer from the provider, which is provided through the state.
const signer = await state.provider.getSigner();

// Create a new contract instance with the contract address and ABI.
// The contract address is also provided through the state.
const contract = new Contract(state.contractAddress, ABI, signer);

// This function calls the precompile at address 0x42 to retrieve the transaction.
const transaction = await contract.btcTxByTxid(txidBytes);

// Return the transaction details retrieved by the contract call.
return transaction;
`

export default btcTxByTxid
