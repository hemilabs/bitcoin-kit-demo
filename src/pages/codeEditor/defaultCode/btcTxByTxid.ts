import { DefaultCode, DefaultCodeName } from 'types/defaultCode'

const code = `
/**
 * Gets a transaction by a TxID.
 * 
 * This code interacts with a smart contract to call the btcTxByTxid method,
 * which is mapped to a precompile at address: 0x42.
 * 
 * Bitflags can be used to optimize the information returned, such as only 
 * fetching inputs or outputs, 
 * excluding unspendable outputs, etc., to save gas.
 * 
 * Precompile Address: 0x42
 */

// Define the TxID (transaction ID) to retrieve the Bitcoin transaction.
// This should be replaced by the user with the actual TxID.
const txid = "0x<REPLACE_WITH_TXID>";

// Get the contract instance with the contract address and ABI using wagmi/viem.
// The contract address is also provided through the state.
const contract = getContract({
  client: publicClient,
  address: contractAddress,
  abi: ABI,
});

// This function calls the precompile at address 0x42 to retrieve the transaction.
const transaction = await contract.read.btcTxByTxid([txid]);

// Return the transaction details retrieved by the contract call.
return transaction;
`

const btcTxByTxid: DefaultCode = {
  name: DefaultCodeName.btcTxByTxid,
  label: 'Get Transaction Details',
  description:
    'Fetches the details of a Bitcoin transaction using its transaction ID, including all of its inputs and outputs.',
  code,
}

export default btcTxByTxid
