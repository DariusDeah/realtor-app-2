import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type Props = {
  children: JSX.Element[] | JSX.Element;
  selector: string;
};

function Portal({ children, selector }: Props) {
  const ref = useRef<any>();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    ref.current = document.querySelector(selector);
    setMounted(true);
  }, [selector]);
  return mounted ? createPortal(children, ref.current) : null;
}

export default Portal;
