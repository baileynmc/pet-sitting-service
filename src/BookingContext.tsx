import { createContext, useContext } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import type { ActiveBookingEntry } from './types';

interface BookingContextType {
  activeBookings: ActiveBookingEntry[];
  setActiveBookings: Dispatch<SetStateAction<ActiveBookingEntry[]>>;
}

export const BookingContext = createContext<BookingContextType>({
  activeBookings: [],
  setActiveBookings: () => undefined,
});

export const useBookingContext = () => useContext(BookingContext);
