import React, { useState, useRef, useEffect } from "react";

import useOutsideClick from "utils/useOutsideClick";
import { IDropDownValue } from "utils/types";
import { Wrapper, Current, List } from "./styled";

export default function ({
  options,
  callback,
  current,
}: {
  options: {
    key: string;
    value: string;
  }[];
  callback: (value: IDropDownValue) => void;
  current: {
    key: string;
    value: string;
  };
}) {
  const [show, setShow] = useState<boolean>(false);
  const [ddState, setDdState] = useState<{ key: string; value: string }>(current);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useOutsideClick(dropdownRef, () => {
    if (show) {
      setShow(false);
    }
  });

  useEffect(() => {
    if (current) {
      setDdState(current);
    }
  }, [current]);

  const handleChoose = (i: IDropDownValue) => () => {
    setDdState(i);
    callback(i);
    setShow(false);
  };

  return (
    <Wrapper ref={dropdownRef}>
      <Current onClick={() => setShow(true)}>{ddState.key}</Current>
      <List show={show}>
        {options.map(({ value, key }) => (
          <div key={key} onClick={handleChoose({ value, key })}>
            {key}
          </div>
        ))}
      </List>
    </Wrapper>
  );
}
