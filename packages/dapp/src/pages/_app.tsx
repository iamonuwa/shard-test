import "focus-visible";
import "../styles/global.css";
import { AppProps } from "next/app";
import { Web3ReactProvider, createWeb3ReactRoot } from "@web3-react/core";
import { NetworkContextName } from "constants/index";
import getLibrary from "utils/getLibrary";
import { ApolloProvider } from "@apollo/client";
import { initializeApollo } from "utils/apollo";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

const Web3ProviderNetwork = createWeb3ReactRoot(NetworkContextName);

function MyApp({ Component, pageProps }: AppProps) {
  const client = initializeApollo({});
  const router = useRouter();
  return (
    <ApolloProvider client={client}>
      <Web3ReactProvider getLibrary={getLibrary}>
        <Web3ProviderNetwork getLibrary={getLibrary}>
          <motion.div
            key={router.route}
            initial="pageInitial"
            animate="pageAnimate"
            variants={{
              pageInitial: {
                opacity: 0,
              },
              pageAnimate: {
                opacity: 1,
              },
            }}
          >
            <Component {...pageProps} />
          </motion.div>
        </Web3ProviderNetwork>
      </Web3ReactProvider>
    </ApolloProvider>
  );
}

export default MyApp;
