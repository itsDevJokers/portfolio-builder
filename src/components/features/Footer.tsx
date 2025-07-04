/**
 * @file Renders the shared footer component for the application.
 * @version 1.0.0
 * @since 2025-07-04
 */

"use client";

import React from "react";

/**
 * A simple, presentational footer component.
 *
 * Displays the copyright notice and credits for the application. It is used
 * across different pages to provide a consistent page bottom.
 *
 * @returns {JSX.Element} The rendered footer component.
 */
const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="mb-4 sm:mb-0">
            <p className="text-gray-600">
              © 2025 Portfolio Builder. Built with passion.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
