import React from "react";
import hero from "../assets/hero.png";
import { NavLink } from "react-router-dom"; // غيرنا Link لـ NavLink

function Header() {
  const navList = [
    { name: "home", key: "home", link: "/" },
    { name: "all doctors", key: "all-doctors", link: "/appointment" },
    { name: "about", key: "about", link: "/about" },
    { name: "contact", key: "contact", link: "/contact" },
  ];

  return (
    <header className="max-w-[1525px] border-b h-[86px] border-[#Adadad] mx-auto flex items-center justify-between">
      <div className="hero relative left-[54px]">
        <img src={hero} alt="hero" />
      </div>

      <nav className="relative left-[50px]">
        <ul className="flex items-center uppercase gap-7">
          {navList.map((item) => (
            <li key={item.key}>
              <NavLink
                to={item.link}
                className={({ isActive }) =>
                  `relative text-sm select-none transition-all duration-300 hover:text-primary pb-2
                  ${
                    isActive
                      ? "text-primary after:content-[''] after:absolute after:left-0 after:bottom-[-10px] after:w-full after:h-[1px] after:bg-primary"
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

      <div className="bg-primary text-white px-4 py-2 rounded-3xl h-[54px] w-[195px] flex items-center justify-center cursor-pointer">
        Create account
      </div>
    </header>
  );
}

export default Header;
