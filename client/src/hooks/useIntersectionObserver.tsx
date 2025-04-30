import { useEffect, useState, useRef, RefObject } from 'react';

interface IntersectionObserverOptions {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
}

export function useIntersectionObserver<T extends Element>(
  options: IntersectionObserverOptions = {}
): [RefObject<T>, boolean] {
  const [isIntersecting, setIntersecting] = useState(false);
  const elementRef = useRef<T>(null);
  
  const { root = null, rootMargin = '0px', threshold = 0.1 } = options;
  
  useEffect(() => {
    const element = elementRef.current;
    
    if (!element) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIntersecting(entry.isIntersecting);
      },
      { root, rootMargin, threshold }
    );
    
    observer.observe(element);
    
    return () => {
      observer.unobserve(element);
      observer.disconnect();
    };
  }, [root, rootMargin, threshold]);
  
  return [elementRef, isIntersecting];
}
