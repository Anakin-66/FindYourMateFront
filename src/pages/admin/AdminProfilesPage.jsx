import { jwtDecode } from "jwt-decode";
import HeaderAdmin from "../../components/admin/HeaderAdmin";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function AdminProfilesPage() {
  const [profiles, setProfiles] = useState(null);

  const token = localStorage.getItem("jwt");

  const decodedToken = jwtDecode(token)

  // Fetch pour get tout les profils
  useEffect(() => {
    (async () => {
      const profilesResponse = await fetch("http://localhost:3001/api/profils")
      const profilesResponseData = await profilesResponse.json();
      setProfiles(profilesResponseData)
      console.log(profilesResponseData);
    })();
  }, [])

  // Fetch pour supprimer un profil
  const handleDeleteProfiles = async (event, profilesId) => {
    // Déclaration d'une variable avec un fetch de l'api pour récupérer le delete + l'id du coworking
    await fetch("http://localhost:3001/api/profils/" + profilesId, {
      // La méthode "DELETE" est un delete
      method: "DELETE",
      // Seulement quelqu'un qui a un token peut supprimer les coworkings (On l'a pas encore restreint au superadmin si je dis pas de bêtise)
      headers: { Authorization: "Bearer " + token }
    });
    // Second fetch d'api pour mettre a jour suite à une supression d'un coworking
    const profilesResponse = await fetch('http://localhost:3001/api/profils');
    const profilesResponseData = await profilesResponse.json();
    setProfiles(profilesResponseData);
  }

  // // Fetch pour créer un feedback
  // const handleCreateReview = async (event, profileId) => {
  //   event.preventDefault();

  //   // je récupère les valeurs du formulaire
  //   const content = event.target.content.value;
  //   const rating = event.target.rating.value;

  //   // je créé un objet avec les valeurs du formulaire
  //   // + l'id du coworking passé en parametre
  //   const reviewToCreate = {
  //     content: content,
  //     rating: rating,
  //     ProfilId: profileId,
  //   };

  //   // je transforme en JSON mon objet
  //   const reviewToCreateJson = JSON.stringify(reviewToCreate);

  //   // je fais mon appel fetch sur la création d'une review
  //   // en passant le token en authorization
  //   // et le le json avec les données du form (et l'id du coworking)
  //   await fetch("http://localhost:3001/api/reviews", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: "Bearer " + token,
  //     },
  //     body: reviewToCreateJson,
  //   });
  // };

console.log(profiles);

  return (
    <>
      <HeaderAdmin />
      <h1>Liste des profils : </h1>
      {profiles ? (
        <>
          {profiles.map((profile) => {
            return (
              <article>
                <h2>{profile.inGameName}</h2>
                {decodedToken.data.role !== 3 && (
                  <button onClick={(event) => handleDeleteProfiles(event, profile.id)}>Supprimer le profil</button>
                )}
                <Link to={`/admin/profils/update/${profile.id}`}>
                  <button>Mettre à jour le profil</button>
                </Link>
              </article>
            );
          })}
        </>
      ) : (
        <p>En cours de chargement</p>
      )}

    </>
  );
}

export default AdminProfilesPage;
