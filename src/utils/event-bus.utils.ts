// src/utils/event-bus.utils.ts
import mitt from "mitt";
import type { EventBusEvents } from "../constants/event-bus.enum";

export const eventBus = mitt<Record<EventBusEvents, unknown>>();
