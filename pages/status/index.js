import useSWR from "swr";

async function fetchAPI(key) {
  const response = await fetch(key);
  const responseBody = await response.json();

  return responseBody;
}

export default function DataBaseStatusPage() {
  return (
    <>
      <h1>Status</h1>
      <DataBaseStatus />
    </>
  );
}

function DataBaseStatus() {
  const { isLoading, data } = useSWR("api/v1/status", fetchAPI, {
    refreshInterval: 200,
  });

  let databaseStatusInfo = "Carregando...";

  if (!isLoading && data) {
    databaseStatusInfo = (
      <>
        <div>
          <b>Conexões Abertas:</b>{" "}
          {data.dependencies.database.opened_connections}
        </div>
        <div>
          <b>Conexões Máximas:</b> {data.dependencies.database.max_connections}
        </div>
        <div>
          <b>Versão PostgreSQL:</b> {data.dependencies.database.version}
        </div>
        <div>
          <b>Última Atualização:</b>{" "}
          {new Date(data.updated_at).toLocaleString("pt-BR")}
        </div>
      </>
    );
  }

  return databaseStatusInfo;
}
