import { Link } from "react-router-dom";
import logo from "../../assets/images/FYM_Logo.svg"
import profilLogo from "../../assets/images/user-solid.svg"
import '../../assets/scss/partials/_header.scss'

function Header() {
  return (
    <nav>
      <ul>
        <img className="fym-logo" src={logo} alt="logo" />
        <li>
          <Link to="/">
            Home
          </Link>
        </li>
        <li>
          <Link to="/profils">
            Profils
          </Link>
        </li>
        <li>
          <Link to="/contact">
            Contactez-nous
          </Link>
        </li>
        <li>
          <form action="/search" method="get" className="search-form">
            <input type="text" id="search" name="q" placeholder="Search..." className="search-input" />
            <div className="search-icon"></div>
          </form>
        </li>
      </ul>
      <ul>
        <li>
          <Link to="/register">
            <button>S'inscrire</button>
          </Link>
        </li>
        <li>
          <Link to="/login">
            <button>Se connecter</button>
          </Link>
        </li>
      </ul>
      <img className="profil-logo" src={profilLogo} alt="profilLogo" />
    </nav>

  );
}

export default Header;
