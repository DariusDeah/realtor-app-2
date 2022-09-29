import React, { useCallback, useEffect } from "react";

export default function useUpdateLocalSave() {
  const addToLocalStorage = useCallback((key: string, data: any) => {
    const previousData = JSON.parse(window.localStorage.getItem(key) ?? "{}");
    localStorage.setItem(key, JSON.stringify({ ...previousData, ...data }));
  }, []);
  return addToLocalStorage;
}
