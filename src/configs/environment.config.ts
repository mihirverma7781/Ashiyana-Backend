import dotenv from "dotenv";
dotenv.config();

class EnvConfig {
  private readonly env: Record<string, string | undefined>;
  constructor() {
    this.env = process.env;
  }

  getPort(): number {
    return parseInt(this.env.PORT || "8000", 10);
  }

  getAppUri(): string {
    return this.env.APP_URI || "";
  }

  getNodeEnv(): string | undefined {
    return this.env.NODE_ENV;
  }

  getDBUri(): string | undefined {
    return this.env.DB_URI;
  }

  getRedisURI(): string | undefined {
    return this.env.REDIS_URI;
  }

  getAppSecretKey(): string {
    return this.env.APP_SECRET_KEY || "";
  }

  getSMTPHost(): string {
    return this.env.SMTP_HOST || "";
  }

  getSMTPPort(): string {
    return this.env.SMTP_PORT || "587";
  }

  getSMTPService(): string {
    return this.env.SMTP_SERVICE || "";
  }

  getSMTPMail(): string {
    return this.env.SMTP_MAIL || "";
  }

  getSMTPPassword(): string {
    return this.env.SMTP_PASSWORD || "";
  }

  getAccessToken(): string {
    return this.env.ACCESS_TOKEN || "";
  }

  getRefreshToken(): string {
    return this.env.REFRESH_TOKEN || "";
  }

  getAccessTokenExpiry(): string {
    return this.env.ACCESS_TOKEN_EXPIRE || "300";
  }

  getRefreshTokenExpiry(): string {
    return this.env.REFRESH_TOKEN_EXPIRE || "1200";
  }

  getAWSAccessKeyId(): string {
    return this.env.AWS_ACCESS_KEY || "";
  }

  getAWSSecretAccessKey(): string {
    return this.env.AWS_SECRET_ACCESS_KEY || "";
  }

  getS3BucketName(): string {
    return this.env.AWS_S3_BUCKET_NAME || "";
  }
}

export default new EnvConfig();
