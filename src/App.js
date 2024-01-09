import { BrowserRouter, Routes, Route } from "react-router-dom";
// Import côté guest
import HomePage from "./pages/guest/HomePage";
import ContactPage from "./pages/guest/ContactPage";
import ProfilePage from "./pages/guest/ProfilePage";
import ProfileDetailsPage from "./pages/guest/ProfileDetailsPage";
import LoginPage from "./pages/guest/LoginPage";
import EditAccountPage from "./pages/guest/EditAccountPage";
import EditProfilePage from "./pages/guest/EditProfilePage";
import EditUserPage from "./pages/guest/EditUserPage";
import RegisterPage from "./pages/guest/RegisterPage";
import CreateProfilePage from "./pages/guest/CreateProfilePage";
// Import côté admin
import DashboardPage from "./pages/admin/DashboardPage";
import AdminProfilesPage from "./pages/admin/AdminProfilesPage";
import AdminProfilesUpdatePage from "./pages/admin/AdminProfilesUpdatePage";
import AdminUsersPage from "./pages/admin/AdminUsersPage";
import AdminUsersUpdatePage from "./pages/admin/AdminUsersUpdatePage";
import AdminReviewsPage from "./pages/admin/AdminReviewsPage";
// Import CSS
import "./assets/scss/style.scss"
import './assets/scss/partials/_header.scss'
import './assets/scss/partials/_main.scss'
import './assets/scss/partials/_mainProfiles.scss'
import './assets/scss/partials/_homeImages.scss'
import './assets/scss/partials/_reviewSection.scss'
import './assets/scss/partials/_footer.scss'
import { jwtDecode } from "jwt-decode";



const token = localStorage.getItem("jwt");

const decodedToken = jwtDecode(token)

// if (condition) {
  
// }



function App() {
  console.log(decodedToken);
  return (
    <BrowserRouter>
      <Routes>
        {/* Guest */}
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profils" element={<ProfilePage />} />
        <Route path="/account/edit" element={<EditAccountPage />} />
        <Route path="/account/create/profile" element={<CreateProfilePage />} />
        <Route path="/account/edit/profile/" element={<EditProfilePage />} />
        <Route path="/account/edit/user/:id" element={<EditUserPage />} />
        <Route path="/profil/details/:id" element={<ProfileDetailsPage />} />
        <Route path="/contact" element={<ContactPage />} />

        {/* Admin */}
        {decodedToken.dataRole !== 3 && (
          <>
            <Route path="/admin" element={<DashboardPage />} />
            <Route path="/admin/profils" element={<AdminProfilesPage />} />
            <Route path="/admin/profils/update/:id" element={<AdminProfilesUpdatePage />} />
            <Route path="/admin/users" element={<AdminUsersPage />} />
            <Route path="/admin/users/update/:id" element={<AdminUsersUpdatePage />} />
            <Route path="/admin/reviews/" element={<AdminReviewsPage />} />
          </>
        )}
      </Routes>
    </BrowserRouter >
  );
}

export default App;
