export default function AdminPage() {
    return (
      <div>
        <h2>Bienvenido al Panel de Administración</h2>
        <p>Administra los torneos y juegos desde aquí.</p>
        <ul>
          <li><a href="/admin/tournaments">Ver Torneos</a></li>
          <li><a href="/admin/games">Ver Juegos</a></li>
        </ul>
      </div>
    );
  }
  