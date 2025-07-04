/**
 * @file Provides a custom React hook for triggering animations on scroll.
 * @version 1.0.0
 * @since 2025-07-04
 */

'use client';

import { useEffect, useRef } from 'react';

/**
 * A custom React hook that applies a CSS class to elements when they scroll into view.
 *
 * This hook uses the IntersectionObserver API to efficiently watch for elements
 * matching the provided CSS selector. When a target element enters the viewport,
 * the 'is-visible' class is added to it, which can be used to trigger
 * CSS animations or transitions. The animation only triggers once per element.
 *
 * @param {string} selector - The CSS selector for the target elements to observe.
 * @example
 * // In your component:
 * useScrollAnimation('.my-animated-card');
 *
 * // In your CSS:
 * .my-animated-card {
 * opacity: 0;
 * transform: translateY(20px);
 * transition: opacity 0.5s, transform 0.5s;
 * }
 * .my-animated-card.is-visible {
 * opacity: 1;
 * transform: translateY(0);
 * }
 */
const useScrollAnimation = (selector: string) => {
  // Use a ref to hold the observer instance so it persists across re-renders.
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Configuration for the IntersectionObserver.
    const observerOptions = {
      threshold: 0.1, // Trigger when 10% of the element is visible.
      rootMargin: '0px 0px -50px 0px', // Trigger animation a little sooner.
    };

    // Create the observer with a callback function.
    observer.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        // If the element is intersecting (visible), add the class.
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, observerOptions);

    // Find all elements matching the selector and start observing them.
    const elements = document.querySelectorAll(selector);
    elements.forEach((el) => {
      if (observer.current) {
        observer.current.observe(el);
      }
    });

    // Cleanup function: unobserve all elements when the component unmounts.
    return () => {
      elements.forEach((el) => {
        if (observer.current) {
          observer.current.unobserve(el);
        }
      });
    };
  }, [selector]); // Re-run the effect if the selector changes.
};

export default useScrollAnimation;