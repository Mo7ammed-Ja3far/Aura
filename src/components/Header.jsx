import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/slices/authSlice";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const navList = [
    { name: "HOME", key: "home", link: "/" },
    { name: "ABOUT", key: "about", link: "/about" },
    { name: "CONTACT", key: "contact", link: "/contact" },
  ];

  // Only show "ALL DOCTORS" to Guests and Patients
  if (!user || user.role === 'Patient') {
    navList.splice(1, 0, { name: "ALL DOCTORS", key: "all-doctors", link: "/doctors" });
  }

  const handleLogout = () => {
    dispatch(logout());
    setDropdownOpen(false);
    navigate("/login");
  };

  return (
    <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-gray-200 h-[86px] flex items-center justify-between">
      {/* Logo */}
      <div 
        className="text-2xl font-bold text-indigo-900 cursor-pointer"
        onClick={() => navigate('/')}
      >
        Aura
      </div>

      {/* Navigation */}
      <nav className="hidden md:block">
        <ul className="flex items-center gap-8">
          {navList.map((item) => (
            <li key={item.key}>
              <NavLink
                to={item.link}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors hover:text-indigo-600 relative pb-1
                  ${isActive 
                    ? "text-indigo-600 after:content-[''] after:absolute after:left-0 after:-bottom-[26px] after:w-full after:h-[2px] after:bg-indigo-600" 
                    : "text-gray-600"
                  }`
                }
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Auth Section */}
      <div className="flex items-center relative">
        {token && user ? (
          <div className="relative">
            <button 
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 focus:outline-none"
            >
              <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold overflow-hidden border border-indigo-200">
                {user.name ? user.name.charAt(0).toUpperCase() : "U"}
              </div>
              <svg className={`w-4 h-4 text-gray-500 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>
            
            {/* Dropdown */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 border border-gray-100 z-50">
                <div className="px-4 py-2 border-b border-gray-100 mb-1">
                  <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
                  <p className="text-xs text-gray-500 truncate">{user.email}</p>
                </div>
                <NavLink to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50" onClick={() => setDropdownOpen(false)}>My Profile</NavLink>
                <NavLink to="/my-appointments" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50" onClick={() => setDropdownOpen(false)}>My Appointments</NavLink>
                <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">Logout</button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex gap-4">
            <button 
              onClick={() => navigate('/signup')}
              className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-2.5 rounded-full font-medium transition-colors shadow-sm"
            >
              Create account
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
