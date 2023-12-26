// import { useNavigate } from "react-router-dom";
import HeaderAdmin from "../../components/admin/HeaderAdmin";
// import { jwtDecode } from "jwt-decode";

function DashboardPage() {

  // const navigate = useNavigate();

  // const token = localStorage.getItem("jwt");

  // const decodedToken = jwtDecode(token)

  // if (decodedToken.data.role !== 3) {
  //   console.log(decodedToken);
  //   navigate('/homepage')
  // }

  return (
    <>
      <HeaderAdmin />
      <p>Dashboard page</p>
    </>
  );
}

export default DashboardPage;
