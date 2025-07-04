/**
 * @file Renders a validation status checklist for the edit page form.
 * @version 1.0.0
 * @since 2025-07-04
 */

import React from "react";
import { CheckCircleIcon, XCircleIcon } from "./Icons";

/**
 * @typedef {object} ValidationStatusProps
 * @property {boolean} isFormValid - A master flag indicating if the entire form is valid.
 * @property {object} checks - An object containing the validity status for individual checks.
 * @property {boolean} checks.background - Validity of the background image.
 * @property {boolean} checks.profile - Validity of the profile image.
 * @property {boolean} checks.fields - Validity of all required text fields.
 */
type Props = {
  isFormValid: boolean;
  checks: {
    background: boolean;
    profile: boolean;
    fields: boolean;
  };
};

/**
 * A small presentational component to display a single validation status item.
 * It shows a label with either a success or error icon and color.
 * @param {{label: string, isValid: boolean}} props - The component props.
 * @returns {JSX.Element} The rendered status item.
 */
const StatusItem = ({
  label,
  isValid,
}: {
  label: string;
  isValid: boolean;
}) => (
  <div
    className={`flex items-center space-x-1 ${
      isValid ? "text-green-500" : "text-red-500"
    }`}
  >
    {isValid ? <CheckCircleIcon /> : <XCircleIcon />}
    <span className="text-sm">{label}</span>
  </div>
);

/**
 * A UI component that provides visual feedback on the form's validation status.
 *
 * It displays a checklist of required items (images, fields) and shows whether each
 * item is valid or invalid. It also shows a general error message if the form
 * as a whole is not ready to be saved.
 *
 * @param {Props} props - The component props.
 * @returns {JSX.Element} The rendered validation status display.
 */
export default function ValidationStatus({ isFormValid, checks }: Props) {
  return (
    <div className="mt-4">
      {/* Conditionally render a summary error message if the form is invalid. */}
      {!isFormValid && (
        <p className="text-red-500 text-sm mb-2">
          Please fill all required fields and upload both images.
        </p>
      )}
      <div className="flex items-center justify-center space-x-4">
        <StatusItem label="Background Image" isValid={checks.background} />
        <StatusItem label="Profile Image" isValid={checks.profile} />
        <StatusItem label="Required Fields" isValid={checks.fields} />
      </div>
    </div>
  );
}
