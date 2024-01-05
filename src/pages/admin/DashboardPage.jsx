// import { jwtDecode } from "jwt-decode";
// import { useNavigate } from "react-router-dom";
import HeaderAdmin from "../../components/admin/HeaderAdmin";
import Footer from "../../components/guest/Footer";
import { useVerifyIfUserIsLogged } from "../../utils/security-utils";


function DashboardPage() {
  // const navigate = useNavigate();

  // const token = localStorage.getItem("jwt");
  // console.log("Token:", token);

  // const decodedToken = jwtDecode(token)
  // console.log("Decoded Token:", decodedToken);

  // if (decodedToken.data.role !== 3) {
  //   navigate("/");
  // }

  useVerifyIfUserIsLogged();

  return (
    <>
      <HeaderAdmin />
      <div className="backgroundImg">
        <h2>Bienvenu dans le dashboard admin</h2>
      </div>
      <Footer />
    </>
  );
}

export default DashboardPage;
