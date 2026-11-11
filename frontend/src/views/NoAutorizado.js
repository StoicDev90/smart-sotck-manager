export default function NoAutorizado() {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h2>No autorizado</h2>
        <p>No tenés permisos para acceder a esta página.</p>
  
        <button onClick={() => window.history.back()}>
          Volver
        </button>
      </div>
    );
  }