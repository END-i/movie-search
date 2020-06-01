import styled from "styled-components";

export const MediaContainer = styled.div`
  margin: 0 auto;
  min-width: 320px;
  padding: 0 20px;
  box-sizing: border-box;
  @media only screen and (max-width: 320px) {
    max-width: 480px;
  }
  @media only screen and (max-width: 480px) {
    max-width: 600px;
    display: grid;
  }
  @media only screen and (max-width: 600px) {
    max-width: 768px;
  }
  @media only screen and (max-width: 768px) {
    max-width: 900px;
  }
  @media only screen and (min-width: 900px) {
    max-width: 1024px;
  }
`;

export const Dirived = styled.div`
  position: relative;
  padding: 0 10px;
  &:after {
    content: "";
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: #fff;
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
  }
`;
