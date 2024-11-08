import * as dotenv from "dotenv";
import * as path from "path";

// Setup
dotenv.config({ path: path.resolve(process.cwd() + "../../../.env") });

export default {
  dialect: "postgresql", // "mysql" | "sqlite" | "postgresql"
  schema: "./database/drizzle/schema.ts",
  out: "./database/drizzle",
  introspect: {
    casing: "preserve",
  },
  dbCredentials: {
    user: process.env.DATABASE_USER,
    host: process.env.DATABASE_HOST,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    port: Number(process.env.DATABASE_PORT) || 5432,
  },
};
