import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

export const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export async function uploadImageToS3(
  imageBuffer: Buffer,
  imagePath: string,
  contentType: string
): Promise<string> {
  try {
    const command = new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: imagePath,
      Body: imageBuffer,
      ContentType: contentType,
    });
    await s3Client.send(command);
    return imagePath;
  } catch (error) {
    console.error("Error uploading image to S3:", error);
    throw new Error("Failed to upload image to S3");
  }
}
