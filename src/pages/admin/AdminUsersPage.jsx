import { jwtDecode } from "jwt-decode";
import HeaderAdmin from "../../components/admin/HeaderAdmin";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function AdminUsersPage() {

    const [users, setUsers] = useState(null);

    const token = localStorage.getItem("jwt");

    const decodedToken = jwtDecode(token)
    console.log(token);

    // Fetch pour get tout les utilisateurs
    useEffect(() => {
        (async () => {
            const usersResponse = await fetch("http://localhost:3001/api/users")
            const usersResponseData = await usersResponse.json();
            setUsers(usersResponseData)
            console.log(usersResponseData);
        })();
    }, [])

    // Fetch pour supprimer un utilisateur
    const handleDeleteUsers = async (event, usersId) => {
        // Déclaration d'une variable avec un fetch de l'api pour récupérer le delete + l'id de l'utilisateur
        await fetch("http://localhost:3001/api/users/" + usersId, {
            // La méthode "DELETE" est un delete
            method: "DELETE",
            // Seulement quelqu'un qui a un token peut supprimer les utilisateurs 
            headers: { Authorization: "Bearer " + token }
        });
        // Second fetch d'api pour mettre a jour suite à une supression d'un utilisateur
        const usersResponse = await fetch('http://localhost:3001/api/users');
        const usersResponseData = await usersResponse.json();
        setUsers(usersResponseData);
    }

    return (
        <>
            <HeaderAdmin />
            <h1>Liste des utilisateurs : </h1>
            {users ? (
                <>
                    {users.map((user) => {
                        return (
                            <article>
                                <h2>{user.username}</h2>
                                {/* récupération du token.data, si le role de l'utilisateur n'est pas 3 alors il ne peut pas supprimer un utilisateur */}
                                {decodedToken.data.role !== 3 && (
                                    <button onClick={(event) => handleDeleteUsers(event, user.id)}>Supprimer l'utilisateur</button>
                                )}
                                <Link to={`/admin/users/update/${user.id}`}>
                                    <button>Mettre à jour l'utilisateur</button>
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
