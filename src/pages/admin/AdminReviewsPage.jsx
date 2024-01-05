import { useEffect, useState } from "react";
import HeaderAdmin from "../../components/admin/HeaderAdmin";
import { jwtDecode } from "jwt-decode";
import Footer from "../../components/guest/Footer";

function AdminReviewsPage() {

    const [profile, setProfile] = useState(null);

    const [errorMessages, setErrorMessages] = useState({});

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
            const deleteReviewResponse = await fetch("http://localhost:3001/api/reviews/" + reviewsId, {
                method: "DELETE",
                headers: { Authorization: "Bearer " + token }
            });

            // Boolean pour gérer les messages de status et le rafraichissement de la page
            if (deleteReviewResponse.status === 403) {
                setErrorMessages((prevErrors) => ({
                    ...prevErrors,
                    [reviewsId]: `Droits insuffisants`
                }));
            } else if (deleteReviewResponse.status === 200) {
                setTimeout(() => {
                    window.location.reload();
                }, 500);
            } else {
                setErrorMessages((prevErrors) => ({
                    ...prevErrors,
                    [reviewsId]: `Erreur ! `
                }));
            }

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
                                            {errorMessages[review.id] && <p>{errorMessages[review.id]}</p>}
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