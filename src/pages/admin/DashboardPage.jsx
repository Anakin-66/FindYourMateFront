// import { useNavigate } from "react-router-dom";
import HeaderAdmin from "../../components/admin/HeaderAdmin";
import Footer from "../../components/guest/Footer";
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
      <div className="backgroundImg">
        <h2>Bienvenu dans le dashboard admin</h2>
      </div>
      <Footer />
    </>
  );
}

export default DashboardPage;
