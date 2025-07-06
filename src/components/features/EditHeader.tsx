/**
 * @file Provides the sticky header navigation for the portfolio edit page.
 * @version 1.1.0
 * @since 2025-07-04
 */

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SpinnerIcon, MenuIcon, CloseIcon } from "../ui/Icons"; // Import the icons

/**
 * @typedef {object} EditHeaderProps
 * @property {() => void} onSave - Callback function to trigger when the "Save" button is clicked.
 * @property {() => void} onPreview - Callback function to trigger when the "Preview" button is clicked.
 * @property {boolean} isSaveDisabled - Determines if the save button should be disabled (e.g., due to form invalidity).
 * @property {boolean} [isSaving] - Optional flag to show a loading state on the save button.
 */
type Props = {
  onSave: () => void;
  onPreview: () => void;
  isSaveDisabled: boolean;
  isSaving?: boolean;
};

/**
 * Renders the responsive header for the portfolio editor.
 *
 * On desktop, it shows "Preview" and "Save Changes" buttons. On mobile, it shows a
 * hamburger menu icon that toggles a vertical navigation menu with the same options.
 * It is a presentational component that receives its state and handlers via props.
 *
 * @param {Props} props - The component props.
 * @returns {JSX.Element} The rendered responsive header component.
 */
export default function EditHeader({
  onSave,
  onPreview,
  isSaveDisabled,
  isSaving,
}: Props) {
  // State to manage the visibility of the mobile menu.
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Handlers that perform the action and then close the mobile menu.
  const handlePreviewClick = () => {
    onPreview();
    setIsMenuOpen(false);
  };
  const handleSaveClick = () => {
    onSave();
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-xl font-bold text-gray-900">
            Portfolio Builder
          </Link>

          {/* Desktop buttons: hidden on mobile, flex on small screens and up */}
          <div className="hidden sm:flex items-center space-x-4">
            <button
              onClick={onPreview}
              disabled={isSaving}
              className="border border-gray-300 hover:border-gray-400 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50"
            >
              Preview
            </button>
            <button
              onClick={onSave}
              disabled={isSaveDisabled || isSaving}
              className={`text-white px-4 py-2 rounded-lg font-medium transition-colors w-36 flex justify-center items-center ${
                isSaveDisabled || isSaving
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {isSaving ? <SpinnerIcon /> : "Save Changes"}
            </button>
          </div>

          {/* Mobile menu button: visible only on mobile screens */}
          <div className="sm:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown menu: shows/hides based on isMenuOpen state */}
      {isMenuOpen && (
        <div
          className="sm:hidden bg-white border-t border-gray-200"
          id="mobile-menu"
        >
          <div className="px-2 pt-2 pb-3 space-y-2">
            <button
              onClick={handlePreviewClick}
              disabled={isSaving}
              className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 disabled:opacity-50"
            >
              Preview
            </button>
            <button
              onClick={handleSaveClick}
              disabled={isSaveDisabled || isSaving}
              className={`w-full text-left block px-3 py-2 rounded-md text-base font-medium text-white ${
                isSaveDisabled || isSaving ? "bg-gray-400" : "bg-blue-600"
              }`}
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
