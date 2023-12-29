import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/guest/Header";
import Footer from "../../components/guest/Footer";

function LoginPage() {

  // useState pour message de connexion (si logged in ou non)
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  //  la fonction est asynchronne car il y a un fetch d'API
  const handleLogin = async (event) => {
    event.preventDefault();

    // On récupère le username et password des inputs avec un event.target
    const username = event.target.username.value;
    const password = event.target.password.value;

    console.log(username, password);

    // Déclaration d'une variable d'objet loginData qui correspond au model de l'api
    const loginData = {
      username,
      password,
    }

    // On récupère le loginData qui sera traduit en JSON
    const loginDataJson = JSON.stringify(loginData)

    // Déclaration d'une variable avec un fetch de l'api pour récupérer le login
    const loginResponse = await fetch("http://localhost:3001/api/users/login", {
      // La méthode login est un POST
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // Récupération du contenu du body
      body: loginDataJson,
    })

    // la réponse de l'api est récupéré et envoyée vers le front en json
    const loginResponseData = await loginResponse.json();
    // Récupération du Token
    const token = loginResponseData.data;

    if (token) {
      localStorage.setItem("jwt", token)
      setMessage("Vous êtes bien connecté");
      navigate("/");
    } else {
      setMessage("Erreur lors de la connexion");
    }

  };

  return (
    <>
      <Header />
      <div className="backgroundImg">
        <h2>Connectez-vous</h2>
        <div className="outerContainer">
          <div className="innerContainer">
            {message && <p>{message}</p>}
            <form className="formContainer" onSubmit={handleLogin}>
              <label>
                Nom d'utilisateur
                <input type="text" name="username" />
              </label>
              <label>
                Mot de passe
                <input type="password" name="password" />
              </label>
              <button className="button1" type="submit">Se connecter</button> 
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default LoginPage;
