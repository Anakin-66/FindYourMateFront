import { BrowserRouter, Routes, Route } from "react-router-dom";
// Import côté guest
import HomePage from "./pages/guest/HomePage";
import ContactPage from "./pages/guest/ContactPage";
import ProfilePage from "./pages/guest/ProfilePage";
import ProfileDetailsPage from "./pages/guest/ProfileDetailsPage";
import LoginPage from "./pages/guest/LoginPage";
import OwnProfilePage from "./pages/guest/OwnProfilePage";
import RegisterPage from "./pages/guest/RegisterPage";
import CreateProfilePage from "./pages/guest/CreateProfilePage";
// Import côté admin
import DashboardPage from "./pages/admin/DashboardPage";
import AdminProfilesPage from "./pages/admin/AdminProfilesPage";
import AdminProfilesUpdatePage from "./pages/admin/AdminProfilesUpdatePage";
import AdminUsersPage from "./pages/admin/AdminUsersPage";
import AdminUsersUpdatePage from "./pages/admin/AdminUsersUpdatePage";
import AdminReviewsPage from "./pages/admin/AdminReviewsPage";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Guest */}
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/createprofil" element={<CreateProfilePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profils" element={<ProfilePage />} />
        <Route path="/profil/own/:id" element={<OwnProfilePage />} />
        <Route path="/profil/details/:id" element={<ProfileDetailsPage />} />
        <Route path="/contact" element={<ContactPage />} />

        {/* Admin */}
        <Route path="/admin" element={<DashboardPage />} />
        <Route path="/admin/profils" element={<AdminProfilesPage />} />
        <Route path="/admin/profils/update/:id" element={<AdminProfilesUpdatePage />} />
        <Route path="/admin/users" element={<AdminUsersPage />} />
        <Route path="/admin/users/update/:id" element={<AdminUsersUpdatePage />} />
        <Route path="/admin/reviews/" element={<AdminReviewsPage />} />



      </Routes>
    </BrowserRouter >
  );
}

export default App;
