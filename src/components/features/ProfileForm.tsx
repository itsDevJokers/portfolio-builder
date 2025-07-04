/**
 * @file Renders the form fields for the main user profile section.
 * @version 1.0.0
 * @since 2025-07-04
 */

import React from "react";
import type { ProfileData, FormErrors } from "@/types/portfolio";
import FormField from "../ui/FormField";

/**
 * @typedef {object} ProfileFormProps
 * @property {ProfileData} data - The user's profile data (name, title, description).
 * @property {(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void} onChange - The callback function to handle changes in any form field.
 * @property {FormErrors} errors - An object containing validation errors for the profile fields.
 */
type Props = {
  data: ProfileData;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  errors: FormErrors;
};

/**
 * A form component for editing the user's main profile information.
 *
 * This component renders the input fields for the user's name, title/position, and
 * a descriptive summary. It is a controlled component that relies on a parent
 * to manage its state and handle updates.
 *
 * @param {Props} props - The component props.
 * @returns {JSX.Element} The rendered profile form section.
 */
export default function ProfileForm({ data, onChange, errors }: Props) {
  return (
    <div className="space-y-4">
      <FormField
        label="Name"
        name="name"
        value={data.name}
        onChange={onChange}
        placeholder="Your Name"
        error={errors.profile_name}
      />
      <FormField
        label="Title / Position"
        name="title"
        value={data.title}
        onChange={onChange}
        placeholder="e.g., Senior Frontend Developer"
        error={errors.profile_title}
      />
      <FormField
        as="textarea"
        label="Description"
        name="description"
        value={data.description}
        onChange={onChange}
        placeholder="A brief description about yourself..."
        error={errors.profile_description}
      />
    </div>
  );
}
