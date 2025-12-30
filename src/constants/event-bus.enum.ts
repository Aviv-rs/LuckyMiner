export const EventBusEvents = {
  TOTAL_COINS_UPDATED: "total_coins_updated",
  TOTAL_COINS_RESET: "total_coins_reset",
} as const;

export type EventBusEvents = (typeof EventBusEvents)[keyof typeof EventBusEvents];
