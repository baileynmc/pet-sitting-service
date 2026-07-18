import { useEffect, useState } from 'react';
import { sittingServicesData } from './sittingServicesData';

export const useSittingServicesQuery = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Wait 1000 milliseconds (1 seconds), then set isLoading to false
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    // Clean up the timer when the component unmounts
    return () => clearTimeout(timer);
  }, []);

  return {
    isLoading,
    data: sittingServicesData,
  };
};
