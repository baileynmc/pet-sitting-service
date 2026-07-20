import styled from 'styled-components';
import { PageWrapper } from '../../components/PageWrapper';
import { useBookingContext } from '../../BookingContext';
import { Heading } from '../../components/TextHeadings';
import { PetOptions } from '../../utils/PetLabelOptions';

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

function parseLocalDate(dateString: string): Date {
  const [year, month, day] = dateString.split('-').map(Number);
  return new Date(year, month - 1, day);
}

function toLocalDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function formatDate(dateString: string): string {
  const date = parseLocalDate(dateString);
  if (Number.isNaN(date.getTime())) return dateString;
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
}

const HeaderWrapper = styled.header`
  max-width: 1040px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

const SubHeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
`;

const RosterCount = styled.div`
  font-family: 'Outfit', sans-serif;
  color: var(--primary-color);
  font-size: 14px;
  white-space: nowrap;
`;

const Grid = styled.div`
  padding: 24px 0;
  width: 90%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
`;

const Card = styled.article`
  position: relative;
  background: var(--card-color);
  border-radius: 14px;
  overflow: hidden;
  transition: background 0.18s ease;

  &:hover {
    background: var(--card-color-hover);
  }

  &::before {
    content: '';
    position: absolute;
    inset: 0 auto 0 0;
    width: 8px;
    background: var(--secondary-color);
  }
`;

const CardBody = styled.div`
  padding: 22px 22px 18px 26px;
`;

const CardTop = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
`;

const PetName = styled.h2`
  margin: 0;
  font-family: 'Roboto', sans-serif;
  font-weight: 600;
  font-size: 22px;
  color: var(--font-color);
`;

const OwnerName = styled.p`
  margin: 0;
  font-size: 13.5px;
  color: var(--font-color);
`;

const AnimalTag = styled.span`
  font-family: 'Roboto', sans-serif;
  font-size: var(--font-size-sm);
  text-transform: uppercase;
  color: var(--primary-color);
  border: 1px solid var(--primary-color);
  border-radius: 999px;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 10px;
  > svg {
    width: 24px;
    height: 24px;
  }
  > svg > path {
    fill: var(--primary-color);
  }
`;

const Perforation = styled.div`
  position: relative;
  margin: 18px 0 16px;
  border-top: 1.5px dashed var(--secondary-color);
`;

const StubRow = styled.dl`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px 16px;
  margin: 0;
`;

const StubItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const StubLabel = styled.dt`
  font-size: 11px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--font-color);
`;

const StubValue = styled.dd`
  margin: 0;
  font-family: 'Roboto', sans-serif;
  font-size: 14.5px;
  color: var(--font-color);
`;

const PriceValue = styled(StubValue)`
  font-size: 16px;
  font-weight: 600;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 64px 24px;
`;

const EmptyTitle = styled.p`
  font-family: 'Outfit', sans-serif;
  font-size: var(--font-size-lg);
  color: var(--font-color);
  margin: 0 0 8px;
`;

const EmptyBody = styled.p`
  font-family: 'Outfit', sans-serif;
  font-size: var(--font-size-md);
  color: var(--font-color);
  margin: 0;
`;

export const AdminView = () => {
  const { activeBookings } = useBookingContext();

  const sorted = [...activeBookings].sort(
    (a, b) =>
      parseLocalDate(a.dateOfService).getTime() -
      parseLocalDate(b.dateOfService).getTime(),
  );

  const todaysBookings = sorted.filter(
    (booking) => booking.dateOfService === toLocalDateKey(new Date()),
  );

  return (
    <PageWrapper>
      <HeaderWrapper>
        <Heading>Active Bookings</Heading>
        <SubHeaderWrapper>
          <RosterCount>
            {sorted.length} {sorted.length === 1 ? 'pet' : 'pets'} scheduled
          </RosterCount>
          <RosterCount>|</RosterCount>
          <RosterCount>
            {todaysBookings.length}{' '}
            {todaysBookings.length === 1 ? 'pet' : 'pets'} being serviced today
          </RosterCount>
        </SubHeaderWrapper>
      </HeaderWrapper>

      {sorted.length === 0 ? (
        <EmptyState>
          <EmptyTitle>No pets checked in yet</EmptyTitle>
          <EmptyBody>
            New bookings will show up here as soon as they&rsquo;re confirmed.
          </EmptyBody>
        </EmptyState>
      ) : (
        <Grid>
          {sorted.map((booking, index) => {
            return (
              <Card
                key={`${booking.firstName}-${booking.lastName}-${booking.animalName}-${index}`}
              >
                <CardBody>
                  <CardTop>
                    <div>
                      <PetName>{booking.animalName}</PetName>
                      <OwnerName>
                        {booking.firstName} {booking.lastName}
                      </OwnerName>
                    </div>
                    <AnimalTag>
                      {PetOptions[booking.animalType].icon}
                      {PetOptions[booking.animalType].label}
                    </AnimalTag>
                  </CardTop>

                  <Perforation />

                  <StubRow>
                    <StubItem>
                      <StubLabel>Date</StubLabel>
                      <StubValue>{formatDate(booking.dateOfService)}</StubValue>
                    </StubItem>
                    <StubItem>
                      <StubLabel>Hours</StubLabel>
                      <StubValue>{booking.hoursRequested}</StubValue>
                    </StubItem>
                    <StubItem>
                      <StubLabel>Total</StubLabel>
                      <PriceValue>
                        {currencyFormatter.format(booking.price)}
                      </PriceValue>
                    </StubItem>
                  </StubRow>
                </CardBody>
              </Card>
            );
          })}
        </Grid>
      )}
    </PageWrapper>
  );
};
