import { Link } from "react-router-dom"

function HeaderAdmin() {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/admin/">Dashboard</Link>
          </li>
        </ul>
        <ul>
          <li>
            <Link to="/admin/profils/create">Créer un profil</Link>
          </li>
          <li>
            <Link to="/admin/profils/update">Mettre à jour un profil</Link>
          </li>
          <li>
            <Link to="/admin/profils/delete">Supprimer un profil</Link>
          </li>
        </ul>
        <ul>
          <li>
            <Link to="/admin/users/create">Créer un utilisateur</Link>
          </li>
          <li>
            <Link to="/admin/users/update">Mettre à jour un utilisateur</Link>
          </li>
          <li>
            <Link to="/admin/users/delete">Supprimer un utilisateur</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default HeaderAdmin;
