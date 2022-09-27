import { create } from "ipfs-http-client";
import { useState } from "react";
import { getIpfsHashFromBytes32 } from "utils/convert";

const projectId = process.env.NEXT_INFURA_IPFS_API_KEY as string;
const projectSecret = process.env.NEXT_INFURA_IPFS_API_SECRET as string;

const auth = "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64");

const client = create({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    headers: {
        authorization: auth,
    },
});

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
    metadata: Metadata
    getMetadata: (ipfsHash: string) => void
    uploadMetadata: (data: any) => Promise<string>
}

export const useIPFS = (): IPFS => {
    const [metadata, setMetadata] = useState<any>()
    const getMetadata = async (hash: string) => {
        const cid = getIpfsHashFromBytes32(hash);
        const payload = await client.cat(cid)
        for await (const item of payload) {
            const data = new TextDecoder().decode(item)
            setMetadata({
                ...JSON.parse(data),
                hash,
                cid
            })
        }
    }
    const uploadMetadata = async (data: any): Promise<string> => {
        const result = await client.add(Buffer.from(JSON.stringify(data)))
        return result.path
    }
    return { metadata, getMetadata, uploadMetadata }
}