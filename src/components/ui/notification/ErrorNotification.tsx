/**
 * @file Provides a reusable error notification toast component.
 * @version 1.0.0
 * @since 2025-07-04
 */

"use client";

import React from "react";

/**
 * @typedef {object} ErrorNotificationProps
 * @property {string} message - The error message to display in the notification.
 * @property {boolean} show - Toggles the visibility and animation of the notification.
 */
type Props = {
  message: string;
  show: boolean;
};

/**
 * Renders the exclamation icon for the error notification.
 * @returns {JSX.Element} The rendered SVG icon.
 */
const ExclamationIcon = () => (
  <svg
    className="w-6 h-6 text-white"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
    ></path>
  </svg>
);

/**
 * A reusable toast notification component for displaying error messages.
 *
 * The component appears at the top-center of the viewport and uses CSS transitions
 * for a smooth slide-in and fade-out effect. Its visibility is controlled
 * by the `show` prop.
 *
 * @param {Props} props - The component props.
 * @returns {JSX.Element} The rendered error notification.
 */
export default function ErrorNotification({ message, show }: Props) {
  return (
    // This container controls the position and visibility with CSS transitions.
    <div
      className={`fixed top-5 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-in-out ${
        show
          ? "opacity-100 translate-y-0"
          : "opacity-0 -translate-y-12 pointer-events-none"
      }`}
    >
      {/* This is the styled notification box itself. */}
      <div className="flex items-center space-x-4 bg-red-500 text-white px-6 py-4 rounded-lg shadow-2xl">
        <ExclamationIcon />
        <span className="font-semibold text-lg">{message}</span>
      </div>
    </div>
  );
}
