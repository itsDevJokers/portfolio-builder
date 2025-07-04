/**
 * @file Provides the sticky header navigation for the portfolio edit page.
 * @version 1.0.0
 * @since 2025-07-04
 */

"use client";

import React from "react";
import Link from "next/link";

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
 * Renders the header for the portfolio editor.
 *
 * This is a presentational component that receives all its state and event handlers
 * as props from a parent component. It provides the user with primary actions like
 * previewing and saving their work.
 *
 * @param {Props} props - The component props.
 * @returns {JSX.Element} The rendered header component.
 */
export default function EditHeader({
  onSave,
  onPreview,
  isSaveDisabled,
  isSaving,
}: Props) {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-xl font-bold text-gray-900">
            Portfolio Builder
          </Link>
          <div className="flex items-center space-x-4">
            <button
              onClick={onPreview}
              // Disable the preview button during the save operation to prevent conflicts.
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
              {isSaving ? (
                // Loading spinner shown when isSaving is true.
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
