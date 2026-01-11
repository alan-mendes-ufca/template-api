import { exec } from "node:child_process";
import { Spinner } from "cli-spinner";

const spinner = new Spinner("🔴 Aguardando o Postgres aceitar conexões... %s");
spinner.setSpinnerString("⠄⠆⠇⠋⠙⠸⠰⠠⠰⠸⠙⠋⠇⠆");
spinner.start();

function checkPostgres() {
  exec(
    "docker exec postgres-dev pg_isready --host localhost",
    (error, stdout) => {
      if (!stdout || !stdout.includes("accepting connections")) {
        // Recurção assíncrona(chama a função novamente após um segundo).
        setTimeout(checkPostgres, 500); // espera 1s
        return;
      }

      spinner.stop(false);
      console.log("\n🟢 Postgres está pronto e aceitando conexões.");
    },
  );
}

checkPostgres();
