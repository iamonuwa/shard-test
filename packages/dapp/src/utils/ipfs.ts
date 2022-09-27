import { create } from "ipfs-http-client";

const projectId = process.env.NEXT_INFURA_IPFS_API_KEY as string;
const projectSecret = process.env.NEXT_INFURA_IPFS_API_SECRET as string;

const auth = "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64");

export const client = create({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    headers: {
        authorization: auth,
    },
});