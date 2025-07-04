/**
 * @file Renders the main profile section for the public portfolio page.
 * @version 1.0.0
 * @since 2025-07-04
 */

import React from "react";
import Image from "next/image";
import type { ProfileData } from "@/types/portfolio";

/**
 * @typedef {object} ProfileSectionProps
 * @property {ProfileData} profile - The user's profile data object (name, title, description).
 * @property {string | null} backgroundImageUrl - The URL for the cover background image.
 * @property {string | null} profileImageUrl - The URL for the user's avatar/profile image.
 */
type Props = {
  profile: ProfileData;
  backgroundImageUrl: string | null;
  profileImageUrl: string | null;
};

/**
 * A default SVG placeholder for the avatar image.
 * Used when no profile image URL is provided.
 * @const
 */
const placeholderAvatar =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Ccircle cx='100' cy='100' r='100' fill='%23e5e7eb'/%3E%3Ccircle cx='100' cy='80' r='35' fill='%239ca3af'/%3E%3Cpath d='M100 130c-25 0-45 15-45 35v35h90v-35c0-20-20-35-45-35z' fill='%239ca3af'/%3E%3C/svg%3E";

/**
 * Displays the main hero section of the portfolio, including the cover image,
 * avatar, name, title, and professional summary.
 *
 * This is a presentational component that receives all necessary data as props.
 * It includes fallback UI for when images or text data are not available.
 *
 * @param {Props} props - The component props.
 * @returns {JSX.Element} The rendered profile section.
 */
export default function ProfileSection({
  profile,
  backgroundImageUrl,
  profileImageUrl,
}: Props) {
  return (
    <>
      {/* Cover Background Section */}
      <div className="relative h-80 sm:h-96 cover-gradient ">
        {/* Conditionally render the background image or a default gradient */}
        {backgroundImageUrl ? (
          <Image
            src={backgroundImageUrl}
            alt="Cover background"
            layout="fill"
            className="object-cover"
            priority // Preload the largest image on the page
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 opacity-90"></div>
        )}

        {/* Avatar positioned at the bottom center of the cover */}
        <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-16">
          <div className="w-32 h-32 rounded-full avatar-border bg-white overflow-hidden">
            <Image
              src={profileImageUrl || placeholderAvatar}
              alt="Profile Avatar"
              width={128}
              height={128}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Profile Information Section */}
      <div className="pt-20 pb-12 text-center px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-3">
            {/* Fallback to placeholder text if data is empty */}
            {profile.name || "Your Name"}
          </h1>
          <h2 className="text-xl sm:text-2xl text-blue-600 font-semibold mb-6">
            {profile.title || "Your Title"}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {profile.description || "Your professional description goes here."}
          </p>
        </div>
      </div>
    </>
  );
}
