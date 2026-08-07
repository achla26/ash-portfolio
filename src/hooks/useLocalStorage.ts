"use client";

import { useState, useEffect, useRef, useCallback } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  const [isHydrated, setIsHydrated] = useState(false);

  // ✅ Ref to always get latest value (fixes race condition)
  const storedValueRef = useRef<T>(initialValue);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        const parsed = JSON.parse(item);
        setStoredValue(parsed);
        storedValueRef.current = parsed;
      }
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
    } finally {
      setIsHydrated(true);
    }
  }, [key]);

  // ✅ Keep ref in sync
  useEffect(() => {
    storedValueRef.current = storedValue;
  }, [storedValue]);

  // ✅ Fixed setValue - uses ref for latest value
  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        // Use ref.current instead of storedValue for function updater
        const valueToStore =
          value instanceof Function ? value(storedValueRef.current) : value;

        // Update ref FIRST (synchronous)
        storedValueRef.current = valueToStore;

        // Then update state
        setStoredValue(valueToStore);

        // Then update localStorage
        if (typeof window !== "undefined") {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
        }
      } catch (error) {
        console.error(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key]
  );

  return { value: storedValue, setValue, isHydrated };
}