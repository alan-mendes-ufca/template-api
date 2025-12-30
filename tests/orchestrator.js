import retry from "async-retry";

async function waitForAllServices() {
  await waitForWebServer();

  async function waitForWebServer(
    maxRetries = 100,
    // minTimeout = 500,
    maxTimeout = 1000,
  ) {
    return retry(fetchStatusPage, {
      retries: maxRetries,
      // minTimeout: minTimeout,
      maxTimeout: maxTimeout,
      onRetry: (error, attempt) => {
        console.log(
          `Attempt: ${attempt} - Failed to fetch status page: ${error.message}`,
        );
      },
    });

    async function fetchStatusPage() {
      try {
        const response = await fetch("http://localhost:3000/api/v1/status");
        if (!response.ok) throw new Error(`HTTP Error ${response.status}`);
      } catch (error) {
        console.error("Não foi possível buscar a páguina de status: ", error);
        throw error;
      }
    }
  }
}

const orchestrator = {
  waitForAllServices,
};
export default orchestrator;
