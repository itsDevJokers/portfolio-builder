/**
 * @file A feature-rich file upload component with drag-and-drop, previews, and validation.
 * @version 1.1.0
 * @since 2025-07-04
 */

"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import { AttachmentIcon } from "./Icons";
import ErrorNotification from "./notification/ErrorNotification";

/**
 * @typedef {object} FileUploadBoxProps
 * @property {'background' | 'profile'} id - A unique identifier for the upload box instance.
 * @property {(id: 'background' | 'profile', file: File | null) => void} onFileChange - Callback function triggered when a file is selected or removed.
 * @property {string | null} [initialImageUrl] - Optional URL of a pre-existing image to display on load.
 * @property {boolean} [isAvatar] - Optional flag to apply circular styling for avatar images.
 */
type Props = {
  id: "background" | "profile";
  onFileChange: (id: "background" | "profile", file: File | null) => void;
  initialImageUrl?: string | null;
  isAvatar?: boolean;
};

/**
 * A reusable component for uploading images.
 *
 * It supports drag-and-drop, Browse files, showing image previews,
 * and removing selected images. It also performs client-side validation for
 * file size and type, displaying a custom error notification on failure.
 *
 * @param {Props} props - The component props.
 * @returns {JSX.Element} The rendered file upload component.
 */
export default function FileUploadBox({
  id,
  onFileChange,
  initialImageUrl,
  isAvatar = false,
}: Props) {
  // --- Component State ---
  // Tracks if a file is being dragged over the component.
  const [isDragging, setIsDragging] = useState(false);
  // Holds the URL for the image preview (can be a blob URL or an initial URL prop).
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    initialImageUrl || null
  );
  // Manages the state of the custom error notification.
  const [error, setError] = useState<{ show: boolean; message: string }>({
    show: false,
    message: "",
  });
  // A ref to the hidden file input element.
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Ensures the preview updates if the initial image URL prop changes.
  useEffect(() => {
    setPreviewUrl(initialImageUrl || null);
  }, [initialImageUrl]);

  /**
   * Displays an error notification for a short duration.
   * @param {string} message - The error message to display.
   */
  const triggerError = (message: string) => {
    setError({ show: true, message });
    setTimeout(() => {
      setError({ show: false, message: "" });
    }, 3000); // Hides the notification after 3 seconds.
  };

  /**
   * Validates a selected file and updates the component's state.
   * Memoized with useCallback for performance optimization.
   * @param {File} selectedFile - The file selected by the user.
   */
  const handleFile = useCallback(
    (selectedFile: File) => {
      if (selectedFile.size > 3 * 1024 * 1024) {
        // 3MB limit
        triggerError("File size must be less than 3MB.");
        return;
      }
      const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
      if (!allowedTypes.includes(selectedFile.type)) {
        triggerError("Invalid file type. Please use PNG, JPG, or JPEG.");
        return;
      }
      setPreviewUrl(URL.createObjectURL(selectedFile));
      onFileChange(id, selectedFile);
    },
    [id, onFileChange]
  );

  /**
   * Clears the current image preview and file selection.
   */
  const removeImage = () => {
    // Revoke blob URL to free up memory.
    if (previewUrl && previewUrl.startsWith("blob:")) {
      URL.revokeObjectURL(previewUrl);
    }

    setPreviewUrl(null);
    onFileChange(id, null); // Notify parent component of removal.
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // --- Event Handlers ---
  const handleDragOver = (e: React.DragEvent) => e.preventDefault();
  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files?.[0]) handleFile(e.dataTransfer.files[0]);
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) handleFile(e.target.files[0]);
  };

  return (
    <>
      <ErrorNotification show={error.show} message={error.message} />

      {previewUrl ? (
        // Renders the image preview UI.
        <div className={`relative ${isAvatar ? "flex justify-center" : ""}`}>
          <div
            className={`group relative ${
              isAvatar ? "w-32 h-32" : "w-full h-48"
            }`}
          >
            <Image
              src={previewUrl}
              alt={`${id} preview`}
              layout="fill"
              className={`${
                isAvatar ? "rounded-full" : "rounded-lg"
              } object-cover border-2 border-gray-200`}
            />
            <div
              className={`absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity ${
                isAvatar ? "rounded-full" : "rounded-lg"
              }`}
            >
              <div
                className={`flex ${
                  isAvatar ? "flex-col space-y-2" : "space-x-2"
                }`}
              >
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-white text-gray-800 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors text-sm"
                >
                  Change
                </button>
                <button
                  type="button"
                  onClick={removeImage}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors text-sm"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
          <input
            type="file"
            id={`${id}-file`}
            ref={fileInputRef}
            accept=".png,.jpg,.jpeg"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
      ) : (
        // Renders the drag-and-drop upload box UI.
        <div
          className={`upload-box bg-gray-50 rounded-lg p-8 text-center ${
            isDragging ? "dragover" : ""
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
        >
          <AttachmentIcon />
          <p className="text-lg text-gray-600 mb-2">
            Drag & drop, or{" "}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Browse
            </button>
          </p>
          <p className="text-sm text-gray-500">
            Supports: PNG, JPG, JPEG. Max 3MB.
          </p>
          <input
            type="file"
            id={`${id}-file`}
            ref={fileInputRef}
            accept=".png,.jpg,.jpeg"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
      )}
    </>
  );
}
