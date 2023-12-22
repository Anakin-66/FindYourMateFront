import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/guest/HomePage";
import ContactPage from "./pages/guest/ContactPage";
import ProfilePage from "./pages/guest/ProfilePage";
import ProfileDetailsPage from "./pages/guest/ProfileDetailsPage";
import LoginPage from "./pages/guest/LoginPage";
import OwnProfilePage from "./pages/guest/OwnProfilePage";
import RegisterPage from "./pages/guest/RegisterPage";
import CreateProfilePage from "./pages/guest/CreateProfilePage";

import DashboardPage from "./pages/admin/DashboardPage";

import AdminProfileCreate from "./pages/admin/AdminProfile/AdminProfileCreate";
import AdminProfileUpdate from "./pages/admin/AdminProfile/AdminProfileUpdate";
import AdminProfileDelete from "./pages/admin/AdminProfile/AdminProfileDelete";

import AdminUserCreate from "./pages/admin/AdminUser/AdminUserCreate";
import AdminUserUpdate from "./pages/admin/AdminUser/AdminUserUpdate";
import AdminUserDelete from "./pages/admin/AdminUser/AdminUserDelete";

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

        <Route path="/admin/profils/create" element={<AdminProfileCreate />} />
        <Route path="/admin/profils/update" element={<AdminProfileUpdate />} />
        <Route path="/admin/profils/delete" element={<AdminProfileDelete />} />

        <Route path="/admin/users/create" element={<AdminUserCreate />} />
        <Route path="/admin/users/update" element={<AdminUserUpdate/>} />
        <Route path="/admin/users/delete" element={<AdminUserDelete />} />

      </Routes>
    </BrowserRouter >
  );
}

export default App;
