/**
 * @file Renders the form fields for a single portfolio work experience item.
 * @version 1.0.0
 * @since 2025-07-04
 */

import React from "react";
import type { PortfolioItem, FormErrors } from "@/types/portfolio";
import FormField from "../ui/FormField";

/**
 * @typedef {object} PortfolioItemFormProps
 * @property {PortfolioItem} item - The portfolio item data object to display in the form.
 * @property {(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void} onChange - The callback function to handle changes in any form field.
 * @property {FormErrors} errors - An object containing validation errors, keyed by a unique field identifier.
 */
type Props = {
  item: PortfolioItem;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  errors: FormErrors;
};

/**
 * A form component for editing the details of a single portfolio experience.
 *
 * This component is composed of reusable FormField components and is responsible for
 * laying out the inputs for position, company, dates, and description. It functions as a
 * controlled component, receiving its state and event handlers from a parent.
 *
 * @param {Props} props - The component props.
 * @returns {JSX.Element} The rendered form for a single portfolio item.
 */
export default function PortfolioItemForm({ item, onChange, errors }: Props) {
  return (
    <div className="space-y-4">
      <FormField
        label="Position"
        name="position"
        value={item.position}
        onChange={onChange}
        placeholder="Position Name"
        // Dynamically retrieves the error message for this specific item's position field.
        error={errors[`item_position_${item.id}`]}
      />
      <FormField
        label="Company"
        name="company"
        value={item.company}
        onChange={onChange}
        placeholder="Company Name"
        error={errors[`item_company_${item.id}`]}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField
          label="Start Date"
          name="startDate"
          value={item.startDate}
          onChange={onChange}
          type="month"
          error={errors[`item_startDate_${item.id}`]}
        />
        <FormField
          label="End Date"
          name="endDate"
          value={item.endDate}
          onChange={onChange}
          type="month"
          error={errors[`item_endDate_${item.id}`]}
        />
      </div>
      <FormField
        as="textarea"
        label="Description"
        name="description"
        value={item.description}
        onChange={onChange}
        placeholder="Job description and achievements..."
        error={errors[`item_description_${item.id}`]}
      />
    </div>
  );
}
