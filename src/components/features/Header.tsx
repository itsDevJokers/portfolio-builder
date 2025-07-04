/**
 * @file Renders the main header for the public homepage.
 * @version 1.0.0
 * @since 2025-07-04
 */

"use client";

import Link from "next/link";
import React from "react";

/**
 * The main header component for the public-facing portfolio view.
 *
 * It displays the application title and provides a primary call-to-action button
 * that navigates the user to the portfolio edit page.
 *
 * @returns {JSX.Element} The rendered header component.
 */
const Header = () => {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-gray-900">
              Portfolio Builder
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            {/* The Link component handles client-side navigation to the edit page. */}
            <Link href="/edit" passHref>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer">
                Edit Portfolio
              </button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
