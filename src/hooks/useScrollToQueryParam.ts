import { useEffect } from 'react';
import { useSearchParams } from 'react-router';

export function useScrollToQueryParam() {
  const [searchParams] = useSearchParams();
  const scrollTo = searchParams.get('scrollTo');

  useEffect(() => {
    if (!scrollTo) return;
    const timeoutId = setTimeout(() => {
      document
        .getElementById(scrollTo)
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 0);
    return () => clearTimeout(timeoutId);
  }, [scrollTo]);
}
