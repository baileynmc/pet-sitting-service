import { useState } from 'react';
import { PageWrapper } from '../../components/PageWrapper';
import { type BookingEntry } from '../../types';
import { Heading } from '../../components/TextHeadings';
import styled from 'styled-components';
import { DogIcon } from '../../assets/DogIcon';
import { CatIcon } from '../../assets/CatIcon';
import { PigIcon } from '../../assets/PigIcon';
import { useSittingServicesQuery } from '../../hooks/useSittingServicesQuery';
/**
 * 
 * An interface to collect bookings that allows a user to provide:
a. First Name and Last Name
b. Animal Name and Animal Types (Dog/Cat/Pig)
c. Hours Requested (min 2, max 8)
d. Date of service
 */

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 60%;
  padding-top: 5%;
  padding-bottom: 5%;
  @media (max-width: 992px) {
    width: 90%;
  }
`;

const FormRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
  justify-content: center;
`;

const FormField = styled.fieldset`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;
  border: none;
`;

const FormInput = styled.input`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const FormLabel = styled.label`
  font-size: var(--font-size-md);
  font-weight: 600;
  margin-bottom: 5px;
`;

const IconToggleContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  @media (max-width: 992px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const HiddenRadio = styled.input.attrs({ type: 'radio' })`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
`;

// Button design adapts to the active checked state and focus states
const IconButtonLabel = styled.label<{ isSelected: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-height: 200px;
  gap: 8px;
  padding: 10px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;

  /* Dynamic styles injected based on the calculated boolean prop */
  border: ${({ isSelected }) => (isSelected ? '2px solid var(--font-color)' : '2px solid var(--primary-color)')};
  background-color: ${({ isSelected }) => (isSelected ? 'var(--primary-color)' : 'var(--bg-color)')};
  color: ${({ isSelected }) => (isSelected ? 'var(--font-color)' : 'var(--primary-color)')};

  &:hover {
    border-color: ${({ isSelected }) => (isSelected ? 'var(--primary-color)' : 'var(--primary-color-hover)')};
  }
  /* Target HiddenRadio sibling focus state to show visual ring for keyboard users */
  ${HiddenRadio}:focus-visible + & {
    outline: 2px solid #0056b3;
    outline-offset: 2px;
  }
`;

interface OptionLabelInfo {
  label: string;
  icon: React.ReactNode;
}

const PetOptions: Record<BookingEntry['animalType'], OptionLabelInfo> = {
  dog: {
    label: 'Dog',
    icon: <DogIcon />,
  },
  cat: {
    label: 'Cat',
    icon: <CatIcon />,
  },
  pig: {
    label: 'Pig',
    icon: <PigIcon />,
  },
};

export const BookingForm = () => {
  const { data, isLoading } = useSittingServicesQuery();
  const [bookingEntry, setBookingEntry] = useState<BookingEntry>({
    firstName: '',
    lastName: '',
    animalName: '',
    animalType: 'dog',
    hoursRequested: 2,
    dateOfService: '',
  });

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <PageWrapper>
      <Heading>Book a Visit</Heading>
      <Form onSubmit={handleSubmit}>
        <FormRow>
          <FormField>
            <FormLabel htmlFor="firstNameInput">First Name</FormLabel>
            <FormInput
              id="firstNameInput"
              type="text"
              value={bookingEntry.firstName}
              onChange={(e) =>
                setBookingEntry((prev) => ({
                  ...prev,
                  firstName: e.target.value,
                }))
              }
              required
            />
          </FormField>
          <FormField>
            <FormLabel htmlFor="lastNameInput">Last Name</FormLabel>
            <FormInput
              id="lastNameInput"
              type="text"
              value={bookingEntry.lastName}
              onChange={(e) =>
                setBookingEntry((prev) => ({
                  ...prev,
                  lastName: e.target.value,
                }))
              }
              required
            />
          </FormField>
        </FormRow>
        <FormRow>
          <FormField>
            <FormLabel htmlFor="animalNameInput">Animal Name</FormLabel>
            <FormInput
              id="animalNameInput"
              type="text"
              value={bookingEntry.animalName}
              onChange={(e) =>
                setBookingEntry((prev) => ({
                  ...prev,
                  animalName: e.target.value,
                }))
              }
              required
            />
          </FormField>
        </FormRow>
        <FormRow>
          <FormField>
            <FormLabel htmlFor="animalTypeInput">Animal Type</FormLabel>
            <IconToggleContainer>
              {data?.map((opt) => {
                const isSelected = bookingEntry.animalType === opt.type;

                return (
                  <div key={opt.type}>
                    <HiddenRadio
                      id={opt.type}
                      name="animalTypeInput"
                      value={opt.type}
                      checked={isSelected}
                      onChange={(e) =>
                        setBookingEntry((prev) => ({
                          ...prev,
                          animalType: e.target
                            .value as BookingEntry['animalType'],
                        }))
                      }
                    />
                    <IconButtonLabel htmlFor={opt.type} isSelected={isSelected}>
                      {PetOptions[opt.type].icon}
                      <p>{PetOptions[opt.type].label}</p>
                    </IconButtonLabel>
                  </div>
                );
              })}
            </IconToggleContainer>
          </FormField>
        </FormRow>
        <button type="submit">Submit</button>
      </Form>
    </PageWrapper>
  );
};
