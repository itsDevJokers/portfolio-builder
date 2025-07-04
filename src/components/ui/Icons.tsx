/**
 * @file A centralized repository of SVG icon components used throughout the application.
 * @version 1.0.0
 * @since 2025-07-04
 */

import React from "react";

/**
 * Renders a plus (+) icon, typically used for "Add" buttons.
 * @returns {JSX.Element} The rendered SVG icon.
 */
export const PlusIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
    />
  </svg>
);

/**
 * Renders a paperclip/attachment icon, used in the file upload box.
 * @returns {JSX.Element} The rendered SVG icon.
 */
export const AttachmentIcon = () => (
  <svg
    className="w-12 h-12 text-gray-400 mx-auto mb-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
    ></path>
  </svg>
);

/**
 * Renders a checkmark inside a circle, used for indicating success or validity.
 * @returns {JSX.Element} The rendered SVG icon.
 */
export const CheckCircleIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
      clipRule="evenodd"
    ></path>
  </svg>
);

/**
 * Renders an 'X' inside a circle, used for indicating failure or invalidity.
 * @returns {JSX.Element} The rendered SVG icon.
 */
export const XCircleIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
      clipRule="evenodd"
    ></path>
  </svg>
);
