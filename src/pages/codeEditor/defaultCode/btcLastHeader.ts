import { DefaultCode, DefaultCodeName } from 'types/defaultCode'

const code = `
/**
 * Retrieves the most recent Bitcoin block header.
 * 
 * This code interacts with a smart contract to call the btcLastHeader method,
 * which is mapped to a precompile at address: 0x44.
 * 
 * Precompile Address: 0x44
 */

// Get the contract instance with the contract address and ABI using wagmi/viem.
// The contract address is also provided through the state.
const contract = getContract({
  client: publicClient,
  address: contractAddress,
  abi: ABI,
});

// Call the btcLastHeader function on the contract.
// This function calls the precompile at address 0x44 to retrieve the latest Bitcoin block header.
const lastHeader = await contract.read.btcLastHeader();

// Return the latest Bitcoin block header as a hex string.
return lastHeader;
`

const btcLastHeader: DefaultCode = {
  name: DefaultCodeName.btcLastHeader,
  label: 'Get Latest Block Header',
  description:
    'Returns the latest Bitcoin block header containing metadata like hash, height, and timestamp.',
  code,
}

export default btcLastHeader
