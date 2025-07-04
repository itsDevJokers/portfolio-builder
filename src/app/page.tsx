/**
 * @file Renders the main public-facing portfolio homepage.
 * @version 1.0.0
 * @since 2025-07-04
 */

"use client";

import React from "react";
import Header from "@/components/features/Header";
import ProfileSection from "@/components/features/ProfileSection";
import PortfolioSection from "@/components/features/PortfolioSection";
import Footer from "@/components/features/Footer";
import { usePortfolioStore } from "@/context/portfolioStore";

/**
 * The main homepage of the portfolio application.
 *
 * This component acts as the primary layout for the public portfolio view. It fetches
 * the portfolio data from the global Zustand store and passes it down to its child
 * presentational components. It displays either the user's saved data or the
 * initial placeholder data if no portfolio has been saved yet.
 *
 * @returns {JSX.Element} The rendered homepage component.
 */
export default function HomePage() {
  // Connect to the Zustand store to get the live portfolio data.
  const { profile, portfolios, images } = usePortfolioStore();

  return (
    <>
      <Header />
      <main>
        <ProfileSection
          profile={profile}
          backgroundImageUrl={images.background}
          profileImageUrl={images.profile}
        />
        <PortfolioSection portfolios={portfolios} />
      </main>
      <Footer />
    </>
  );
}
