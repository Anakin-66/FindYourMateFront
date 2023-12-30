import { useEffect, useState } from "react";
import Footer from "../../components/guest/Footer";
import Header from "../../components/guest/Header";
import profileIcon from "../../assets/images/profileicon.jpg"
import valorantImg from "../../assets/images/Valorant.jpg"
import leagueOfLegendsImg from "../../assets/images/LoL.jpg"
import apexImg from "../../assets/images/Apex.jpg"
import csgoImg from "../../assets/images/CSGO.jpg"
import { Link } from "react-router-dom";


function HomePage() {

  const [profiles, setProfiles] = useState(null);

  useEffect(() => {

    (async () => {
      const reponse = await fetch(`http://localhost:3001/api/profils/`)
      const data = await reponse.json();
      // Tri des profils par date de création décroissante
      const sortedProfiles = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      // Sélection des trois premiers profils
      const latestProfiles = sortedProfiles.slice(0, 3);
      setProfiles(latestProfiles)
      console.log(latestProfiles);
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
      <div className="backgroundImgNoFlex">
        <h2 className="profileTitle">Profils récents</h2>
        <main className="mainProfilePage">
          {/* Est-ce que profile contient quelque chose ? */}
          {profiles ? (
            <>
              {/* Je fais un array map pour récupérer les profils grâce à la variable profiles de useState */}
              {profiles.map((profile) => {
                return (
                  <article className="profileArticle">
                    <div className="outerContainerProfiles">
                      <div className="innerContainerProfiles">
                        <div className="profileInfo">
                          <img className="profileIcon" src={profileIcon} alt="profileIcon" />
                          <h3> {profile.inGameName} </h3>
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
        <h2>Jeux supportés</h2>
        <section className="supportedGames">
          <div className="outerContainerImg">
            <img className="homeImg" src={leagueOfLegendsImg} alt="" />
          </div>
        </section>
        <h2>Jeux bientôt supportés</h2>
        <section className="notSupportedGames">
          <div className="outerContainerImg">
            <img className="homeImg" src={valorantImg} alt="" />
          </div>
          <div className="outerContainerImg">
            <img className="homeImg" src={csgoImg} alt="" />
          </div>
          <div className="outerContainerImg">
            <img className="homeImg" src={apexImg} alt="" />
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}

export default HomePage;
