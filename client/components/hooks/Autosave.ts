import React, { useEffect, useState } from "react";

type Props = {
  items: { key: string; item: any }[];
};

function useAutosave({ items }: Props) {
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [isSaved, setIsSaved] = useState<boolean>(false);

  const addToLocalStorage = () => {
    setIsSaving(true);
    items.forEach((elem) => {
      window.localStorage.setItem(elem.key, JSON.stringify(elem.item));
    });
  };
  const setIsSavingToFalse = () => {
    setInterval(() => {
      setIsSaving(false);
      console.log({ isSaving, isSaved });
    }, 9000);
  };

  useEffect(() => {
    const autoSaveTimeout = setTimeout(() => {
      addToLocalStorage();
      console.log(isSaving);
    }, 5000);

    return () => {
      clearTimeout(autoSaveTimeout);
      setIsSavingToFalse();
    };
  }, [isSaving]);

  return {
    isSaving,
  };
}

export default useAutosave;
