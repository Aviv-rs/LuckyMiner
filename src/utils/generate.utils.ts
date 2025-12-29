let idCounter = 0;

export const generateUniqueId = () => {
  return idCounter++;
};

/**
 * Generates a random number between min and max (inclusive)
 * @param min - The minimum number (inclusive)
 * @param max - The maximum number (inclusive)
 * @returns A random number between min and max
 */
export const generateRandomNumberInRange = (min: number, max: number) => {
  if (typeof min !== "number" || typeof max !== "number") return 0;
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
};
