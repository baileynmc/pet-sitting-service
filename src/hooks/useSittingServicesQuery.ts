import { useEffect, useState } from 'react';
import { sittingServicesData } from './sittingServicesData';

export const useSittingServicesQuery = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Wait 2000 milliseconds (2 seconds), then set isLoading to false
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    // Clean up the timer when the component unmounts
    return () => clearTimeout(timer);
  }, []);

  return {
    isLoading,
    data: sittingServicesData,
  };
};
