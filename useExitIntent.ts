
import { useEffect } from 'react';
import { useLocation } from 'wouter';

/**
 * Custom hook to detect exit intent and redirect to checkout
 * Handles:
 * - Back button navigation
 * - Browser close attempts
 * - Navigation away from the app
 */
export function useExitIntent() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    // Flag to track if we're already on checkout page
    const isCheckoutPage = window.location.pathname === '/checkout';
    if (isCheckoutPage) return;

    // Store the initial history state
    window.history.pushState(null, '', window.location.href);

    // Handle back button and history navigation
    const handlePopState = (event: PopStateEvent) => {
      event.preventDefault();
      // Redirect to checkout when user tries to go back
      setLocation('/checkout');
      // Push state again to prevent further back navigation
      window.history.pushState(null, '', window.location.href);
    };

    window.addEventListener('popstate', handlePopState);

    // Handle page unload/close attempts (beforeunload)
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      // This will show a confirmation dialog when user tries to close or navigate away
      event.preventDefault();
      event.returnValue = '';
      return '';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    // Handle mouse leaving the viewport (exit intent for desktop)
    const handleMouseLeave = (event: MouseEvent) => {
      // Check if mouse is leaving from the top of the page (typical close/back area)
      if (event.clientY <= 0) {
        setLocation('/checkout');
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);

    // Cleanup
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [setLocation]);
