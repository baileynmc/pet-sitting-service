/**
 * This will be mocked in the project, but is an example of an external API that would
 * return a list of available pets and the price associated with sitting them.
 */
export interface SittingServiceOption {
  type: 'dog' | 'cat' | 'pig';
  basePrice: number;
  surchargePerHour: number;
}

/**
 * This is the locally stored booking entry that draws on the "API" interface for animal type.
 */
export interface BookingEntry {
  firstName: string;
  lastName: string;
  animalName: string;
  animalType: 'dog' | 'cat' | 'pig';
  hoursRequested: number;
  dateOfService: string;
}

export interface ActiveBookingEntry extends BookingEntry {
  price: number;
}
