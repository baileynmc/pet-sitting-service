import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryRouter, RouterProvider, MemoryRouter } from 'react-router';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { BookingForm } from './BookingForm';
import { useSittingServicesQuery } from '../../hooks/useSittingServicesQuery';
import { useBookingContext } from '../../BookingContext';
import type { SittingServiceOption } from '../../types';

vi.mock('../../hooks/useSittingServicesQuery');
vi.mock('../../BookingContext', async (importOriginal) => ({
  ...(await importOriginal<object>()),
  useBookingContext: vi.fn(),
}));

const mockedUseSittingServicesQuery = vi.mocked(useSittingServicesQuery);
const mockedUseBookingContext = vi.mocked(useBookingContext);

const pricingInformation: SittingServiceOption[] = [
  { type: 'dog', basePrice: 20, surchargePerHour: 5 },
  { type: 'cat', basePrice: 15, surchargePerHour: 3 },
  { type: 'pig', basePrice: 30, surchargePerHour: 8 },
];

function renderBookingForm(setActiveBookings = vi.fn()) {
  mockedUseSittingServicesQuery.mockReturnValue({
    data: pricingInformation,
    isLoading: false,
  } as ReturnType<typeof useSittingServicesQuery>);

  mockedUseBookingContext.mockReturnValue({
    activeBookings: [],
    setActiveBookings,
  });

  render(
    <MemoryRouter>
      <BookingForm />
    </MemoryRouter>,
  );

  return { setActiveBookings };
}

describe('BookingForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the booking form with default field values', () => {
    renderBookingForm();

    expect(
      screen.getByRole('heading', { name: /book a visit/i }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/first name/i)).toHaveValue('');
    expect(screen.getByLabelText(/last name/i)).toHaveValue('');
    expect(screen.getByLabelText(/animal name/i)).toHaveValue('');
    expect(screen.getByLabelText(/hours requested/i)).toHaveValue(2);
    // Default animalType is 'dog'
    expect(screen.getByRole('radio', { name: /dog/i })).toBeChecked();
  });

  it('lets the user fill in text and number fields', async () => {
    const user = userEvent.setup();
    renderBookingForm();

    await user.type(screen.getByLabelText(/first name/i), 'Jamie');
    await user.type(screen.getByLabelText(/last name/i), 'Rivera');
    await user.type(screen.getByLabelText(/animal name/i), 'Biscuit');

    const hoursInput = screen.getByLabelText(/hours requested/i);
    await user.clear(hoursInput);
    await user.type(hoursInput, '4');

    expect(screen.getByLabelText(/first name/i)).toHaveValue('Jamie');
    expect(screen.getByLabelText(/last name/i)).toHaveValue('Rivera');
    expect(screen.getByLabelText(/animal name/i)).toHaveValue('Biscuit');
    expect(hoursInput).toHaveValue(4);
  });

  it('lets the user switch the selected animal type', async () => {
    const user = userEvent.setup();
    renderBookingForm();

    const dogRadio = screen.getByRole('radio', { name: /dog/i });
    const catRadio = screen.getByRole('radio', { name: /cat/i });

    expect(dogRadio).toBeChecked();
    expect(catRadio).not.toBeChecked();

    await user.click(catRadio);

    expect(catRadio).toBeChecked();
    expect(dogRadio).not.toBeChecked();
  });

  it('enforces a minimum selectable date of today on the date field', () => {
    renderBookingForm();

    const dateInput = screen.getByLabelText(
      /date of service/i,
    ) as HTMLInputElement;
    const today = new Date().toISOString().split('T')[0];

    expect(dateInput).toHaveAttribute('min', today);
  });

  it('submits the booking with the calculated price and shows the confirmation screen', async () => {
    const user = userEvent.setup();
    const { setActiveBookings } = renderBookingForm();

    await user.type(screen.getByLabelText(/first name/i), 'Jamie');
    await user.type(screen.getByLabelText(/last name/i), 'Rivera');
    await user.type(screen.getByLabelText(/animal name/i), 'Biscuit');
    await user.click(screen.getByRole('radio', { name: /cat/i }));

    const hoursInput = screen.getByLabelText(/hours requested/i);
    await user.clear(hoursInput);
    await user.type(hoursInput, '4');

    const dateInput = screen.getByLabelText(/date of service/i);
    await user.type(dateInput, '2026-08-01');

    await user.click(
      screen.getByRole('button', { name: /submit reservation/i }),
    );

    // cat: basePrice 15 + surchargePerHour 3 * 4 hours = 27
    expect(setActiveBookings).toHaveBeenCalledTimes(1);
    expect(setActiveBookings).toHaveBeenCalledWith([
      {
        firstName: 'Jamie',
        lastName: 'Rivera',
        animalName: 'Biscuit',
        animalType: 'cat',
        hoursRequested: 4,
        dateOfService: '2026-08-01',
        price: 27,
      },
    ]);

    expect(
      screen.getByText(/booking submitted successfully/i),
    ).toBeInTheDocument();
    expect(screen.queryByLabelText(/first name/i)).not.toBeInTheDocument();
  });

  it('appends to existing active bookings rather than overwriting them', async () => {
    const user = userEvent.setup();
    const existingBooking = {
      firstName: 'Sam',
      lastName: 'Lee',
      animalName: 'Max',
      animalType: 'dog' as const,
      hoursRequested: 2,
      dateOfService: '2026-07-20',
      price: 30,
    };
    const setActiveBookings = vi.fn();

    mockedUseSittingServicesQuery.mockReturnValue({
      data: pricingInformation,
      isLoading: false,
    } as ReturnType<typeof useSittingServicesQuery>);
    mockedUseBookingContext.mockReturnValue({
      activeBookings: [existingBooking],
      setActiveBookings,
    });

    render(
      <MemoryRouter>
        <BookingForm />
      </MemoryRouter>,
    );

    await user.type(screen.getByLabelText(/first name/i), 'Jamie');
    await user.type(screen.getByLabelText(/last name/i), 'Rivera');
    await user.type(screen.getByLabelText(/animal name/i), 'Biscuit');
    await user.type(screen.getByLabelText(/date of service/i), '2026-08-01');

    await user.click(
      screen.getByRole('button', { name: /submit reservation/i }),
    );

    expect(setActiveBookings).toHaveBeenCalledWith([
      existingBooking,
      expect.objectContaining({ firstName: 'Jamie', animalName: 'Biscuit' }),
    ]);
  });

  it('resets the form when "Submit another booking" is clicked', async () => {
    const user = userEvent.setup();
    renderBookingForm();

    await user.type(screen.getByLabelText(/first name/i), 'Jamie');
    await user.type(screen.getByLabelText(/last name/i), 'Rivera');
    await user.type(screen.getByLabelText(/animal name/i), 'Biscuit');
    await user.type(screen.getByLabelText(/date of service/i), '2026-08-01');
    await user.click(
      screen.getByRole('button', { name: /submit reservation/i }),
    );

    expect(
      screen.getByText(/booking submitted successfully/i),
    ).toBeInTheDocument();

    await user.click(
      screen.getByRole('button', { name: /submit another booking/i }),
    );

    expect(
      screen.queryByText(/booking submitted successfully/i),
    ).not.toBeInTheDocument();
    expect(screen.getByLabelText(/first name/i)).toHaveValue('');
    expect(screen.getByLabelText(/hours requested/i)).toHaveValue(2);
    expect(screen.getByRole('radio', { name: /dog/i })).toBeChecked();
  });

  it('navigates back to the landing page when "Return home" is clicked', async () => {
    const user = userEvent.setup();
    mockedUseSittingServicesQuery.mockReturnValue({
      data: pricingInformation,
      isLoading: false,
    } as ReturnType<typeof useSittingServicesQuery>);
    mockedUseBookingContext.mockReturnValue({
      activeBookings: [],
      setActiveBookings: vi.fn(),
    });

    const router = createMemoryRouter(
      [
        { path: '/', element: <div>Landing page marker</div> },
        { path: '/book', element: <BookingForm /> },
      ],
      { initialEntries: ['/book'] },
    );

    render(<RouterProvider router={router} />);

    await user.type(screen.getByLabelText(/first name/i), 'Jamie');
    await user.type(screen.getByLabelText(/last name/i), 'Rivera');
    await user.type(screen.getByLabelText(/animal name/i), 'Biscuit');
    await user.type(screen.getByLabelText(/date of service/i), '2026-08-01');
    await user.click(
      screen.getByRole('button', { name: /submit reservation/i }),
    );

    await user.click(screen.getByText(/return home/i));

    expect(await screen.findByText(/landing page marker/i)).toBeInTheDocument();
    expect(router.state.location.pathname).toBe('/');
  });

  it('does not submit when required fields are left empty', async () => {
    const user = userEvent.setup();
    const { setActiveBookings } = renderBookingForm();

    // Leave firstName/lastName/animalName/dateOfService empty and try to submit.
    await user.click(
      screen.getByRole('button', { name: /submit reservation/i }),
    );

    // Native `required` validation should block submission entirely.
    expect(setActiveBookings).not.toHaveBeenCalled();
    expect(
      screen.queryByText(/booking submitted successfully/i),
    ).not.toBeInTheDocument();
  });
});
