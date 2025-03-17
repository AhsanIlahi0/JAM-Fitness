import { BrowserRouter as Router, Routes, Route, UNSAFE_useFogOFWarDiscovery } from "react-router-dom";
import Dashboard from "../components/Dashboard/Dashboard";
import LoginPage from "../pages/Auth/LoginPage";
import SignUpPage from "../pages/Auth/SignUpPage";
import ForgotPassPage from "../pages/Auth/ForgotPassPage";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard/>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/forget-pass" element={<ForgotPassPage />} />
      </Routes>
    </Router>
  );
}
