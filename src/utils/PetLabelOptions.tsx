import { CatIcon } from '../assets/CatIcon';
import { DogIcon } from '../assets/DogIcon';
import { PigIcon } from '../assets/PigIcon';
import type { BookingEntry } from '../types';

interface OptionLabelInfo {
  label: string;
  icon: React.ReactNode;
}

export const PetOptions: Record<BookingEntry['animalType'], OptionLabelInfo> = {
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
