import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import { ReactComponent as BackIcon } from "assets/icons/back.svg";

const GoBack = styled.div`
  position: absolute;
  top: 45px;
  left: 5px;
  width: 50px;
  height: 50px;
  background: transparent;
  border-radius: 100%;
  padding: 5px;
  box-sizing: border-box;
  display: flex;
  cursor: pointer;
  transition: 0.2s;
  svg {
    width: 30px;
    fill: #999;
    margin: auto;
    transition: 0.2s;
  }
  &:hover {
    background: #000;
  }
  &:hover > svg {
    fill: #fff;
  }
  @media only screen and (max-width: 480px) {
    top: 85px;
  }
`;

export default function () {
  const { goBack } = useHistory();

  return (
    <GoBack onClick={goBack}>
      <BackIcon />
    </GoBack>
  );
}
