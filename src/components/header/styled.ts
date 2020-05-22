import styled from "styled-components";

import { ReactComponent as SearchIcon } from "assets/search.svg";
import { ReactComponent as CloseIcon } from "assets/close.svg";

const Wrapper = styled.div`
  background: #081c24;
  color: #fff;
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
  min-width: 480px;
  display: flex;
  align-items: center;
  @media only screen and (min-width: 480px) {
    max-width: 768px;
  }

  @media only screen and (min-width: 768px) {
    max-width: 992px;
  }

  @media only screen and (min-width: 992px) {
    max-width: 1382px;
  }

  @media only screen and (min-width: 1382px) {
    max-width: 1600px;
  }

`;
const Title = styled.h1`
  margin: 0;
`;
const SearchWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  background: #fff;
  padding: 0 10px;
  margin-left: 20px;
  width: 100%;
  border-bottom: 1px solid #081c24;
  border-top: 1px solid #081c24;
  box-sizing: border-box;
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
  fill: #081c24;
  margin-right: 10px;
`;
const Clear = styled(CloseIcon)`
  width: 12px;
  fill: #081c24;
  cursor: pointer;
  opacity: 0.6;
  transition: opacity 0.1s;
  &:hover {
    opacity: 1;
  }
`;
const Lang = styled.div`
  position: relative;
`;
const LangList = styled.div<{ show: boolean }>`
  border: 5px solid #081c24;
  position: absolute;
  top: 27px;
  left: 0;
  right: 0;
  background: #888;
  display: grid;
  grid-gap: 1px;
  visibility: ${({ show }) => (show ? "visible" : "hidden")};
  & > div {
    text-transform: uppercase;
    text-align: center;
    padding: 5px 0;
    cursor: pointer;
    background: #081c24;
    color: #888;
    transition: color 0.15s;
    &:hover {
      color: #fff;
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
  background: #fff;
  top: 37px;
  left: 0;
  right: 0;
  border-left: 5px solid #081c24;
  border-right: 5px solid #081c24;
  display: grid;
  grid-gap: 1px;
  & > div {
    padding: 5px 0;
    padding-left: 35px;
    cursor: pointer;
    background: #081c24;
    color: #888;
    transition: color 0.15s;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    &:hover {
      color: #fff;
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
