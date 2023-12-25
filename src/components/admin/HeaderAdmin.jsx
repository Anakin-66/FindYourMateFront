import { Link, useNavigate } from "react-router-dom"

function HeaderAdmin() {

  const navigate = useNavigate();

  const handleLogout = () => {
    // sortir le token du local storage
    localStorage.removeItem("jwt");

    // redirige l'utilisateur vers la page de login
    navigate("/login");
  };

  return (
    <header>
      <nav>
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
        <button onClick={handleLogout}>Se déconnecter</button>
      </nav>
    </header>
  );
}

export default HeaderAdmin;
