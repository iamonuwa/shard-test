import {
    ApolloClient,
    HttpLink,
    InMemoryCache,
    NormalizedCacheObject,
} from "@apollo/client";
import { IncomingMessage, ServerResponse } from "http";

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined;

export type ResolverContext = {
    req?: IncomingMessage;
    res?: ServerResponse;
};

function createIsomorphLink(context: ResolverContext = {}) {
    return new HttpLink({
        uri: process.env.NEXT_SUBGRAPH_URI || "https://api.thegraph.com/subgraphs/name/iamonuwa/vehicle-information",
    });
}

function createApolloClient(context?: ResolverContext) {
    return new ApolloClient({
        ssrMode: typeof window === "undefined",
        link: createIsomorphLink(context),
        cache: new InMemoryCache(),
    });
}

export function initializeApollo(
    initialState: any = null,
    // Pages with Next.js data fetching methods, like `getStaticProps`, can send
    // a custom context which will be used by `SchemaLink` to server render pages
    context?: ResolverContext
): ApolloClient<NormalizedCacheObject> {
    const _apolloClient = apolloClient ?? createApolloClient(context);

    // If your page has Next.js data fetching methods that use Apollo Client, the initial state
    // get hydrated here
    if (initialState) {
        _apolloClient.cache.restore(initialState);
    }
    // For SSG and SSR always create a new Apollo Client
    if (typeof window === "undefined") return _apolloClient;
    // Create the Apollo Client once in the client
    if (!apolloClient) apolloClient = _apolloClient;

    return _apolloClient;
}