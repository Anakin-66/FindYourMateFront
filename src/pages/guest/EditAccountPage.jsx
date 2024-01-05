import { Link, useNavigate } from "react-router-dom";
import Footer from "../../components/guest/Footer";
import Header from "../../components/guest/Header";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";


function EditAccountPage() {

  const [user, setUser] = useState(null);

  const token = localStorage.getItem("jwt");

  const decodedToken = jwtDecode(token)
  console.log(decodedToken);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const UserResponse = await fetch("http://localhost:3001/api/users/" + decodedToken.dataId);
      const userResponseData = await UserResponse.json();
      setUser(userResponseData.data);
      console.log(userResponseData.data);
    })();
  }, []);

  const handleDeleteUser = async (event, userId) => {
    // Message de confirmation du navigateur 
    const isConfirmed = window.confirm("Êtes-vous sûr de vouloir supprimer votre compte ?");

    if (isConfirmed) {
      try {
        // Fetch de la route OwnUser qui a des restrictions différentes de la route users basique qui sert à la route admin
        const response = await fetch("http://localhost:3001/api/users/ownUser/" + decodedToken.dataId, {
          method: "DELETE",
          headers: { Authorization: "Bearer " + token }
        });

        if (response.ok) {
          
          console.log("Le compte a bien été supprimé");
          
          logoutUser();
        } else {
          
          console.error("La suppression du compte a échoué");
          
        }
      } catch (error) {
        console.error("Une erreur est survenue pendant la suppression du compte:", error);
        
      }
    }
  };

  const logoutUser = () => {
    // Supprimer le jeton JWT du stockage local
    localStorage.removeItem("jwt");
    // Rediriger l'utilisateur vers la page d'inscription (ou toute autre page souhaitée)
    navigate("/register");
  };


  return (
    <>
      <Header />
      <div className="backgroundImg">
        <h2>Votre compte</h2>
        <div className="outerContainer">
          <div className="innerContainer">
            <div className="formContainer">
              {/* Bouton qui redirige sur une page pour créer un profil */}
              <Link to={`/account/create/profile`} >
                <button className="button1">Créer un profil</button>
              </Link>
              {/* Bouton qui redirige sur une page pour modifier le profil */}
              <Link to={`/account/edit/profile/`}>
                <button className="button1">Modifier le profil</button>
              </Link>
              {/* Bouton pour supprimer le compte */}
              <button className="button1" onClick={(event) => handleDeleteUser(event, user.Id)}>Supprimer mon compte</button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default EditAccountPage;
