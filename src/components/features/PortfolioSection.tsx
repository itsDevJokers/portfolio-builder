/**
 * @file Renders the portfolio/work experience section of the public page.
 * @version 1.0.0
 * @since 2025-07-04
 */

"use client";

import React from "react";
import PortfolioCard from "@/components/ui/PortfolioCard";
import useScrollAnimation from "@/hooks/useScrollAnimation";
import type { PortfolioItem } from "@/types/portfolio";

/**
 * @typedef {object} PortfolioSectionProps
 * @property {PortfolioItem[]} portfolios - An array of portfolio experience objects to be displayed.
 */
type Props = {
  portfolios: PortfolioItem[];
};

/**
 * Displays the list of portfolio or work experience items.
 *
 * This component receives an array of portfolio items and renders them as a list of
 * individual `PortfolioCard` components. It also applies a scroll-triggered animation
 * and displays a placeholder message if the portfolio list is empty.
 *
 * @param {Props} props - The component props.
 * @returns {JSX.Element} The rendered portfolio section.
 */
export default function PortfolioSection({ portfolios }: Props) {
  // This custom hook finds all elements with the '.portfolio-card' class
  // and applies a fade-in animation as they scroll into view.
  useScrollAnimation(".portfolio-card");

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Portfolio</h2>
        <div className="section-divider"></div>
      </div>
      <div className="space-y-6">
        {portfolios && portfolios.length > 0 ? (
          // Map over the portfolio items passed in via props
          portfolios.map((item) => (
            <PortfolioCard
              key={item.id}
              title={item.position}
              company={item.company}
              // Formats the 'YYYY-MM' date strings into a more readable 'Month YYYY' format.
              period={`${new Date(item.startDate).toLocaleString("default", {
                month: "short",
                year: "numeric",
              })} - ${new Date(item.endDate).toLocaleString("default", {
                month: "short",
                year: "numeric",
              })}`}
              description={item.description}
            />
          ))
        ) : (
          // Show a placeholder message if no portfolio items exist
          <div className="text-center text-gray-500 bg-white p-8 rounded-lg shadow-sm border">
            <p>No portfolio experiences have been added yet.</p>
            <p className="text-sm mt-2">
              Go to the edit page to add your work history.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
