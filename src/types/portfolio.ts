/**
 * @file Defines the core TypeScript types and interfaces used throughout the portfolio application.
 * @version 1.0.0
 * @since 2025-07-04
 */

/**
 * Describes the shape of the user's main profile data object.
 * @interface ProfileData
 * @property {string} name - The full name of the user.
 * @property {string} title - The user's job title or professional headline.
 * @property {string} description - A short professional summary or description.
 */
export interface ProfileData {
  name: string;
  title: string;
  description: string;
}

/**
 * Describes the shape of a single work experience or portfolio item.
 * @interface PortfolioItem
 * @property {number} id - A unique identifier for the item, typically a timestamp.
 * @property {string} position - The job title for this experience.
 * @property {string} company - The name of the company.
 * @property {string} startDate - The start date of the experience, formatted as 'YYYY-MM'.
 * @property {string} endDate - The end date of the experience, formatted as 'YYYY-MM'.
 * @property {string} description - A summary of responsibilities and achievements in the role.
 */
export interface PortfolioItem {
  id: number;
  position: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
}

/**
 * Defines the structure for an object that holds form validation errors.
 * The keys are dynamically generated to match specific form fields (e.g., 'profile_name' or 'item_position_12345').
 * The values are the corresponding error message strings.
 * @typedef {object.<string, string>} FormErrors
 */
export type FormErrors = {
  [key: string]: string;
};