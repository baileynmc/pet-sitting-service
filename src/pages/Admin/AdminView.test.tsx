import { render, screen } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { AdminView } from './AdminView';
import { useBookingContext } from '../../BookingContext';
import type { ActiveBookingEntry } from '../../types';

vi.mock('../../BookingContext');
vi.mock('../../utils/PetLabelOptions', () => ({
  PetOptions: {
    dog: { icon: 'dog-icon-marker', label: 'Dog' },
    cat: { icon: 'cat-icon-marker', label: 'Cat' },
    pig: { icon: 'pig-icon-marker', label: 'Pig' },
  },
}));

const mockedUseBookingContext = vi.mocked(useBookingContext);

function renderAdminView(activeBookings: ActiveBookingEntry[]) {
  mockedUseBookingContext.mockReturnValue({
    activeBookings,
    setActiveBookings: vi.fn(),
  });

  return render(<AdminView />);
}

const dogBooking: ActiveBookingEntry = {
  firstName: 'Jamie',
  lastName: 'Rivera',
  animalName: 'Biscuit',
  animalType: 'dog',
  hoursRequested: 3,
  dateOfService: '2026-07-25',
  price: 35,
};

const catBooking: ActiveBookingEntry = {
  firstName: 'Sam',
  lastName: 'Lee',
  animalName: 'Max',
  animalType: 'cat',
  hoursRequested: 4,
  dateOfService: '2026-07-20',
  price: 27,
};

const pigBooking: ActiveBookingEntry = {
  firstName: 'Alex',
  lastName: 'Kim',
  animalName: 'Wilbur',
  animalType: 'pig',
  hoursRequested: 2,
  dateOfService: '2026-07-22',
  price: 46,
};

describe('AdminView', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-07-20T12:00:00.000Z'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('shows the empty state when there are no active bookings', () => {
    renderAdminView([]);

    expect(screen.getByText(/no pets checked in yet/i)).toBeInTheDocument();
    expect(screen.getByText(/0 pets scheduled/i)).toBeInTheDocument();
    expect(
      screen.getByText(/0 pets being serviced today/i),
    ).toBeInTheDocument();
  });

  it('renders a card for each active booking with owner, pet, and animal type', () => {
    renderAdminView([dogBooking, catBooking, pigBooking]);

    expect(screen.getByText('Biscuit')).toBeInTheDocument();
    expect(screen.getByText('Jamie Rivera')).toBeInTheDocument();
    expect(screen.getByText(/dog-icon-marker/)).toBeInTheDocument();

    expect(screen.getByText('Max')).toBeInTheDocument();
    expect(screen.getByText('Sam Lee')).toBeInTheDocument();
    expect(screen.getByText(/cat-icon-marker/)).toBeInTheDocument();

    expect(screen.getByText('Wilbur')).toBeInTheDocument();
    expect(screen.getByText('Alex Kim')).toBeInTheDocument();
    expect(screen.getByText(/pig-icon-marker/)).toBeInTheDocument();
  });

  it('sorts bookings by dateOfService ascending regardless of input order', () => {
    // Input order is deliberately scrambled relative to date order.
    renderAdminView([dogBooking, pigBooking, catBooking]);

    const petNames = screen
      .getAllByRole('heading', { level: 2 })
      .map((el) => el.textContent);

    // catBooking (07-20) < pigBooking (07-22) < dogBooking (07-25)
    expect(petNames).toEqual(['Max', 'Wilbur', 'Biscuit']);
  });

  it('formats each booking price as US currency', () => {
    renderAdminView([catBooking]);

    expect(screen.getByText('$27.00')).toBeInTheDocument();
  });

  it('displays each booking date formatted as weekday, month, and day', () => {
    renderAdminView([catBooking]);

    // 2026-07-20 is a Monday
    expect(screen.getByText('Mon, Jul 20')).toBeInTheDocument();
  });

  it('uses singular "pet" wording when exactly one booking is scheduled', () => {
    renderAdminView([catBooking]);

    expect(screen.getByText(/1 pet scheduled/i)).toBeInTheDocument();
  });

  it('uses plural "pets" wording when more than one booking is scheduled', () => {
    renderAdminView([dogBooking, catBooking]);

    expect(screen.getByText(/2 pets scheduled/i)).toBeInTheDocument();
  });

  it('counts only bookings scheduled for today in the "being serviced today" total', () => {
    // System time is pinned to 2026-07-20. Only catBooking matches that date.
    renderAdminView([dogBooking, catBooking, pigBooking]);

    expect(screen.getByText(/1 pet being serviced today/i)).toBeInTheDocument();
  });

  it('shows zero for "being serviced today" when no bookings match the current date', () => {
    renderAdminView([dogBooking, pigBooking]);

    expect(
      screen.getByText(/0 pets being serviced today/i),
    ).toBeInTheDocument();
  });
});
