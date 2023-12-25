import { useParams } from "react-router-dom";
import HeaderAdmin from "../../components/admin/HeaderAdmin";
import { useEffect, useState } from "react";

function AdminUsersUpdatePage() {

    // Hook useParams pour faire le lien avec un profil id
    const { id } = useParams();
    // Hook useState pour récupérer un user 
    const [user, setUser] = useState(null)
    // Hook useState pour display le message
    const [message, setMessage] = useState(null);

    // Hook useEffect pour que le composant ne boucle pas à l'infini
    useEffect(() => {
        (async () => {
            const userResponse = await fetch("http://localhost:3001/api/users/" + id);
            const userResponseData = await userResponse.json();
            setUser(userResponseData.data);
            console.log(userResponseData.data);
        })();
    }, []);


    // bouton du update profil
    const handleUpdateUser = async (event) => {
        // Pour éviter le rafraichissement de base des formulaires
        event.preventDefault();

        // On récupère les champs du formulaire
        const username = event.target.username.value;
        const password = event.target.password.value;


        // Déclaration d'une variable d'objet coworkingToCreate qui correspond au model de l'api
        const userUpdateData = {
            username: username,
            password: password

        };

        // Conversion en json
        const userUpdateDataJson = JSON.stringify(userUpdateData);
        // récupération du token
        const token = localStorage.getItem("jwt");
        console.log(userUpdateData);
        // fetching des coworkings + leur id respectif
        const updateUserResponse = await fetch("http://localhost:3001/api/users/" + id, {
            // La méthode est un "PUT"
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
            // Récupération du contenu du body
            body: userUpdateDataJson
        })
        console.log(updateUserResponse);

        // Affichage du message pour confirmer que c'est réussi ou non
        if (updateUserResponse.status === 201) {
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
                {user && (
                    <form onSubmit={handleUpdateUser}>
                        <div>
                            <label>
                                Nom d'utilisateur :
                                <input type="text" name="username" defaultValue={user.username} readOnly />
                            </label>
                        </div>
                        <div>
                            <label>
                                Mot de passe :
                                <input type="password" name="password" value={user.password} />
                            </label>
                        </div>
                        <input type="submit" />
                    </form>
                )}
            </div>
        </>
    );
}

export default AdminUsersUpdatePage;
