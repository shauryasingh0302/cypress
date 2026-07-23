import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

if (!process.env.DATABASE_URL) {
    console.log("Database URL not found");
}

const client = postgres(process.env.DATABASE_URL as string, { max: 1 });

const db = drizzle(client, { schema });

export default db;
