# Bitcoin Kit Demo

Bitcoin Kit Demo is a lightweight interface that allows developers to interact with the [Hemi Network's](https://hemi.xyz) Bitcoin Kit (hBK), which is a set of smart contracts designed to bridge the Ethereum and Bitcoin blockchains. It enables testing and experimentation with Hemi precompiles that expose Bitcoin data to EVM-based applications. For more details on the architecture and functionality of the Bitcoin Kit, refer to the official documentation: [Hemi Bitcoin Kit (hBK)](https://docs.hemi.xyz/building-bitcoin-apps/hemi-bitcoin-kit-hbk).

This document provides instructions on how to set up, run, and contribute to the project.

## Getting Started

### Prerequisites

- Node.js (version 18 or higher recommended)
- npm or compatible package manager

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/hemilabs/bitcoin-kit-demo.git
   ```

1. Navigate to the project folder:

   ```bash
   cd bitcoin-kit-demo
   ```

1. Install dependencies:

   ```bash
   npm install
   ```

1. Create a `.env` file in the root directory and configure the following environment variables:

   > Note: Make sure to check the [official documentation](https://docs.hemi.xyz/building-bitcoin-apps/hemi-bitcoin-kit-hbk) for the most up-to-date contract addresses on mainnet and testnet.

   ```env
   VITE_HEMI_BITCOIN_KIT_CONTRACT_ADDRESS_TESTNET='0xeC9fa5daC1118963933e1A675a4EEA0009b7f215'
   VITE_HEMI_BITCOIN_KIT_CONTRACT_ADDRESS_MAINNET='0x19d56A17ce3a81b9f7e55E87F260D6b43D67BF54'
   VITE_HEMI_BITCOIN_KIT_ENABLE_MAINNET='true'
   ```

## Available Scripts

You can run the following commands using `npm`:

| Command                | Description                                          |
| ---------------------- | ---------------------------------------------------- |
| `npm run dev`          | Starts the development server                        |
| `npm run build`        | Builds the application                               |
| `npm run preview`      | Serves the production build locally                  |
| `npm run lint`         | Runs ESLint on the codebase                          |
| `npm run format:check` | Checks code formatting with Prettier                 |
| `npm run format:fix`   | Fixes formatting issues using Prettier               |
| `npm run tsc`          | Runs TypeScript type checking without emitting files |

## Running Locally

To start the app locally:

```bash
npm run dev
```

Then open your browser and navigate to [http://localhost:5173](http://localhost:5173) (or the URL shown in the terminal).

## Deployment

The app can be deployed using any static hosting service that supports Vite builds (such as Vercel, Netlify, or GitHub Pages).

1. Build the project:

   ```bash
   npm run build
   ```

1. Serve the `dist/` folder using your preferred deployment strategy.

## Contributing

If you want to contribute to this project and make it better, your help is very welcome.
You can find more information about how to contribute in the [`CONTRIBUTING.md`](https://github.com/hemilabs/.github/blob/main/CONTRIBUTING.md) file.

## License

This project is licensed under the MIT License – see the [`LICENSE`](./LICENSE) file for details.
