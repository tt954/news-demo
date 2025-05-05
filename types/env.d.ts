declare global {
  namespace NodeJS {
    interface ProcessEnv {
      AWS_REGION: string;
      AWS_ACCESS_KEY_ID: string;
      AWS_SECRET_ACCESS_KEY: string;
      AWS_S3_BUCKET_NAME: string;
      AWS_S3_HOST_NAME: string;
      AWS_S3_URL: string;

      NODE_ENV: "development" | "production";
    }
  }
}

export {};
