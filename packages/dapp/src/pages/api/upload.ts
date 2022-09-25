import { promisify } from "util";
import fs from "fs";
import { v4 as uuid } from "uuid";
import formidable from "formidable";
import fleekStorage from "@fleekhq/fleek-storage-js"

const fleekAuth = {
    apiKey: process.env.FLEEK_API_KEY as string,
    apiSecret: process.env.FLEEK_API_SECRET as string,
};

const readFileAsync = promisify(fs.readFile);

export default async (req: any, res: any) => {
    // Setup incoming form data
    const form = new formidable.IncomingForm({ keepExtensions: true });

    // Collect data from form
    const data: any = await new Promise((res, rej) => {
        // Parse form data
        form.parse(req, (err: Error, fields: any, files: any) => {
            // if error, reject promise
            if (err) return rej(err);
            // Else, return fields and files
            res({ fields, files });
        });
    });

    // Collect file and metadataJSON from POST request
    const { name, metadata } = data.fields;

    // Collect uploaded media
    const { upload: file } = data.files;
    const fileData = await readFileAsync(file.path);

    // If file, name, and metadata provided
    if (fileData && name && metadata) {
        // Upload media to Fleek
        const { publicUrl: fileUrl } = await fleekStorage.upload({
            ...fleekAuth,
            key: uuid(),
            data: fileData
        })

        // Upload metdata to Fleek
        const { publicUrl: metadataUrl } = await fleekStorage.upload({
            ...fleekAuth,
            key: uuid(),
            data: metadata,
        });

        // Return fileUrl and metadataUrl
        res.send({ fileUrl, metadataUrl });
    } else {
        // Else, return 501
        res.status(501);
    }

    // End
    res.end();
};

// Remove bodyParser from endpoint
export const config = {
    api: {
        bodyParser: false,
    },
};
