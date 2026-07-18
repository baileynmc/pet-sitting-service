import { getPricingInformation } from './getPricingInformation';
import { type SittingServiceOption } from '../types';

describe('getPricingInformation', () => {
  const mockPricingInformation: SittingServiceOption[] = [
    { type: 'dog', basePrice: 20, surchargePerHour: 5 },
    { type: 'cat', basePrice: 15, surchargePerHour: 3 },
    { type: 'pig', basePrice: 30, surchargePerHour: 8 },
  ];

  it('calculates the correct price for a dog', () => {
    const result = getPricingInformation({
      hoursRequested: 3,
      animalType: 'dog',
      pricingInformation: mockPricingInformation,
    });

    // 20 + (5 * 3) = 35
    expect(result).toBe(35);
  });

  it('calculates the correct price for a cat', () => {
    const result = getPricingInformation({
      hoursRequested: 4,
      animalType: 'cat',
      pricingInformation: mockPricingInformation,
    });

    // 15 + (3 * 4) = 27
    expect(result).toBe(27);
  });

  it('calculates the correct price for a pig', () => {
    const result = getPricingInformation({
      hoursRequested: 2,
      animalType: 'pig',
      pricingInformation: mockPricingInformation,
    });

    // 30 + (8 * 2) = 46
    expect(result).toBe(46);
  });

  it('returns just the base price when hoursRequested is 0', () => {
    const result = getPricingInformation({
      hoursRequested: 0,
      animalType: 'dog',
      pricingInformation: mockPricingInformation,
    });

    expect(result).toBe(20);
  });

  it('returns 0 when the animal type is not found in pricingInformation', () => {
    const result = getPricingInformation({
      hoursRequested: 5,
      animalType: 'bird', // not in mockPricingInformation
      pricingInformation: mockPricingInformation,
    });

    expect(result).toBe(0);
  });

  it('returns 0 when pricingInformation is empty', () => {
    const result = getPricingInformation({
      hoursRequested: 5,
      animalType: 'dog',
      pricingInformation: [],
    });

    expect(result).toBe(0);
  });

  it('handles decimal hoursRequested correctly', () => {
    const result = getPricingInformation({
      hoursRequested: 2.5,
      animalType: 'dog',
      pricingInformation: mockPricingInformation,
    });

    // 20 + (5 * 2.5) = 32.5
    expect(result).toBe(32.5);
  });

  it('handles negative hoursRequested (edge case)', () => {
    const result = getPricingInformation({
      hoursRequested: -2,
      animalType: 'dog',
      pricingInformation: mockPricingInformation,
    });

    // 20 + (5 * -2) = 10
    expect(result).toBe(10);
  });

  it('picks the correct option when multiple entries exist for different types', () => {
    const mixedPricing: SittingServiceOption[] = [
      { type: 'cat', basePrice: 10, surchargePerHour: 2 },
      { type: 'dog', basePrice: 25, surchargePerHour: 6 },
    ];

    const result = getPricingInformation({
      hoursRequested: 1,
      animalType: 'dog',
      pricingInformation: mixedPricing,
    });

    // 25 + (6 * 1) = 31
    expect(result).toBe(31);
  });

  it('returns 0 when animalType is an empty string', () => {
    const result = getPricingInformation({
      hoursRequested: 5,
      animalType: '',
      pricingInformation: mockPricingInformation,
    });

    expect(result).toBe(0);
  });
});
