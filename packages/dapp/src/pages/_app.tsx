import "focus-visible";
import "../styles/global.css";
import type { AppProps } from "next/app";
import { Web3ReactProvider, createWeb3ReactRoot } from "@web3-react/core";
import { NetworkContextName } from "constants/index";
import getLibrary from "utils/getLibrary";
import { Fragment } from "react";

const Web3ProviderNetwork = createWeb3ReactRoot(NetworkContextName);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Fragment>
      <Web3ReactProvider getLibrary={getLibrary}>
        <Web3ProviderNetwork getLibrary={getLibrary}>
          <Component {...pageProps} />
        </Web3ProviderNetwork>
      </Web3ReactProvider>
    </Fragment>
  );
}

export default MyApp;
