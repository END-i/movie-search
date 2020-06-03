import styled from "styled-components";

import { MediaContainer } from "components/styled";
import movie from "assets/icons/movie.svg";
import { white2, white, black, blue } from "assets/colors";

const Wrapper = styled.div``;
const FilmsGrid = styled(MediaContainer)`
  position: relative;
  display: grid;
  grid-template-columns: repeat(auto-fit, 200px);
  grid-gap: 20px;
  justify-content: center;
  padding: 20px;
`;
const FilmWrapper = styled.div`
  border: 1px solid ${white2};
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  background-color: ${white};
  max-width: 300px;
  cursor: pointer;
`;
const Title = styled.p`
  font-weight: 700;
  color: ${black};
  font-size: 1.2em;
  margin: 10px 10px 5px;
  &:hover {
    text-decoration: underline;
  }
`;
const Poster = styled.img`
  width: 100%;
`;
const ReleaseDate = styled.div`
  font-size: 1em;
  margin: 0 10px 10px;
  padding: 0;
  color: rgba(0, 0, 0, 0.6);
`;

const NoPoster = styled.div`
  background: url("${movie}") no-repeat center;
  height: 80%;
  min-height: 300px;
  box-sizing: border-box;
  background-size: 100px;
`;

const NoFilms = styled.div`
  text-align: center;
  padding: 150px 20px;
  box-sizing: border-box;
  min-width: 320px;
`;

const More = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.1s;
  cursor: pointer;
  padding: 50px 0 50px;
  font-size: 1.5em;
  svg {
    width: 25px;
    height: 25px;
    fill: ${blue};
    margin: 0 20px;
  }
  &:hover {
    text-decoration: underline;
  }
`;

export { Wrapper, FilmWrapper, Title, Poster, ReleaseDate, NoPoster, NoFilms, More, FilmsGrid };
