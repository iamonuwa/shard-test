import {
    ApolloClient,
    ApolloError,
    gql,
    NormalizedCacheObject,
} from '@apollo/client';
import { initializeApollo } from 'utils/apollo';

const FETCH_REGISTERED_VEHICLES = gql`
    query {
        vehicles {
            id
            ipfsHash
            createdAt
            user {
                id
            }
        }
    }
`

export type VehicleData = {
    id: string
    ipfsHash: string
    createdAt: string
}

type Vehicle = {
    vehicles: VehicleData[]
}

export const loadRegisteredVehicleQuery = async (
): Promise<{ data: VehicleData[]; error?: ApolloError; loading: boolean }> => {
    const client: ApolloClient<NormalizedCacheObject> = initializeApollo()
    const { data, error, loading } = await client.query<Vehicle>({
        query: FETCH_REGISTERED_VEHICLES,
        fetchPolicy: 'cache-first',
        notifyOnNetworkStatusChange: true,
    });

    return {
        data: data.vehicles,
        error,
        loading,
    };
};