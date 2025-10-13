import React from "react";
import HeroPage from "./_components/layouts/HomePage/HeroPage";
import DigitalProfile from "./_components/layouts/HomePage/DigitalProfile";
import ProductsSection from "./_components/layouts/HomePage/Products";
import TapAndRedirectSection from "./_components/layouts/HomePage/TapAndRedirectSection";
import TeamsSection from "./_components/layouts/HomePage/TeamsSection";
import AppSection from "./_components/layouts/HomePage/AppSection";
import TrustedBySection from "./_components/layouts/HomePage/TrustedBySection";
import AboutSection from "./_components/layouts/HomePage/AboutSection";

const page = () => {
  return (
    <>
      <HeroPage />
      <DigitalProfile />
      <ProductsSection />
      <TapAndRedirectSection />
      <TeamsSection />
      <AppSection />
      <TrustedBySection />
      <AboutSection />
    </>
  );
};

export default page;
