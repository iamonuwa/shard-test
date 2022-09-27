import axios from "axios";
import { useState } from "react";
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
    getMetadata: (ipfsHash: string) => Promise<Metadata>
    uploadMetadata: (data: any) => Promise<string>
    formatMetadata: (data: any[]) => void
}

export const useIPFS = (): IPFS => {
    const getMetadata = async (hash: string): Promise<Metadata> => {
        const cid = getIpfsHashFromBytes32(hash);
        return await (await axios.get(`https://ipfs.io/ipfs/${cid}`)).data
        // const payload = await client.cat(cid)
        // for await (const item of payload) {
        //     const data = new TextDecoder().decode(item)
        //     // setMetadata({
        //     //     ...JSON.parse(data),
        //     //     hash,
        //     //     cid
        //     // })
        // }
    }

    const uploadMetadata = async (data: any): Promise<string> => {
        const result = await client.add(Buffer.from(JSON.stringify(data)))
        return result.path
    }

    const formatMetadata = async (data: any[]) => {
        const result = data.forEach(async (item) => await getMetadata(item.ipfsHash))
        console.log(result)

        return result
    }
    return { formatMetadata, getMetadata, uploadMetadata }
}