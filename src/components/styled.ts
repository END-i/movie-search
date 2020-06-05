import styled from "styled-components";

import { white } from "assets/colors";

export const MediaContainer = styled.div`
  margin: 0 auto;
  padding: 0 20px;
  box-sizing: border-box;
  max-width: 1024px;
  min-width: 320px;
  width: 100%;
`;

export const Dirived = styled.div`
  position: relative;
  padding: 10px;
  &:after {
    content: "";
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: ${white};
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
  }
`;
