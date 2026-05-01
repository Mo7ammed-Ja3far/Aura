import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layouts & Protection
import MainLayout from "./components/layouts/MainLayout";
import HeaderOnlyLayout from "./components/layouts/HeaderOnlyLayout";
import { AuthGuard, GuestGuard } from "./components/RouteGuards";

// Pages
import Home from "./pages/Home";
import Doctors from "./pages/Doctors";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import MyAppointments from "./pages/MyAppointments";
import AppointmentDetails from "./pages/AppointmentDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes - Always Accessible */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Route>

        {/* Guest Routes - Only accessible when NOT logged in */}
        <Route element={<GuestGuard />}>
          <Route element={<HeaderOnlyLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Route>
        </Route>

        {/* Protected Routes - Only accessible when logged in */}
        <Route element={<AuthGuard />}>
          <Route element={<MainLayout />}>
            {/* Using MainLayout for consistency, or HeaderOnlyLayout depending on preference */}
            <Route path="/profile" element={<Profile />} />
            <Route path="/my-appointments" element={<MyAppointments />} />
            <Route path="/appointment/:id" element={<AppointmentDetails />} />
          </Route>
        </Route>

        {/* Fallback */}
        <Route path="*" element={<h1 className="text-center mt-20 text-2xl font-bold">404 Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
