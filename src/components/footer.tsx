import React from "react";
import styled from "styled-components";

import translate from "utils/translate";

const Wrapper = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  background: #081c24;
  color: #fff;
  & > a {
    color: #41b2e8;
    transition: 0.1s;
    margin: 0 10px;
    &:hover {
      text-decoration: underline;
    }
  }
`;

export default function () {
  return (
    <Wrapper>
      &copy; {new Date().getFullYear()} {translate("tokyo")}, Copyright:{" "}
      <a href="https://github.com/END-i">https://github.com/END-i</a>
    </Wrapper>
  );
}
