/**
 * @file Defines the global state management store for the portfolio application using Zustand.
 * @version 1.0.0
 * @since 2025-07-04
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { PortfolioItem, ProfileData } from '@/types/portfolio';

/**
 * @typedef {object} PortfolioState
 * @description Defines the structure of the global portfolio state.
 * @property {ProfileData} profile - The user's main profile data.
 * @property {PortfolioItem[]} portfolios - An array of the user's work experiences.
 * @property {{background: string | null, profile: string | null}} images - Object containing Base64 encoded strings for saved images.
 * @property {(data: Partial<PortfolioState>) => void} setPortfolioData - The action to update the portfolio state.
 */
type PortfolioState = {
  profile: ProfileData;
  portfolios: PortfolioItem[];
  images: {
    background: string | null;
    profile: string | null;
  };
  setPortfolioData: (data: Partial<PortfolioState>) => void;
};

/**
 * Defines the initial placeholder data for the store.
 * This data is used when a user first visits the site before they have saved their own portfolio.
 * @const
 */
const placeholderData = {
  profile: {
    name: 'John Doe',
    title: 'Senior Frontend Developer',
    description: 'This is placeholder data. Edit the portfolio to add your own professional summary here. Talk about your passion for creating beautiful, user-friendly web applications.',
  },
  portfolios: [
    {
      id: 1,
      position: 'Example Position',
      company: 'Tech Company',
      startDate: '2023-01',
      endDate: '2025-01',
      description: 'This is a sample portfolio entry. Describe your responsibilities, achievements, and the technologies you used.',
    },
  ],
  images: {
    background: null,
    profile: null,
  },
};

/**
 * The main Zustand store hook for the portfolio application.
 *
 * This hook provides access to the global state (profile, portfolios, images) and actions
 * to modify it. It uses the `persist` middleware to automatically save the state to
 * `localStorage`, ensuring data is not lost between sessions.
 *
 * @example
 * const { profile, setPortfolioData } = usePortfolioStore();
 */
export const usePortfolioStore = create<PortfolioState>()(
  // The persist middleware wraps the store definition.
  persist(
    // The `set` function is used to update the store's state.
    (set) => ({
      // The store is initialized with the placeholder data.
      // On subsequent visits, this will be overwritten by data from localStorage.
      ...placeholderData,

      // Defines an "action" to update the store. It merges the new data with the existing state.
      setPortfolioData: (data) => set((state) => ({ ...state, ...data })),
    }),
    {
      // Configuration for the persistence middleware.
      name: 'portfolio-storage', // The key used in localStorage.
      storage: createJSONStorage(() => localStorage), // Specifies localStorage as the storage medium.
    }
  )
);