import { useState } from "react";
import Footer from "../../components/guest/Footer";
import Header from "../../components/guest/Header";

function CreateProfilePage() {


  // hook useState pour  gérer les messages
  const [message, setMessage] = useState(null);
  // Fonction asynchrone car y'a un fetch
  const handleCreateProfile = async (event) => {
    // Pour éviter le comportement par défaut du formulaire
    event.preventDefault();
    // On récupère les champs des formulaires
    const inGameName = event.target.inGameName.value;
    const profileBio = event.target.profileBio.value;


    // Déclaration d'une variable d'objet coworkingToCreate qui correspond au model de l'api
    const profileToCreate = {
      inGameName: inGameName,
      profilBio: profileBio

    }
    console.log(profileToCreate);
    // On récupère le coworkingToCreate qui sera traduit en JSON
    const profileToCreateJson = JSON.stringify(profileToCreate)
    // On récupère le token
    const token = localStorage.getItem("jwt")
    // Déclaration d'une variable avec un fetch de l'api pour récupérer les coworkings
    const createProfileReponse = await fetch("http://localhost:3001/api/profils", {
      // La méthode du create est un POST
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      // Récupération du contenu du body
      body: profileToCreateJson
    });

    // Boolean pour gérer les messages de status
    if (createProfileReponse.status === 201) {
      setMessage(`Profil crée !`)
    } else {
      setMessage(`Erreur dans la création du profil ! `)
    }

    if (createProfileReponse.status === 400) {
      setMessage(`Vous avez déjà un profil enregristré sur votre compte !`)
    } 
  }

  return (
    <>
      <Header />
      <div className="backgroundImg">
        <div className="backgroundImg">
          <h2>Crée votre profil</h2>
          {message && <p>{message}</p>}
            <div className="outerContainer">
              <div className="innerContainer">
                <form onSubmit={handleCreateProfile}>
                  <div>
                    <label>
                      Pseudo
                      <input type="text" name="inGameName" />
                    </label>
                  </div>
                  <div>
                    <label>
                      Bio
                      <textarea className="labelDescribe" type="text" name="profileBio" />
                    </label>
                  </div>
                  <input className="button1" type="submit" />
                </form>
              </div>
            </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default CreateProfilePage;
