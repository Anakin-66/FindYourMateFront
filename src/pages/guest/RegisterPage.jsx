import Footer from "../../components/guest/Footer";
import Header from "../../components/guest/Header";
import { useState } from "react";
import { useNavigate } from "react-router-dom";  // Import the useNavigate hook


function RegisterPage() {

  // hook useState pour  gérer les messages
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  // Fonction asynchrone car y'a un fetch
  const handleCreateUser = async (event) => {
    // Pour éviter le comportement par défaut du formulaire
    event.preventDefault();
    // On récupère les champs des formulaires
    const username = event.target.username.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;

    // Vérifier que les mots de passe correspondent
    if (password !== confirmPassword) {
      setMessage("Les mots de passe ne correspondent pas.");
      return;
    }

    // Déclaration d'une variable d'objet userToCreate qui correspond au model de l'api
    const userToCreate = {
      username: username,
      password: password,
      RoleId: 3

    }
    console.log(userToCreate);
    // On récupère le userToCreate qui sera traduit en JSON
    const userToCreateJson = JSON.stringify(userToCreate)
    // Déclaration d'une variable avec un fetch de l'api pour récupérer les utilisateurs
    const createUserReponse = await fetch("http://localhost:3001/api/users", {
      // La méthode du create est un POST
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // Récupération du contenu du body
      body: userToCreateJson
    });

    // Boolean pour gérer les messages de status
    if (createUserReponse.status === 201) {
      setMessage(`Utilisateur crée`)
      // Redirect to the login page after successful registration
      navigate("/login");
    } else {
      setMessage(`Erreur ! `)
    }
  }

  return (
    <>
      <Header />
      <div className="backgroundImg">
        <h2>Inscrivez-vous</h2>
        <div className="outerContainer">
          <div className="innerContainer">
            {message && <p>{message}</p>}
            <form className="formContainer" onSubmit={handleCreateUser}>
              <label>
                Nom d'utilisateur
                <input type="text" name="username" />
              </label>
              <label>
                Mot de passe
                <input type="password" name="password" />
              </label>
              <label>
                Confirmez votre mot de passe
                <input type="password" name="confirmPassword" />
              </label>
              <button className="button1" type="submit">S'inscrire</button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default RegisterPage;
