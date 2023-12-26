import { ReactComponent as Logo } from "../../assets/images/FYM_Logo.svg"
import profilLogo from "../../assets/images/user-solid.svg"
import '../../assets/scss/partials/_header.scss'

function Header() {
  return (
    <header>
      <Logo class="logo" />
      <nav>
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
          <button>S'inscrire</button>
          <button>Se connecter</button>
          <img src={profilLogo} alt="profilLogo" />
        </ul>
      </nav>
    </header>
  );
}

export default Header;
