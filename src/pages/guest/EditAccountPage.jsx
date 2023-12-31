import { Link } from "react-router-dom";
import Footer from "../../components/guest/Footer";
import Header from "../../components/guest/Header";


function EditAccountPage() {

  return (
    <>
      <Header />
      <div className="backgroundImg">
        <h2>Votre compte</h2>
        <div className="outerContainer">
          <div className="innerContainer">
            <div className="formContainer">
              {/* Bouton qui redirige sur une page pour modifier le mot de passe */}
              <Link to={`/account/edit/user/`} >
                <button className="button1">Modifier le mot de passe</button>
              </Link>
              {/* Bouton qui redirige sur une page pour modifier le profil */}
              <Link to="/account/edit/profile" >
                <button className="button1">Modifier le profil</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default EditAccountPage;
