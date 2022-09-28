import axios from "axios";
import { getIpfsHashFromBytes32 } from "utils/convert";
import { client } from "utils/ipfs";


export type Metadata = {
    vehicle_number: string;
    engine: string;
    fuel: string;
    manufacture_year: string | number
    registration_place: string
    cid: string
    hash: string
}

type IPFS = {
    getMetadata: (ipfsHash: string) => Promise<any>
    uploadMetadata: (data: any) => Promise<string>
    formatMetadata: (data: any[]) => void
}

export const useIPFS = (): IPFS => {
    const getMetadata = async (hash: string): Promise<any> => {
        const cid = getIpfsHashFromBytes32(hash);
        return await (await axios.get(`https://ipfs.io/ipfs/${cid}`)).data
    }

    const uploadMetadata = async (data: any): Promise<string> => {
        return await (await client.add(Buffer.from(JSON.stringify(data)))).path
    }

    const formatMetadata = async (data: any[]) => {
        return data.forEach(async (item) => await getMetadata(item.ipfsHash))
    }
    return { formatMetadata, getMetadata, uploadMetadata }
}