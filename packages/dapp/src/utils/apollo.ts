import { ApolloClient, InMemoryCache } from "@apollo/client";

const apolloClient = new ApolloClient({
    uri: "https://api.thegraph.com/subgraphs/name/iamonuwa/vehicle-information",
    cache: new InMemoryCache(),
});

export default apolloClient;