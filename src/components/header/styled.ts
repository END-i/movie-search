import styled from "styled-components";

import { MediaContainer } from "components/styled";
import { ReactComponent as SearchIcon } from "assets/icons/search.svg";
import { ReactComponent as CloseIcon } from "assets/icons/close.svg";
import { gray, white, blue } from "assets/colors";

const Wrapper = styled.div`
  background: ${blue};
  color: ${white};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
`;
const Container = styled(MediaContainer)`
  display: flex;
  align-items: center;
  @media only screen and (max-width: 480px) {
    display: grid;
  }
`;
const Title = styled.h1`
  margin: 0;
  cursor: pointer;
  user-select: none;
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

const Filter = styled.div`
  display: flex;
  align-items: center;
  width: 270px;
  padding-left: 20px;
  font-weight: 600;
`;
export { Filter, Wrapper, Container, Title, SearchWrapper, Input, Icon, SearchResult, Clear };
