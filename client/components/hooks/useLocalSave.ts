import React, { useCallback, useEffect, useState } from "react";

type Props = {
  items: { key: string; item: any }[];
};

function useLocalSave() {
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const addToLocalStorage = useCallback(function ({ items }: Props) {
    items.forEach((elem) => {
      window.localStorage.setItem(elem.key, JSON.stringify(elem.item));
    });
  }, []);

  const fetchFromLocalStorage = useCallback(function (key: string) {
    const item = window.localStorage.getItem(key);
    return item;
  }, []);

  useEffect(() => {
    setIsSaved(true);
  }, []);
  return { isSaved, addToLocalStorage, fetchFromLocalStorage };
}

export default useLocalSave;
