import { useParams } from "react-router-dom";
import Footer from "../../components/guest/Footer";
import Header from "../../components/guest/Header";
import profileIcon from "../../assets/images/profileicon.jpg"
import { useEffect, useState } from "react";
import { useVerifyIfUserIsLogged } from "../../utils/security-utils";

const ProfileDetailsPage = () => {
  // exécution du custom hook
  useVerifyIfUserIsLogged();

  const { id } = useParams();

  const [profile, setProfile] = useState(null);

  const [reviews, setReviews] = useState(null);

  const token = localStorage.getItem("jwt");

  // Je récupère mes profils + leur id
  useEffect(() => {
    (async () => {
      const reponse = await fetch(`http://localhost:3001/api/profils/` + id)
      const profileData = await reponse.json();
      setProfile(profileData.data)
      console.log(profileData.data);
    })()

  }, [])
  // Je récupère toutes les reviews
  useEffect(() => {
    (async () => {
      const reponse = await fetch(`http://localhost:3001/api/reviews/`)
      const reviewsData = await reponse.json();
      setReviews(reviewsData)
      console.log(reviewsData);
    })()

  }, [])

  // Fonction pour calculer la moyenne d'une note associer à un profil
  const calculateAverageRating = (reviews) => {
    if (reviews.length === 0) return 0;

    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    return totalRating / reviews.length;
  };

  // je créé une fonction, qui récupère un  id de profil
  // et qui va créer sur l'api une review
  const handleCreateReview = async (event, profileId) => {
    event.preventDefault();

    // je récupère les valeurs du formulaire
    const content = event.target.content.value;
    const rating = event.target.rating.value;

    // je créé un objet avec les valeurs du formulaire
    // + l'id du profil passé en parametre
    const reviewToCreate = {
      content: content,
      rating: rating,
      ProfilId: profileId,
    };

    // je transforme en JSON mon objet
    const reviewToCreateJson = JSON.stringify(reviewToCreate);

    // je fais mon appel fetch sur la création d'une review
    // en passant le token en authorization
    // et le le json avec les données du form (et l'id du profil)
    try {
      const response = await fetch("http://localhost:3001/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: reviewToCreateJson,
      });

      if (response.ok) {
        // Si le status de réponse est positif, informe l'utilisateur de son succès
        alert("Commentaire crée avec succès !");
        // Recharge la page en cas de succès
        window.location.reload();
      } else {
        // Si la réponse du statut n'est pas bonne alors il gère l'erreur
        console.error("Echec de la création du commentaire :", response.statusText);
        // Alerte l'utilisateur de l'échec de la création du commentaire
        alert("La création d'un commentaire à échoué. Veuillez réessayer.");
      }
    } catch (error) {
      // Pour gérer les erreurs côté réseau
      console.error("Une erreur est survenue:", error);
      // Informe l'utilisateur de l'erreur
      alert("Une erreur est survenue. Veuillez réessayer.");
    }
  };

  return (
    <>
      <Header />
      {profile ? (
        <div className="backgroundImgNoFlex">
          <h2> Détails de : {profile.inGameName} </h2>
          <main className="mainProfilePage">
            <article className="profileArticle">
              <div className="outerContainerProfiles">
                <div className="innerContainerProfiles">
                  <div className="profileInfo">
                    <img className="profileIcon" src={profileIcon} alt="profileIcon" />
                    <h3>{profile.inGameName}</h3>
                    <p>Description du profil : {profile.profilBio}</p>
                    <p>Note moyenne reçu : {" "} {profile.Reviews.length > 0 ? calculateAverageRating(profile.Reviews) : "Aucune note"}</p>
                  </div>
                </div>
              </div>
            </article>
          </main>
          <h2>Section commentaire</h2>
          <section className="reviewSection">
            <div className="reviewContainer">
              {reviews ? (
                <>
                  {reviews
                    // Je filtre mes reviews pour que l'id du profil qui a posté la review soit associé au bon profil
                    .filter((review) => review.ProfilId === profile.id)
                    .map((review) => (
                      <article className="reviewArticle" key={review.id}>
                        {/* <img className="profileIcon" src={profileIcon} alt="profileIcon" /> */}
                        <p>Utilisateur : {review.User.username}</p>
                        <p>Commentaire : {review.content}</p>
                        <p>Note : {review.rating}</p>
                      </article>
                    ))}
                </>
              ) : (
                <p>En cours de chargement</p>
              )}
              {/* je créé un form pour chaque profil et au submit j'appelle la fonction handleCreateReviewen lui passant l'id du profil actuel*/}
              <div className="formReviewContainer">
                <div className="innerContainerReview">
                  <form className="reviewForm" onSubmit={(event) => handleCreateReview(event, profile.id)}>
                    <label className="reviewLabel">
                      Commentaire
                      <textarea className="labelDescribe" type="text" name="content" />
                    </label>

                    <label>
                      Note
                      <input type="number" name="rating" />
                    </label>
                    <input className="button1" type="submit" />
                  </form>
                </div>
              </div>
            </div >
          </section>
        </div >
      ) : (
        <p>En cours de chargement</p>
      )
      }
      <Footer />
    </>
  );
}

export default ProfileDetailsPage;
