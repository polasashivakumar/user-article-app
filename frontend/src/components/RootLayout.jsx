// src/components/RootLayout.jsx
import Header from "./Header";
import Footer from "./Footer";
import { useEffect } from "react";
import { useAuthStore } from "../services/authService";
import { pageBackground } from "../styles/common";

const RootLayout = ({ children }) => {
  const checkAuth=useAuthStore((state)=>state.refresh);
  useEffect(()=>{
    checkAuth()
  },[])
  return (
    <div className={pageBackground}>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default RootLayout;