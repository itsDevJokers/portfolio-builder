/**
 * @file The primary page for creating and editing the user's portfolio.
 * @version 1.1.0
 * @since 2025-07-04
 */

"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import type { PortfolioItem, ProfileData, FormErrors } from "@/types/portfolio";
import EditHeader from "@/components/features/EditHeader";
import CollapsibleSection from "@/components/ui/CollapsibleSection";
import FileUploadBox from "@/components/ui/FileUploadBox";
import ProfileForm from "@/components/features/ProfileForm";
import PortfolioItemForm from "@/components/features/PortfolioItemForm";
import ValidationStatus from "@/components/ui/ValidationStatus";
import { PlusIcon } from "@/components/ui/Icons";
import { usePortfolioStore } from "@/context/portfolioStore";
import PreviewModal from "@/components/ui/PreviewModal";
import SuccessNotification from "@/components/ui/notification/SuccessNotification";
import imageCompression from "browser-image-compression";

/**
 * Converts a File object into a Base64 encoded data URL.
 * This is used for serializing images to be stored permanently.
 * @param {File} file - The file to convert.
 * @returns {Promise<string>} A promise that resolves with the data URL string.
 */
const fileToDataUrl = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

/**
 * Represents the possible states of an image field in the form.
 * - 'initial': The image is the one loaded from the store, untouched.
 * - 'new': A new file has been selected by the user.
 * - 'removed': The user has removed the image.
 * @typedef {'initial' | 'new' | 'removed'} ImageStatus
 */
type ImageStatus = "initial" | "new" | "removed";

/**
 * @typedef {object} PreviewData
 * @description The shape of the data required to render the portfolio preview.
 * @property {ProfileData} profile - The user's main profile information.
 * @property {PortfolioItem[]} portfolios - An array of the user's work experiences.
 * @property {{background: string | null, profile: string | null}} images - Object containing URLs for the background and profile images.
 */
type PreviewData = {
  profile: ProfileData;
  portfolios: PortfolioItem[];
  images: {
    background: string | null;
    profile: string | null;
  };
};

/**
 * The main "controller" component for the portfolio editing experience.
 *
 * This component manages the complete lifecycle of editing the portfolio. It initializes a local
 * "draft" state from the global Zustand store, tracks all user edits, performs real-time
 * validation, and handles the final save process. It orchestrates various UI components
 * and states, including a preview modal and success notifications.
 *
 * @returns {JSX.Element} The rendered portfolio edit page.
 */
export default function EditPortfolioPage() {
  const store = usePortfolioStore();
  const router = useRouter();

  // --- State Management ---
  // Local "draft" state for the form, initialized from the global store.
  const [profile, setProfile] = useState<ProfileData>(store.profile);
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>(
    store.portfolios
  );
  const [files, setFiles] = useState<{
    background: File | null;
    profile: File | null;
  }>({ background: null, profile: null });

  // Tracks the explicit status of images to handle validation correctly.
  const [imageStatus, setImageStatus] = useState<{
    background: ImageStatus;
    profile: ImageStatus;
  }>({
    background: store.images.background ? "initial" : "removed",
    profile: store.images.profile ? "initial" : "removed",
  });

  // Holds validation error messages for form fields.
  const [errors, setErrors] = useState<FormErrors>({});
  // A single boolean to determine if the entire form is valid and savable.
  const [isFormValid, setIsFormValid] = useState(false);
  // Controls the visibility of the preview modal.
  const [showPreview, setShowPreview] = useState(false);
  // Holds the data to be passed to the preview modal.
  const [previewData, setPreviewData] = useState<PreviewData | null>(null);
  // Controls the custom success notification.
  const [notification, setNotification] = useState({
    show: false,
    message: "",
  });
  // Tracks the loading state of the save process.
  const [isSaving, setIsSaving] = useState(false);

  // --- Form Validation Logic ---
  /**
   * Validates the entire form including text fields and image uploads.
   * Memoized with useCallback to prevent unnecessary re-renders.
   */
  const validateForm = useCallback(() => {
    const newErrors: FormErrors = {};

    if (!profile.name.trim()) newErrors.profile_name = "Name is required.";
    if (!profile.title.trim()) newErrors.profile_title = "Title is required.";
    if (!profile.description.trim())
      newErrors.profile_description = "Description is required.";

    portfolioItems.forEach((item) => {
      if (!item.position.trim())
        newErrors[`item_position_${item.id}`] = "Position is required.";
      if (!item.company.trim())
        newErrors[`item_company_${item.id}`] = "Company is required.";
      if (!item.startDate)
        newErrors[`item_startDate_${item.id}`] = "Start date is required.";
      if (!item.endDate)
        newErrors[`item_endDate_${item.id}`] = "End date is required.";
      if (!item.description.trim())
        newErrors[`item_description_${item.id}`] = "Description is required.";
    });

    setErrors(newErrors);

    const backgroundIsValid = imageStatus.background !== "removed";
    const profileIsValid = imageStatus.profile !== "removed";
    const filesValid = backgroundIsValid && profileIsValid;
    const fieldsValid = Object.keys(newErrors).length === 0;

    setIsFormValid(filesValid && fieldsValid);
  }, [profile, portfolioItems, imageStatus]);

  // Re-run validation whenever a dependency changes.
  useEffect(() => {
    validateForm();
  }, [validateForm]);

  // --- Event Handlers ---
  /**
   * Handles file selection and removal from the FileUploadBox component.
   * @param {'background' | 'profile'} id - The identifier for the image field.
   * @param {File | null} file - The selected file, or null if removed.
   */
  const handleFileChange = (
    id: "background" | "profile",
    file: File | null
  ) => {
    setFiles((prev) => ({ ...prev, [id]: file }));
    setImageStatus((prev) => ({ ...prev, [id]: file ? "new" : "removed" }));
  };

  /** Handles text changes in the main profile form. */
  const handleProfileChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  /** Handles text changes within a specific portfolio experience item. */
  const handlePortfolioChange = (
    id: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setPortfolioItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [name]: value } : item))
    );
  };

  /** Adds a new, empty portfolio experience item to the form. */
  const addPortfolioItem = () => {
    if (portfolioItems.length >= 10) {
      alert("Maximum 10 portfolio entries allowed");
      return;
    }
    setPortfolioItems((prev) => [
      ...prev,
      {
        id: Date.now(),
        position: "",
        company: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ]);
  };

  /** Removes a portfolio experience item by its ID. */
  const removePortfolioItem = (id: number) => {
    setPortfolioItems((prev) => prev.filter((item) => item.id !== id));
  };

  /**
   * Prepares data and opens the preview modal. Uses fast in-memory blob URLs for images.
   */
  const handlePreview = () => {
    const backgroundUrl =
      imageStatus.background === "new" && files.background
        ? URL.createObjectURL(files.background)
        : imageStatus.background === "initial"
        ? store.images.background
        : null;
    const profileUrl =
      imageStatus.profile === "new" && files.profile
        ? URL.createObjectURL(files.profile)
        : imageStatus.profile === "initial"
        ? store.images.profile
        : null;

    setPreviewData({
      profile,
      portfolios: portfolioItems,
      images: { background: backgroundUrl, profile: profileUrl },
    });
    setShowPreview(true);
  };

  /**
   * Handles the final save process, including image compression, updating the global store,
   * showing a success notification, and navigating to the homepage.
   */
  const saveChanges = async () => {
    if (!isFormValid) {
      alert("Please complete all required fields and upload both images.");
      return;
    }
    setIsSaving(true);
    try {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      };
      const compressedBackgroundFile = files.background
        ? await imageCompression(files.background, options)
        : null;
      const compressedProfileFile = files.profile
        ? await imageCompression(files.profile, options)
        : null;

      const backgroundToSave = compressedBackgroundFile
        ? await fileToDataUrl(compressedBackgroundFile)
        : imageStatus.background === "initial"
        ? store.images.background
        : null;
      const profileToSave = compressedProfileFile
        ? await fileToDataUrl(compressedProfileFile)
        : imageStatus.profile === "initial"
        ? store.images.profile
        : null;

      store.setPortfolioData({
        profile,
        portfolios: portfolioItems,
        images: { background: backgroundToSave, profile: profileToSave },
      });

      setNotification({ show: true, message: "Portfolio Saved!" });
      setTimeout(() => {
        setNotification({ show: false, message: "" });
        setTimeout(() => {
          router.push("/");
        }, 500);
      }, 2000);
    } catch (error) {
      console.error("Failed to save changes:", error);
      alert("Could not save changes. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <SuccessNotification
        show={notification.show}
        message={notification.message}
      />
      <EditHeader
        onSave={saveChanges}
        onPreview={handlePreview}
        isSaveDisabled={!isFormValid}
        isSaving={isSaving}
      />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          <CollapsibleSection title="Background Image">
            <FileUploadBox
              id="background"
              onFileChange={handleFileChange}
              initialImageUrl={store.images.background}
            />
          </CollapsibleSection>
          <CollapsibleSection title="Profile Image">
            <FileUploadBox
              id="profile"
              onFileChange={handleFileChange}
              initialImageUrl={store.images.profile}
              isAvatar
            />
          </CollapsibleSection>
          <CollapsibleSection title="Profile Information">
            <ProfileForm
              data={profile}
              onChange={handleProfileChange}
              errors={errors}
            />
          </CollapsibleSection>
          <div className="space-y-8">
            {portfolioItems.map((item, index) => (
              <CollapsibleSection
                key={item.id}
                title={`Portfolio Experience ${index + 1}`}
                onRemove={() => removePortfolioItem(item.id)}
              >
                <PortfolioItemForm
                  item={item}
                  onChange={(e) => handlePortfolioChange(item.id, e)}
                  errors={errors}
                />
              </CollapsibleSection>
            ))}
          </div>
          <div className="text-center">
            <button
              onClick={addPortfolioItem}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors inline-flex items-center space-x-2"
            >
              <PlusIcon />
              <span>Add Experience</span>
            </button>
          </div>
          <div className="text-center pt-8">
            <button
              onClick={saveChanges}
              disabled={!isFormValid || isSaving}
              className={`text-white px-8 py-3 rounded-lg font-medium transition-colors text-lg w-48 h-14 flex items-center justify-center mx-auto ${
                isFormValid && !isSaving
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              {isSaving ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Saving...
                </span>
              ) : (
                "Save Changes"
              )}
            </button>
            <ValidationStatus
              isFormValid={isFormValid}
              checks={{
                background: imageStatus.background !== "removed",
                profile: imageStatus.profile !== "removed",
                fields: Object.keys(errors).length === 0,
              }}
            />
          </div>
        </div>
      </main>
      {showPreview && (
        <PreviewModal
          data={previewData}
          onClose={() => setShowPreview(false)}
        />
      )}
    </>
  );
}
