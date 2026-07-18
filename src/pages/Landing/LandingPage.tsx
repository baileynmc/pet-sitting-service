import { PageWrapper } from '../../components/PageWrapper';
import DogAndCatPetsHeader from '../../assets/DogAndCatPetsHeader.jpg';
import styled from 'styled-components';
import { RouterButton } from '../../components/RouterButton';
import {
  Heading,
  Subheading,
  SectionHeading,
  BulletHeading,
  BulletText,
} from '../../components/TextHeadings';

const ImageHeader = styled.img`
  width: 100%;
  height: 450px;
  object-fit: cover;
  @media (max-width: 992px) {
    height: 300px;
  }
`;

const ButtonRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const ButtonLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  border-radius: 5px;
  background-color: transparent;
  border: 2px solid var(--primary-color);
  color: var(--primary-color);
  text-decoration: none;
  font-size: var(--font-size-md);
  text-transform: uppercase;
  font-weight: 600;
  transition: all 0.3s ease;
  font-family: 'Merriweather', sans-serif;
  &:hover {
    border: 2px solid var(--primary-color-hover);
  }
`;

const Section = styled.section`
  margin-bottom: 20px;
  width: 100%;
`;

export const LandingPage = () => {
  return (
    <div>
      <ImageHeader src={DogAndCatPetsHeader} alt="Dog Shield" />
      <PageWrapper>
        <Heading>Reliable Pet Sitting, Made Simple</Heading>
        <Subheading>
          Whether your companion has paws, whiskers, or even a snout, booking
          trusted pet care should be quick and hassle-free. Schedule your visit
          in minutes, receive an instant price estimate, and leave the rest to
          us.
        </Subheading>
        <ButtonRow>
          <RouterButton to="/book">Book a Visit</RouterButton>
          <ButtonLink href="#how-it-works">Learn More</ButtonLink>
        </ButtonRow>
        <Section>
          <SectionHeading id="why-choose-us">Why choose us?</SectionHeading>
          <BulletHeading>🐾 Simple Booking</BulletHeading>
          <BulletText>
            Complete your reservation in less than a minute.
          </BulletText>
          <BulletHeading>⚡ Live Pricing</BulletHeading>
          <BulletText>Get an instant price estimate for your visit.</BulletText>
          <BulletHeading>📅 Flexible Scheduling</BulletHeading>
          <BulletText>
            Book anywhere from 2 to 8 hours of pet sitting.
          </BulletText>
          <BulletHeading>❤️ Every Pet Matters</BulletHeading>
          <BulletText>
            Your furry friend is treated with the same care and attention as our
            own.
          </BulletText>
        </Section>
        <Section>
          <SectionHeading id="how-it-works">How it works</SectionHeading>
          <BulletHeading>1. Tell us about your pet</BulletHeading>
          <BulletText>
            Enter your name, your pet's name, choose their animal type, and
            select the date and number of hours you'd like us to care for them.
          </BulletText>
          <BulletHeading>2. Get an Instant Quote</BulletHeading>
          <BulletText>
            Our live pricing calculator updates automatically as you adjust your
            booking, so you'll always know the total before you submit.
          </BulletText>
          <BulletHeading>3. Relax While We Care</BulletHeading>
          <BulletText>
            Submit your booking and you're all set! We'll be ready to provide
            attentive, reliable care for your furry (or not-so-furry) friend.
          </BulletText>
        </Section>
      </PageWrapper>
    </div>
  );
};
