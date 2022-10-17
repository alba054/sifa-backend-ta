import {useRef, useEffect, useCallback} from 'react';

export default function useAbortController() {
    const ref = useRef<AbortController>();
  
    useEffect(() => () => ref.current?.abort(), []);
    
    return useCallback(() => {
      ref.current = new AbortController();
      return ref.current.signal;
    }, []);
  }