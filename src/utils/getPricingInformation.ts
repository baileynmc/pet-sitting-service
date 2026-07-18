import type { SittingServiceOption } from '../types';

export const getPricingInformation = ({
  hoursRequested,
  animalType,
  pricingInformation,
}: {
  hoursRequested: number;
  animalType: string;
  pricingInformation: SittingServiceOption[];
}): number => {
  const selectedPetPricing = pricingInformation.find(
    (option) => option.type === animalType,
  );

  // If somehow there is a new pet type that is not in the pricing information, return 0
  if (!selectedPetPricing) {
    return 0;
  }

  // Calculate the total price based on the hours requested and the price per hour
  return (
    selectedPetPricing.basePrice +
    selectedPetPricing.surchargePerHour * hoursRequested
  );
};
