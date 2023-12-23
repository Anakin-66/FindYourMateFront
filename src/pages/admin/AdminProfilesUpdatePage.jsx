import { useParams } from "react-router-dom";
import HeaderAdmin from "../../components/admin/HeaderAdmin";
import { useEffect, useState } from "react";

function AdminProfilesUpdatePage() {

    // Hook useParams pour faire le lien avec un coworking id
    const { id } = useParams();
    // Hook useState pour récupérer les coworkings
    const [profile, setProfile] = useState(null)
    // Hook useState pour display le message
    const [message, setMessage] = useState(null);

    // Hook useEffect pour que le composant ne boucle pas à l'infini
    useEffect(() => {
        (async () => {
            const profileResponse = await fetch("http://localhost:3001/api/profils/" + id);
            const profileResponseData = await profileResponse.json();
            setProfile(profileResponseData.data);
        })();
    }, []);


    // bouton du update coworking
    const handleUpdateProfile = async (event) => {
        // Pour éviter le rafraichissement de base des formulaires
        event.preventDefault();

        // On récupère les champs du formulaire
        const inGameName = event.target.inGameName.value;
        const profileBio = event.target.profileBio.value;
        // const ranksLabel = event.target.ranksLabel.value;
        // const gameRoleLabel = event.target.gameRoleLabel.value;



        // Déclaration d'une variable d'objet coworkingToCreate qui correspond au model de l'api
        const profileUpdateData = {
            inGameName: inGameName,
            profilBio: profileBio,
            // GameRank: {
            //     ranksLabel: ranksLabel
            // },
            // GameRole: {
            //     gameRoleLabel: gameRoleLabel
            // },
        };

        // Conversion en json
        const profileUpdateDataJson = JSON.stringify(profileUpdateData);
        // récupération du token
        const token = localStorage.getItem("jwt");
        // fetching des coworkings + leur id respectif
        const updateProfileResponse = await fetch("http://localhost:3001/api/profils/" + id, {
            // La méthode est un "PUT"
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
            // Récupération du contenu du body
            body: profileUpdateDataJson
        })

        // Affichage du message pour confirmer que c'est réussi ou non
        if (updateProfileResponse.status === 201) {
            setMessage('Mise à jour OK')
        } else {
            setMessage('Erreur')
        }
    }


    return (
        <>
            <HeaderAdmin />
            <div>
                {message && <p>{message}</p>}
                {profile && (
                    <form onSubmit={handleUpdateProfile}>
                        <div>
                            <label>
                                Pseudo
                                <input type="text" name="inGameName" defaultValue={profile.inGameName} />
                            </label>
                        </div>
                        <div>
                            <label>
                                Bio
                                <input type="text" name="profileBio" defaultValue={profile.profilBio} />
                            </label>
                        </div>
                        <input type="submit" />
                    </form>
                )}
            </div>
        </>
    );
}

export default AdminProfilesUpdatePage;