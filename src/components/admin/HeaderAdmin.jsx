import { Link, useNavigate } from "react-router-dom"

function HeaderAdmin() {

  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
        </ul>
        <ul>
          <li>
            <Link to="/admin">Dashboard</Link>
          </li>
        </ul>
        <ul>
          <li>
            <Link to="/admin/profils">Gérer les profils</Link>
          </li>
        </ul>
        <ul>
          <li>
            <Link to="/admin/users">Gérer les utilisateurs</Link>
          </li>
        </ul>
        <ul>
          <li>
            <Link to="/admin/reviews">Gérer les commentaires</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default HeaderAdmin;
