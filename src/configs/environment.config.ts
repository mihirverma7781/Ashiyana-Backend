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

  getAccessToken(): string {
    return this.env.ACCESS_TOKEN || "";
  }

  getAccessTokenExpiry(): string {
    return this.env.ACCESS_TOKEN_EXPIRE || "300";
  }
}

export default new EnvConfig();
