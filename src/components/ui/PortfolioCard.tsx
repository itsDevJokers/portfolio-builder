/**
 * @file Renders a single "card" for a portfolio work experience item.
 * @version 1.0.0
 * @since 2025-07-04
 */

import React from "react";

/**
 * @typedef {object} PortfolioCardProps
 * @property {string} title - The job title or position.
 * @property {string} company - The name of the company.
 * @property {string} period - The time period of the work experience (e.g., "Jan 2022 - Present").
 * @property {string} description - A description of the work and achievements.
 */
type PortfolioCardProps = {
  title: string;
  company: string;
  period: string;
  description: string;
};

/**
 * A presentational component that displays the details of a single portfolio item.
 *
 * This component is used to visually represent one work experience entry in a "card" format,
 * showing the title, company, time period, and a summary of the role.
 *
 * @param {PortfolioCardProps} props - The component props.
 * @returns {JSX.Element} The rendered portfolio card.
 */
const PortfolioCard = ({
  title,
  company,
  period,
  description,
}: PortfolioCardProps) => {
  return (
    <div className="portfolio-card bg-white rounded-xl p-6 sm:p-8 shadow-sm border border-gray-200">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4">
        <div className="mb-4 sm:mb-0">
          <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
          <p className="text-lg text-blue-600 font-semibold">{company}</p>
        </div>
        <div className="text-sm text-gray-500 font-medium bg-gray-100 px-3 py-1 rounded-full whitespace-nowrap">
          {period}
        </div>
      </div>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
};

export default PortfolioCard;
