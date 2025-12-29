export const startViewTransition = (callback: () => void) => {
  // Check if browser supports View Transitions API
  if (!document.startViewTransition) {
    // Fallback for unsupported browsers
    callback();
    return;
  }

  document.startViewTransition(() => {
    callback();
  });
};
