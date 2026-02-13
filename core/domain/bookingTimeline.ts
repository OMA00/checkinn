import { BookingStatus } from "../state/bookingStates";

export type BookingTimelineEvent = {
  status: BookingStatus;
  at: string; // ISO Time stamp
  reason?: string;
};

export type BookingTimeline = BookingTimelineEvent[];
