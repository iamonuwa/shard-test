import {
    ApolloClient,
    ApolloError,
    gql,
    NormalizedCacheObject,
} from '@apollo/client';
import { initializeApollo } from 'utils/apollo';

const FETCH_VEHICLE_REPAIR_HISTORY = gql`
    query getHistory($id: String!) {
        vehicle(id: $id) {
            id
            repairs {
                id
                ipfsHash
                createdAt
                user {
                    id
                }
            }
        }
    }
`

export type HistoryData = {
    id: string
    repairs: {
        id: string
        ipfsHash: string
        createdAt: string
        user: {
            id: string
        }
    }[]
}

export type History = {
    vehicle: HistoryData
}

export const loadVehicleHistoryQuery = async (id: string): Promise<{ data: HistoryData; error?: ApolloError; loading: boolean }> => {
    const client: ApolloClient<NormalizedCacheObject> = initializeApollo()
    const { data, error, loading } = await client.query<History>({
        query: FETCH_VEHICLE_REPAIR_HISTORY,
        fetchPolicy: 'cache-first',
        notifyOnNetworkStatusChange: true,
        variables: {
            id
            // id: "MOT-AA-123"
        }
    });

    return {
        data: data.vehicle,
        error,
        loading,
    };
};