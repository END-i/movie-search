import styled from "styled-components";

import { gray, white, black, shadow04 } from "assets/colors";

const Wrapper = styled.div`
  position: relative;
`;
const Current = styled.div`
  margin: 0 20px;
  font-weight: 600;
  text-transform: uppercase;
  cursor: pointer;
  opacity: 0.8;
  text-align: center;
  transition: opacity 0.15s;
  &:hover {
    opacity: 1;
  }
`;
const List = styled.div<{ show: boolean }>`
  border: 5px solid ${white};
  position: absolute;
  top: 20px;
  right: 0;
  left: 0;
  background: ${gray};
  box-shadow: 0 2px 8px ${shadow04};
  display: grid;
  grid-gap: 1px;
  visibility: ${({ show }) => (show ? "visible" : "hidden")};
  max-width: fit-content;
  margin: 0 auto;
  & > div {
    font-weight: bold;
    text-transform: uppercase;
    text-align: center;
    padding: 5px;
    cursor: pointer;
    background: ${white};
    color: ${gray};
    transition: font-weight 0.15s, color 0.2s;
    &:hover {
      color: ${black};
    }
  }
`;

export { Wrapper, Current, List };
