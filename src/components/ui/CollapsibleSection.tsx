/**
 * @file Provides a reusable collapsible (accordion) section component.
 * @version 1.0.0
 * @since 2025-07-04
 */

"use client";

import React, { useState } from "react";

/**
 * @typedef {object} CollapsibleSectionProps
 * @property {string} title - The title displayed in the section header.
 * @property {React.ReactNode} children - The content to be displayed inside the collapsible area.
 * @property {boolean} [startOpen=true] - Optional. Determines if the section should be open by default.
 * @property {() => void} [onRemove] - Optional. If provided, a remove button is displayed, and this function is called on click.
 */
type Props = {
  title: string;
  children: React.ReactNode;
  startOpen?: boolean;
  onRemove?: () => void;
};

/**
 * A reusable UI component that creates a section with a header that can be
 * clicked to expand or collapse its content.
 *
 * This component manages its own `isOpen` state. It can optionally display
 * a remove button if an `onRemove` handler is provided.
 *
 * @param {Props} props - The component props.
 * @returns {JSX.Element} The rendered collapsible section.
 */
export default function CollapsibleSection({
  title,
  children,
  startOpen = true,
  onRemove,
}: Props) {
  // Manages the open/closed state of the section.
  const [isOpen, setIsOpen] = useState(startOpen);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex justify-between items-center section-header">
        <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
        <div className="flex items-center space-x-2">
          {/* Conditionally render the remove button only if onRemove prop is passed. */}
          {onRemove && (
            <button
              onClick={onRemove}
              className="text-red-500 hover:text-red-700 transition-colors p-1"
              aria-label="Remove section"
            >
              <TrashIcon />
            </button>
          )}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-500 hover:text-gray-700 transition-colors p-1"
            aria-expanded={isOpen}
          >
            <ChevronDownIcon
              className={`transition-transform duration-300 ${
                !isOpen ? "-rotate-180" : ""
              }`}
            />
          </button>
        </div>
      </div>
      <div className={`collapse-transition ${isOpen ? "open" : ""}`}>
        <div className="collapse-content">{children}</div>
      </div>
    </div>
  );
}

/**
 * Renders the chevron (arrow) icon used for the collapse/expand toggle.
 * @param {{className?: string}} props - Component props for styling.
 * @returns {JSX.Element} The rendered SVG icon.
 */
const ChevronDownIcon = ({ className = "" }: { className?: string }) => (
  <svg
    className={`w-6 h-6 ${className}`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M19 9l-7 7-7-7"
    />
  </svg>
);

/**
 * Renders the trash can icon used for the remove button.
 * @returns {JSX.Element} The rendered SVG icon.
 */
const TrashIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
    />
  </svg>
);
