import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layouts & Protection
import MainLayout from "./components/layouts/MainLayout";
import HeaderOnlyLayout from "./components/layouts/HeaderOnlyLayout";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
import Home from "./pages/Home";
import Appointment from "./pages/Appointment";
import Doctors from "./pages/Doctors";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import MyAppointments from "./pages/MyAppointments";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
        <Route element={<HeaderOnlyLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route element={<HeaderOnlyLayout />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/my-appointments" element={<MyAppointments />} />
          </Route>
        </Route>
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
