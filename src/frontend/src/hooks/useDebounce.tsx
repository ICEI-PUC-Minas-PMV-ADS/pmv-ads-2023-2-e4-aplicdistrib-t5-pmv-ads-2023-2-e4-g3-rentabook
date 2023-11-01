import { useRef } from "react";

export default function useDebounce(fn: any, delay: any) {
  const timeOutRef = useRef<any>(null);

  function debouceFn(...args: any) {
    window.clearTimeout(timeOutRef.current);
    timeOutRef.current = window.setTimeout(() => {
      fn(...args);
    }, delay);
  }
  return debouceFn;
}
