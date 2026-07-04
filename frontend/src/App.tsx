import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";

import OwnerDashboard from "./pages/OwnerDashboard";

import TenantDashboard from "./pages/TenantDashboard";

import OwnerInterests from "./pages/OwnerInterests";

function Register() {
  return <h1>Register</h1>;
}


export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route path="/owner" element={<OwnerDashboard />} />

      <Route path="/tenant" element={<TenantDashboard />} />

      <Route path="/owner" element={<OwnerDashboard />} />

      <Route path="/tenant" element={<TenantDashboard />} />

      <Route path="/owner/interests" element={<OwnerInterests />} />
    </Routes>
  );
}