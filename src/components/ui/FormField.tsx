/**
 * @file Provides a generic, reusable form field component.
 * @version 1.0.0
 * @since 2025-07-04
 */

import React from "react";

/**
 * @typedef {object} FormFieldProps
 * @property {string} label - The text label displayed above the form field.
 * @property {string} name - The name attribute for the input/textarea element.
 * @property {string} value - The current value of the form field (for controlled components).
 * @property {(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void} onChange - The callback function to handle value changes.
 * @property {string} [error] - Optional. An error message to display below the field. If provided, the field border turns red.
 * @property {string} [placeholder] - Optional. The placeholder text for the input/textarea.
 * @property {string} [type='text'] - Optional. The type attribute for the input element (e.g., 'text', 'month').
 * @property {'input' | 'textarea'} [as='input'] - Optional. Determines whether to render an `<input>` or a `<textarea>` element.
 * @property {number} [rows=4] - Optional. The number of visible text lines for the textarea.
 */
type Props = {
  label: string;
  name: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  error?: string;
  placeholder?: string;
  type?: string;
  as?: "input" | "textarea";
  rows?: number;
};

/**
 * A generic, reusable component for creating styled form fields.
 *
 * This component abstracts the common structure of a form field, which includes
 * a label, an input element (or textarea), and an optional error message.
 * It can be configured to render as either an `<input>` or a `<textarea>`
 * and automatically applies error styling when an error message is provided.
 *
 * @param {Props} props - The component props with default values for optional props.
 * @returns {JSX.Element} The rendered form field.
 */
export default function FormField({
  label,
  name,
  value,
  onChange,
  error,
  placeholder = "",
  type = "text",
  as = "input",
  rows = 4,
}: Props) {
  // commonProps object to reduce duplication for attributes shared between input and textarea.
  const commonProps = {
    name,
    value,
    onChange,
    placeholder,
    className: `form-input w-full px-4 py-3 border rounded-lg ${
      error ? "border-red-500" : "border-gray-300"
    }`,
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label} <span className="text-red-500">*</span>
      </label>

      {/* Conditionally render a textarea or an input based on the 'as' prop. */}
      {as === "textarea" ? (
        <textarea
          {...commonProps}
          rows={rows}
          className={`${commonProps.className} resize-y`}
        />
      ) : (
        <input {...commonProps} type={type} />
      )}

      {/* Conditionally render the error message if it exists. */}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
