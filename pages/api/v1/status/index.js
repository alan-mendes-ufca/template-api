import db from "infra/database.js";

async function status(resquest, response) {
  response.status(200).json({
    updated_at: updatedAt(),
    postgres_version: await pgVersion(),
    max_connections: await maxConnections(),
    most_used_connections: await mostUsedConnections(),
  });
}

function updatedAt() {
  return new Date().toISOString();
}

async function pgVersion() {
  return (await db.query("SELECT version();")).rows[0];
}

async function maxConnections() {
  return (await db.query("SHOW max_connections;")).rows[0];
}

async function mostUsedConnections() {
  return (await db.query("SELECT COUNT(*) FROM pg_stat_activity")).rows[0];
}

export default status;
