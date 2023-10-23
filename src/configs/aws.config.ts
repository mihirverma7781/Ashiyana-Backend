import AWS from "aws-sdk";
import { S3Client } from "@aws-sdk/client-s3";
import config from "./environment.config";

// AWS.config.update({
//   region: "us-west-2",
//   accessKeyId: config.getAWSAccessKeyId(),
//   secretAccessKey: config.getAWSSecretAccessKey(),
// });

export const s3 = new S3Client({
  region: "us-west-2",
  credentials: {
    accessKeyId: config.getAWSAccessKeyId(),
    secretAccessKey: config.getAWSSecretAccessKey(),
  },
});

