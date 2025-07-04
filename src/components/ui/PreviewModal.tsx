/**
 * @file Provides a full-screen modal for previewing the portfolio.
 * @version 1.0.0
 * @since 2025-07-04
 */

"use client";

import React, { useEffect } from "react";
import ProfileSection from "@/components/features/ProfileSection";
import PortfolioSection from "@/components/features/PortfolioSection";
import Footer from "@/components/features/Footer";
import type { PortfolioItem, ProfileData } from "@/types/portfolio";

/**
 * @typedef {object} PreviewData
 * @description The shape of the data required to render the portfolio preview.
 * @property {ProfileData} profile - The user's main profile information.
 * @property {PortfolioItem[]} portfolios - An array of the user's work experiences.
 * @property {{background: string | null, profile: string | null}} images - Object containing URLs for the background and profile images.
 */
type PreviewData = {
  profile: ProfileData;
  portfolios: PortfolioItem[];
  images: {
    background: string | null;
    profile: string | null;
  };
};

/**
 * @typedef {object} PreviewModalProps
 * @property {PreviewData | null} data - The complete data for the portfolio preview. If null, the modal does not render.
 * @property {() => void} onClose - Callback function to close the modal.
 */
type Props = {
  data: PreviewData | null;
  onClose: () => void;
};

/**
 * A full-screen modal component that displays a live preview of the portfolio.
 *
 * This component overlays the entire viewport to show how the final portfolio will look,
 * using the current draft data passed in via props. It includes a close button and
 * can also be closed by pressing the 'Escape' key.
 *
 * @param {Props} props - The component props.
 * @returns {JSX.Element | null} The rendered modal, or null if no data is provided.
 */
export default function PreviewModal({ data, onClose }: Props) {
  // Effect to add and clean up an event listener for the 'Escape' key to close the modal.
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  // Do not render the component if there is no data to display.
  if (!data) return null;

  return (
    <div className="fixed inset-0 z-50 bg-gray-50 overflow-y-auto">
      <div className="relative">
        <button
          onClick={onClose}
          className="fixed top-4 right-4 z-50 bg-white text-gray-800 px-4 py-2 rounded-lg font-bold shadow-lg hover:bg-gray-100 transition-colors"
          aria-label="Close preview"
        >
          Close Preview (Esc)
        </button>

        {/* A dedicated header for the preview mode. */}
        <nav className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <h1 className="text-xl font-bold text-gray-900">
                Portfolio Preview
              </h1>
            </div>
          </div>
        </nav>

        <main>
          <ProfileSection
            profile={data.profile}
            backgroundImageUrl={data.images.background}
            profileImageUrl={data.images.profile}
          />
          <PortfolioSection portfolios={data.portfolios} />
        </main>

        <Footer />
      </div>
    </div>
  );
}
