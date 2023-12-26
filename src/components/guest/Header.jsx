import { ReactComponent as Logo } from "../../assets/images/FYM_Logo.svg"
import profilLogo from "../../assets/images/user-solid.svg"
import '../../assets/scss/partials/_header.scss'

function Header() {
  return (

    <nav>
      <Logo class="logo" />
      <ul>
        <li>
          Profil
        </li>
        <li>
          Contactez-nous
        </li>
        <li>
          <form action="/search" method="get" class="search-form">
            <input type="text" id="search" name="q" placeholder="Search..." class="search-input" />
            <div class="search-icon"></div>
          </form>
        </li>
      </ul>
      <ul>
        <li>
          <button>S'inscrire</button>
        </li>
        <li>
          <button>Se connecter</button>
        </li>
        <li>
          <img src={profilLogo} alt="profilLogo" />
        </li>
      </ul>
    </nav>

  );
}

export default Header;
