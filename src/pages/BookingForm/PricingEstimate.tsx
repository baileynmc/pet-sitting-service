import type { SittingServiceOption } from '../../types';
import { getPricingInformation } from '../../utils/getPricingInformation';
import styled from 'styled-components';

const PricingText = styled.p`
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--font-color);
`;
export const PricingEstimate = ({
  hoursRequested,
  animalType,
  pricingInformation,
  isLoading,
}: {
  hoursRequested: number;
  animalType: string;
  pricingInformation: SittingServiceOption[];
  isLoading: boolean;
}) => {
  const price = getPricingInformation({
    hoursRequested,
    animalType,
    pricingInformation,
  });
  if (isLoading) {
    return <p>Loading...</p>;
  }
  return <PricingText>Total Price: ${price}</PricingText>;
};
