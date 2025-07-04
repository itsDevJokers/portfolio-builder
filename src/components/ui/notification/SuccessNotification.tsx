/**
 * @file Provides a reusable success notification toast component.
 * @version 1.0.0
 * @since 2025-07-04
 */

"use client";

import React from "react";

/**
 * @typedef {object} SuccessNotificationProps
 * @property {string} message - The success message to display in the notification.
 * @property {boolean} show - Toggles the visibility and animation of the notification.
 */
type Props = {
  message: string;
  show: boolean;
};

/**
 * Renders the checkmark icon for the success notification.
 * @returns {JSX.Element} The rendered SVG icon.
 */
const CheckIcon = () => (
  <svg
    className="w-6 h-6 text-white"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M5 13l4 4L19 7"
    />
  </svg>
);

/**
 * A reusable toast notification component for displaying success messages.
 *
 * The component appears at the top-center of the viewport and uses CSS transitions
 * for a smooth slide-in and fade-out effect. Its visibility is controlled
 * by the `show` prop.
 *
 * @param {Props} props - The component props.
 * @returns {JSX.Element} The rendered success notification.
 */
export default function SuccessNotification({ message, show }: Props) {
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
      <div className="flex items-center space-x-4 bg-green-500 text-white px-6 py-4 rounded-lg shadow-2xl">
        <CheckIcon />
        <span className="font-semibold text-lg">{message}</span>
      </div>
    </div>
  );
}
