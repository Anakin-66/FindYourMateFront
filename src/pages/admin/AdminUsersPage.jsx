import { jwtDecode } from "jwt-decode";
import HeaderAdmin from "../../components/admin/HeaderAdmin";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function AdminUsersPage() {

    const [users, setUsers] = useState(null);

    const token = localStorage.getItem("jwt");

    const decodedToken = jwtDecode(token)

    // Fetch pour get tout les profils
    useEffect(() => {
        (async () => {
            const usersResponse = await fetch("http://localhost:3001/api/users")
            const usersResponseData = await usersResponse.json();
            setUsers(usersResponseData)
            console.log(usersResponseData);
        })();
    }, [])

    // Fetch pour supprimer un profil
    const handleDeleteUsers = async (event, usersId) => {
        // Déclaration d'une variable avec un fetch de l'api pour récupérer le delete + l'id du coworking
        await fetch("http://localhost:3001/api/users/" + usersId, {
            // La méthode "DELETE" est un delete
            method: "DELETE",
            // Seulement quelqu'un qui a un token peut supprimer les coworkings (On l'a pas encore restreint au superadmin si je dis pas de bêtise)
            headers: { Authorization: "Bearer " + token }
        });
        // Second fetch d'api pour mettre a jour suite à une supression d'un coworking
        const usersResponse = await fetch('http://localhost:3001/api/users');
        const usersResponseData = await usersResponse.json();
        setUsers(usersResponseData);
    }

    return (
        <>
            <HeaderAdmin />
            <h1>Liste des profils : </h1>
            {users ? (
                <>
                    {users.map((user) => {
                        return (
                            <article>
                                <h2>{user.username}</h2>
                                {decodedToken.data.role !== 3 && (
                                    <button onClick={(event) => handleDeleteUsers(event, user.id)}>Supprimer le profil</button>
                                )}
                                <Link to={`/admin/users/update/${user.id}`}>
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

export default AdminUsersPage;
