import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  const footerNavList = [
    { name: "home", key: "home", link: "/" },
    { name: "About us", key: "about-us", link: "/about" },
    { name: "contact us", key: "contact", link: "/contact" },
    { name: "Privacy Policy", key: "Privacy-Policy", link: "/" },
  ];
  const contactWay = [
    { name: "Phone", key: "phone", value: "+1-212-456-7890" },
    { name: "Email", key: "email", value: "greatstackdev@gmail.com" },
  ];
  return (
    <footer className="max-w-[1440px] mx-auto ">
      <div className="text-fs flex items-start justify-between  border-b border-[#bdbdbd] p-[62px] ">
        <p className="text-[18px] max-w-[646px] max-h-[120px] text-start mt-17.5">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </p>
        <div className="">
          <h3 className="mb-10 text-[22px] font-semibold leading-[30px] uppercase">
            company
          </h3>
          <ul className="flex flex-col gap-2 mt-4">
            {footerNavList.map((item) => (
              <li key={item.key} className="text-[18px]">
                <Link to={item.link} className="font-semibold capitalize">
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="">
          <h3 className="mb-10 text-[22px] font-semibold leading-[30px] uppercase">
            Get in touch
          </h3>
          <ul className="flex flex-col gap-2 mt-4">
            {contactWay.map((item) => (
              <li key={item.key} className="text-[18px]">
                {/* <span className="font-semibold">{item.name}: </span> */}
                {item.value}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="copyR text-[18px] text-center py-6 text-fs">
        Copyright © 2025 Graphics - All Right Reserved.
      </div>
    </footer>
  );
}

export default Footer;
