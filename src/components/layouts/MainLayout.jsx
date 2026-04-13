import React from "react";
import Header from "../Header";
import { Outlet } from "react-router-dom";
import Footer from "../Footer";

const MainLayout = () => {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
export default MainLayout;
