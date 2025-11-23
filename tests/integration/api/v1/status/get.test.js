// Todos os testes que fazem get.
test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();
  expect(responseBody.updated_at).toBeDefined();

  /*
    Ao passar um valor nulo para Date, ele retorna a data lançamento do unix.
    O que, ao fazer uma comparação direta com o que foi enviado no json (null),
    gera um erro de correspondência.
  */
  const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();
  expect(responseBody.updated_at).toEqual(parsedUpdatedAt);

  contentValidation(responseBody.postgres_version, "object");
  contentValidation(responseBody.max_connections, "object");
  contentValidation(responseBody.most_used_connections, "object");
});

function contentValidation(object, type) {
  expect(typeof object).toBe(type);
  expect(object).not.toBeNull();
}
