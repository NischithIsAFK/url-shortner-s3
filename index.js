import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({ region: "ap-south-1" });

export const handler = async (event) => { 
    const { longUrl, shortName } = JSON.parse(event.body); 

    const params = {
        Bucket: "Your-Bucket-Name",
        Key: shortName,
        // Body: "", //Optional
        WebsiteRedirectLocation: longUrl
    };

    try {
        await s3Client.send(new PutObjectCommand(params));
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: "Short URL created",
                shortUrl: `http://<Your-Bucket-Name>.s3-website.ap-south-1.amazonaws.com/${shortName}`
            }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
};
