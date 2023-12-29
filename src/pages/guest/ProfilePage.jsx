import { useEffect, useState } from "react";
import Header from "../../components/guest/Header";
import Footer from "../../components/guest/Footer";
import profileIcon from "../../assets/images/profileicon.jpg"
import { Link } from "react-router-dom";

function ProfilePage() {

  const [profiles, setProfiles] = useState(null);

  useEffect(() => {

    (async () => {
      const reponse = await fetch(`http://localhost:3001/api/profils/`)
      const data = await reponse.json();
      setProfiles(data)
      console.log(data);
    })()

  }, [])

  // Fonction pour calculer la moyenne d'une note associer à un profil
  const calculateAverageRating = (reviews) => {
    if (reviews.length === 0) return 0;

    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    return totalRating / reviews.length;
  };


  return (
    <>
      <Header />
      <div className="backgroundImg">
        <h2>Profils de joueurs</h2>
        <main className="mainProfilePage">
          {/* Est-ce que profile contient quelque chose ? */}
          {profiles ? (
            <>
              {/* Je fais un array map pour récupérer les profils grâce à la variable profiles de useState */}
              {profiles.map((profile) => {
                return (
                  <article className="profileArticle">
                    <div className="outerContainer">
                      <div className="innerContainer">
                        <div className="profileContainer">
                          <div className="profileInfo">
                            <img className="profileIcon" src={profileIcon} alt="profileIcon" />
                            <h3> {profile.inGameName} </h3>
                          </div>
                        </div>
                        <p>Note moyenne : {" "} {profile.Reviews.length > 0 ? calculateAverageRating(profile.Reviews) : "Aucune note"}</p>
                        <Link to={`/profil/details/${profile.id}`}><button className="button1">Voir les détails du profil</button></Link>
                      </div>
                    </div>
                  </article>
                )

              })}
            </>

          ) : (

            <p>Profils en cours de chargement</p>

          )}
        </main>
      </div>
      <Footer />
    </>
  );
}

export default ProfilePage;
