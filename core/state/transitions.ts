import { BookingState } from "./bookingStates";

export const BookingTransitions: Record<BookingState, BookingState[]> = {
    AVAILABLE :["HELD"],
    HELD : ["CONFIRMED","EXPIRED"],
    CONFIRMED: ["CANCELLED"],
    CANCELLED: [],
    EXPIRED: [],
}