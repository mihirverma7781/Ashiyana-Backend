import { Redis } from "ioredis";
import config from "./environment.config";

const redisClient = () => {
  if (config.getRedisURI()) {
    console.log("Redis conneted");
    return config.getRedisURI() || "";
  }
  throw new Error("Redis connection failed");
};

export default new Redis(redisClient());
