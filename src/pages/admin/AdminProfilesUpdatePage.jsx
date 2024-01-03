import { useParams } from "react-router-dom";
import HeaderAdmin from "../../components/admin/HeaderAdmin";
import { useEffect, useState } from "react";
import Footer from "../../components/guest/Footer";

function AdminProfilesUpdatePage() {

    // Hook useParams pour faire le lien avec un profil id
    const { id } = useParams();
    // Hook useState pour récupérer les profils
    const [profile, setProfile] = useState(null)
    // Hook useState pour display le message
    const [message, setMessage] = useState(null);

    // Hook useEffect pour que le composant ne boucle pas
    useEffect(() => {
        (async () => {
            const profileResponse = await fetch("http://localhost:3001/api/profils/" + id);
            const profileResponseData = await profileResponse.json();
            setProfile(profileResponseData.data);
            console.log(profileResponseData.data);
        })();
    }, []);


    // bouton du update profil
    const handleUpdateProfile = async (event) => {
        // Pour éviter le rafraichissement de base des formulaires
        event.preventDefault();

        // On récupère les champs du formulaire
        const inGameName = event.target.inGameName.value;
        const profileBio = event.target.profileBio.value;



        // Déclaration d'une variable d'objet profileUpdateData qui correspond au model de l'api
        const profileUpdateData = {
            inGameName: inGameName,
            profilBio: profileBio,
        };

        // Conversion en json
        const profileUpdateDataJson = JSON.stringify(profileUpdateData);
        // récupération du token
        const token = localStorage.getItem("jwt");
        console.log(profileUpdateData);
        // fetching des profils + leur id respectif
        const updateProfileResponse = await fetch("http://localhost:3001/api/profils/" + id, {
            // La méthode est un "PUT" (un update)
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
            // Récupération du contenu du body
            body: profileUpdateDataJson
        })
        console.log(updateProfileResponse);

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
            <div className="backgroundImg">
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
                        <input className="button1" type="submit" />
                    </form>
                )}
            </div>
            <Footer />
        </>
    );
}

export default AdminProfilesUpdatePage;