import { useEffect, useState } from "react";
import HeaderAdmin from "../../components/admin/HeaderAdmin";
import { jwtDecode } from "jwt-decode";
import Footer from "../../components/guest/Footer";

function AdminReviewsPage() {

    const [profile, setProfile] = useState(null);

    const [successMessage, setSuccessMessage] = useState(null); // Nouveau state pour le message de succès

    const [reviews, setReviews] = useState(null);
    // Seulement possible si un token a déjà été récupéré
    const token = localStorage.getItem("jwt");

    const decodedToken = jwtDecode(token)

    // Ce useEffect et fetch d'api sont utilisés pour le premier rendu du composant
    useEffect(() => {
        (async () => {
            const profileResponse = await fetch("http://localhost:3001/api/profils")
            const profileResponseData = await profileResponse.json();
            setProfile(profileResponseData)
            console.log(profileResponseData);
        })();
    }, []);

    const handleDeleteReviews = async (event, reviewsId) => {
        try {
            await fetch("http://localhost:3001/api/reviews/" + reviewsId, {
                method: "DELETE",
                headers: { Authorization: "Bearer " + token }
            });

            const reviewsResponse = await fetch('http://localhost:3001/api/reviews');
            const reviewsResponseData = await reviewsResponse.json();
            setReviews(reviewsResponseData);
            console.log('Reviews after deletion:', reviewsResponseData);

            // Mise à jour du state avec le message de succès
            setSuccessMessage("Le commentaire a été supprimé avec succès.");

            // Rechargement de la page après une pause de 1 seconde (pour laisser le temps au message d'être affiché)
            setTimeout(() => {
                window.location.reload();
            }, 1000);

        } catch (error) {
            console.error("Erreur lors de la suppression du commentaire :", error);
        }
    }


    return (
        <>
            <HeaderAdmin />
            <div className="backgroundImg">
                {/* Pour vérifier que profile existe, ensuite utilisation de la méthode map pour passer sur chaque éléments de profile */}
                {profile && profile.map(profil => (
                    <div>
                        <p>Pseudo du profil ayant reçu le(s) commentaire(s) : {profil.inGameName}</p>
                        {/* Vérifie si le profil à reçu un commentaire */}
                        {profil.Reviews.length > 0 ? (
                            <>
                                <p>Commentaire(s) :</p>
                                <ul>
                                    {/* Méthode map pour passer tout les commentaires du profil */}
                                    {profil.Reviews.map(review => (
                                        <li>
                                            <p>Commentaire : {review.content}</p>
                                            <p>Note reçu : {review.rating}</p>
                                            {/* récupération du token.data, si le role de l'utilisateur n'est pas 3 alors il ne peut pas supprimer un commentaire */}
                                            {decodedToken.data.role !== 3 && (
                                                <button className="button1" onClick={(event) => handleDeleteReviews(event, review.id)}>Supprimer le commentaire</button>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </>
                        ) : (
                            <p>Ce profil n'a pas reçu de commentaire</p>
                        )}
                    </div>
                ))}
            </div>
            <Footer />
        </>
    );
}

export default AdminReviewsPage;