import {
    ApolloClient,
    ApolloError,
    gql,
    NormalizedCacheObject,
} from '@apollo/client';
import { initializeApollo } from 'utils/apollo';

const FETCH_VEHICLE_REPAIR_HISTORY = gql`
    query {
        histories {
                id
                vin
                note
                user {
                    id
                }
        }
    }
`

type Data = {
    id: string
    vin: string
    note: string
    user: {
        id: string
    }
}

type History = {
    histories: Data
}

export const loadVehicleHistoryQuery = async (vin: string): Promise<{ data: Data; error?: ApolloError; loading: boolean }> => {
    const client: ApolloClient<NormalizedCacheObject> = initializeApollo()
    const { data, error, loading } = await client.query<History>({
        query: FETCH_VEHICLE_REPAIR_HISTORY,
        fetchPolicy: 'cache-first',
        notifyOnNetworkStatusChange: true,
        variables: {
            vin
        }
    });

    return {
        data: data.histories,
        error,
        loading,
    };
};