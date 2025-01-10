import { DefaultCode, DefaultCodeName } from 'types/defaultCode';

const code = `
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

// Get the contract instance with the contract address and ABI using wagmi/viem.
// The contract address is also provided through the state.
const contract = getContract({
  client: publicClient,
  address: contractAddress,
  abi: ABI,
});

// This function calls the precompile at address 0x43 to retrieve the number of confirmations.
const confirmations = await contract.read.btcTxConfirmations([txid]);

// Return the number of confirmations retrieved by the contract call.
return confirmations;
`;

const btcTxConfirmations: DefaultCode = {
  code,
  description:
    'Retrieves the number of confirmations for a specific transaction based on its transaction ID.',
  label: 'Get Transaction Confirmations',
  name: DefaultCodeName.btcTxConfirmations,
};

export default btcTxConfirmations;
