import { Link, useParams } from "react-router-dom";
import Footer from "../../components/guest/Footer";
import Header from "../../components/guest/Header";
import { useEffect, useState } from "react";


function EditAccountPage() {

  // const { id } = useParams();

  // const [profiles, setProfiles] = useState(null);

  // const [users, setUsers] = useState(null);

  // // Fetch pour get tout les profils
  // useEffect(() => {
  //   (async () => {
  //     const reponse = await fetch(`http://localhost:3001/api/profils/` + id)
  //     const data = await reponse.json();
  //     setProfiles(data.data)
  //     console.log(data.data);
  //   })()

  // }, [])

  // // Fetch pour get tout les utilisateurs
  // useEffect(() => {
  //   (async () => {
  //     const usersResponse = await fetch("http://localhost:3001/api/users" + id)
  //     const usersResponseData = await usersResponse.json();
  //     setUsers(usersResponseData.data)
  //     console.log(usersResponseData.data);
  //   })();
  // }, [])


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
              {/* Bouton qui redirige sur une page pour modifier le mot de passe */}
              <Link to={`/account/edit/user/:id`}>
                <button className="button1">Modifier le mot de passe</button>
              </Link>
              {/* Bouton qui redirige sur une page pour modifier le profil */}
              <Link to={`/account/edit/profile/:id`}>
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
