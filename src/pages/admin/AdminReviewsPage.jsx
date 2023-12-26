import { useEffect, useState } from "react";
import HeaderAdmin from "../../components/admin/HeaderAdmin";
import { jwtDecode } from "jwt-decode";

function AdminReviewsPage() {

    const [profile, setProfile] = useState(null);

    const [reviews, setReviews] = useState(null);
    // Seulement possible si un token a déjà été récupéré
    const token = localStorage.getItem("jwt");

    const decodedToken = jwtDecode(token)

    // Ce useEffect et fetch d'api sont utilisés pour le premier rendu du composant
    useEffect(() => {
        console.log('Effect is running...');
        (async () => {
            const profileResponse = await fetch("http://localhost:3001/api/profils")
            const profileResponseData = await profileResponse.json();
            setProfile(profileResponseData)
            console.log(profileResponseData);
        })();
    }, []);

    const handleDeleteReviews = async (event, reviewsId) => {
        // Déclaration d'une variable avec un fetch de l'api pour récupérer le delete + l'id du review
        await fetch("http://localhost:3001/api/reviews/" + reviewsId, {
            // La méthode "DELETE" est un delete
            method: "DELETE",
            // Seulement quelqu'un qui a un token peut supprimer les reviews (On l'a pas encore restreint au superadmin si je dis pas de bêtise)
            headers: { Authorization: "Bearer " + token }
        });
        // Second fetch d'api pour mettre a jour suite à une supression d'un profil
        const reviewsResponse = await fetch('http://localhost:3001/api/reviews');
        const reviewsResponseData = await reviewsResponse.json();
        setReviews(reviewsResponseData);
        console.log('Reviews after deletion:', reviewsResponseData);
    }


    return (
        <>
            <HeaderAdmin />
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
                                        <button onClick={(event) => handleDeleteReviews(event, review.id)}>Supprimer le commentaire</button>
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
        </>
    );
}

export default AdminReviewsPage;
