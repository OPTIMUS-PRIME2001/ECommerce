// Global import
import { useEffect, useState } from "react";

export const useOrigin = () => {
    //state to check if modal mounted with server side or not
    // To avoid hydration error
  const [mounted, setMounted] = useState(false);

  // We are checking if the window is available
  // if it is we are checking window.location exists if that is , then use window.location
  const origin = typeof window !== 'undefined' && window.location.origin ? window.location.origin : '';

  useEffect(() => {
    setMounted(true)
  }, [])

  // if mounted return empty otherwise return origin
  if (!mounted) {
    return ''
  }

  return origin;
};