import styled from "styled-components";

import { ReactComponent as SearchIcon } from "assets/search.svg";
import { ReactComponent as CloseIcon } from "assets/close.svg";
import { gray, white, black, blue } from "assets/colors";

const Wrapper = styled.div`
  background: ${blue};
  color: ${white};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
`;
const Container = styled.div`
  margin: 0 auto;
  padding: 0 20px;
  box-sizing: border-box;
  min-width: 320px;
  display: flex;
  align-items: center;
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
  @media only screen and (max-width: 900px) {
    max-width: 1024px;
  }
`;
const Title = styled.h1`
  margin: 0;
  @media only screen and (max-width: 320px) {
    max-width: 480px;
    grid-column-start: 1;
    grid-row-start: 1;
  }
`;
const SearchWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  background: ${white};
  padding: 0 10px;
  margin-left: 20px;
  width: 100%;
  border-bottom: 1px solid ${blue};
  border-top: 1px solid ${blue};
  box-sizing: border-box;
  @media only screen and (max-width: 480px) {
    grid-column-start: 1;
    grid-column-end: 4;
    grid-row-start: 2;
    margin: 0;
  }
`;
const Input = styled.input`
  outline: none;
  border: none;
  background: transparent;
  width: 100%;
  padding: 10px 0;
`;
const Icon = styled(SearchIcon)`
  width: 20px;
  fill: ${blue};
  margin-right: 10px;
`;
const Clear = styled(CloseIcon)`
  width: 12px;
  fill: ${blue};
  cursor: pointer;
  opacity: 0.6;
  transition: opacity 0.1s;
  &:hover {
    opacity: 1;
  }
`;
const Lang = styled.div`
  position: relative;
  @media only screen and (max-width: 480px) {
    grid-column-start: 3;
    grid-row-start: 1;
    display: flex;
    justify-content: flex-end;
  }
`;
const LangList = styled.div<{ show: boolean }>`
  border: 5px solid ${white};
  position: absolute;
  top: 20px;
  right: 5px;
  background: ${gray};
  width: 40px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
  display: grid;
  grid-gap: 1px;
  visibility: ${({ show }) => (show ? "visible" : "hidden")};
  & > div {
    text-transform: uppercase;
    text-align: center;
    padding: 5px 0;
    cursor: pointer;
    background: ${white};
    color: ${gray};
    transition: color 0.15s;
    &:hover {
      color: ${black};
      font-weight: bold;
    }
  }
`;
const CurrentLang = styled.div`
  margin: 0 20px;
  font-weight: 600;
  text-transform: uppercase;
  cursor: pointer;
  opacity: 0.8;
  width: 25px;
  text-align: center;
  &:hover {
    opacity: 1;
  }
`;
const SearchResult = styled.div`
  position: absolute;
  background: ${white};
  top: 37px;
  left: 0;
  right: 0;
  border-left: 5px solid ${blue};
  border-right: 5px solid ${blue};
  display: grid;
  grid-gap: 1px;
  & > div {
    padding: 5px 0;
    padding-left: 35px;
    cursor: pointer;
    background: ${blue};
    color: ${gray};
    transition: color 0.15s;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    &:hover {
      color: ${white};
    }
  }
`;

export {
  Wrapper,
  Container,
  Title,
  SearchWrapper,
  Input,
  Icon,
  Lang,
  LangList,
  CurrentLang,
  SearchResult,
  Clear,
};
