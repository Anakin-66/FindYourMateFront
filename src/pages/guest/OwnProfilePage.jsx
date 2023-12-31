import { Link } from "react-router-dom";
import Footer from "../../components/guest/Footer";
import Header from "../../components/guest/Header";

function OwnProfilePage() {
  return (
    <>
      <Header />
      <div className="backgroundImg">
        <h2>Votre compte</h2>
        <div className="outerContainer">
          <div className="innerContainer">
            <div className="formContainer">
              <Link to="/account/edit/user" >
                <button className="button1">Modifier le mot de passe</button>
              </Link>
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

export default OwnProfilePage;
