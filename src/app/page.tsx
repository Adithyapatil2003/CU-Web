import React from "react";
import Home from "./_components/layouts/HomePage/HeroPage";
import DigitalProfile from "./_components/layouts/HomePage/DigitalProfile";
import ProductsSection from "./_components/layouts/HomePage/Products";
import TapAndRedirectSection from "./_components/layouts/HomePage/TapAndRedirectSection";

const page = () => {
  return (
    <>
      <Home />
      <DigitalProfile />
      <ProductsSection />
      <TapAndRedirectSection/>
    </>
  );
};

export default page;
