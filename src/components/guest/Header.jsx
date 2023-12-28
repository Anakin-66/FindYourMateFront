import { Link, useNavigate, useParams } from "react-router-dom";
import logo from "../../assets/images/FYM_Logo.svg"
import profilLogo from "../../assets/images/user-solid.svg"
import '../../assets/scss/partials/_header.scss'
import { useState } from "react";

function Header() {

  const navigate = useNavigate();

  // Assume you have a state variable to track the user's login status
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("jwt"));

  const handleLogout = () => {
    // sortir le token du local storage
    localStorage.removeItem("jwt");

    // Met à jour le status et redirige l'utilisateur à la page login
    setIsLoggedIn(false);
    navigate("/login");
  };


  return (
    <nav>
      <ul className="navUnorderedList">
        <img className="fym-logo" src={logo} alt="logo" />
        <li className="navList">
          <Link to="/">
            <span className="underline">Home</span>
          </Link>
        </li>
        <li className="navList">
          <Link to="/profils">
            <span className="underline">Profils</span>
          </Link>
        </li>
        <li className="navList">
          <Link to="/contact">
            <span className="underline">Contactez-nous</span>
          </Link>
        </li>
        <li className="navList">
          <form action="/search" method="get" className="search-form">
            <input type="text" id="search" name="q" placeholder="Search..." className="search-input" />
            <div className="search-icon"></div>
          </form>
        </li>
      </ul>
      <ul className="navUnorderedList">
        <li className="navList">
          {/* Si l'utilisateur est connecté alors affiche le bouton se déconnecter, sinon affiche le bouton s'inscrire */}
          {isLoggedIn ? (
            <button className="navButton" onClick={handleLogout}>Se déconnecter</button>
          ) : (
            <Link to="/register">
              <button className="navButton">S'inscrire</button>
            </Link>
          )}
        </li>
        <li className="navList">
          {/* Bouton se connecter afficher si l'utilisateur est connecté ou non */}
          {isLoggedIn ? (
            null
          ) : (
            <Link to="/login">
              <button className="navButton">Se connecter</button>
            </Link>
          )}
        </li>
      </ul>
      <img className="profil-logo" src={profilLogo} alt="profilLogo" />
    </nav>
  );
}

export default Header;