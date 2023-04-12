import '@/styles/globals.css'
// import type { AppProps } from 'next/app'
// import { configureChains, createClient, WagmiConfig } from "wagmi";
import {
  getDefaultWallets, RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { polygonMumbai } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
// import { polygonMumbai, goerli, optimismGoerli} from "wagmi/chains";

const BTTChain = {
  id: 1029,
  name: "BitTorrent Chain Donau",
  network: "BitTorrent Chain Donau",
  iconUrl: "https://testscan.bt.io/static/media/BTT.e13a6c4e.svg",
  iconBackground: "#fff",
  nativeCurrency: {
    decimals: 18,
    name: "BitTorrent Chain Donau",
    symbol: "BTT",
  },
  rpcUrls: {
    default: "https://pre-rpc.bittorrentchain.io/",
  },
  blockExplorers: {
    default: {
      name: "BitTorrent Chain Donau",
      url: "https://testscan.bt.io",
    },
  },
  testnet: true,
};

const { chains, provider } = configureChains(
  [polygonMumbai, BTTChain],
  [
    jsonRpcProvider({
      rpc: (chain) => ({ http: "https://pre-rpc.bittorrentchain.io/" }),
    }),
    alchemyProvider({ apiKey: "O5NYvtwLMNG0LjAXPQEk0YJT2l3UxTAY" }),
    // publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "Swirl- an Advertisement on WEB3",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

export default function App({ Component, pageProps }) {

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
