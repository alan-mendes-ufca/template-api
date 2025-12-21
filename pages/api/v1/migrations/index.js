import migrationRunner from "node-pg-migrate";
import { join } from "node:path";
import db from "infra/database";

const MIGRATIONS_DIR = join("infra", "migrations");

export default async function migrations(request, response) {
  const allowedMethods = ["GET", "POST"];
  if (!allowedMethods.includes(request.method))
    return response.status(405).json({
      error: `Method ${request.method} not allowed`,
    });

  let dbClient;

  try {
    dbClient = await db.getNewClient();

    const isDryRun = request.method === "GET";

    const result = await migrationRunner({
      dbClient: dbClient,
      dryRun: isDryRun,
      dir: MIGRATIONS_DIR,
      direction: "up",
      verbose: true,
      migrationsTable: "pg-migrations",
    });

    return response.status(200).json({
      [isDryRun ? "pendingMigrations" : "appliedMigrations"]: result ?? [],
    });
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await dbClient.end();
  }
}
