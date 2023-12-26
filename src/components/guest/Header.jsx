import { ReactComponent as Logo } from "../../assets/images/FYM_Logo.svg"
import { ReactComponent as MagnifyingGlass } from "../../assets/images/magnifying-glass-solid.svg"

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
      </nav>
    </header>
  );
}

export default Header;
