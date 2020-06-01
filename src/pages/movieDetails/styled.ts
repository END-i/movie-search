import styled from "styled-components";

import { MediaContainer } from "components/styled";

const Wrapper = styled.div<{ image: string }>`
  background: ${({ image }) => `url("${image}") no-repeat center`};
  background-size: cover;
  height: 500px;
  margin-top: 50px;
`;
const GoBack = styled.div``;

const Details = styled.div`
  background: linear-gradient(
    to right,
    rgba(11.76%, 15.29%, 17.25%, 1) 150px,
    rgba(19.61%, 21.96%, 23.53%, 0.84) 100%
  );
  height: 500px;
`;

const Poster = styled.img`
  margin: auto;
  border-radius: 10px;
`;
const Description = styled.div`
  color: #fff;
  padding-top: 50px;
`;
const Title = styled.h2`
  width: 100%;
  margin: 0;
  padding: 0;
  font-size: 2.2rem;
`;
const Row = styled.div`
  display: flex;
  align-items: center;
`;
const Date = styled.div``;
const Genres = styled.div``;
const Runtime = styled.div``;
const Popularity = styled.div`
  font-size: 2em;
  margin: 15px 0;
`;
const Content = styled(MediaContainer)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 20px;
`;
const Overview = styled.div`
  p {
    font-size: 1.3em;
    margin: 0 0 5px;
  }
`;
const Starring = styled(MediaContainer)``;
const MovieActors = styled.div`
  display: flex;
  flex-wrap: nowrap;
  overflow-y: hidden;
`;
const Avatar = styled.img`
  width: 100%;
`;
const Actor = styled.div`
  min-width: 140px;
  width: 140px;
`;
export {
  Wrapper,
  GoBack,
  Details,
  Poster,
  Description,
  Title,
  Row,
  Date,
  Genres,
  Runtime,
  Popularity,
  Content,
  Overview,
  Starring,
  MovieActors,
  Avatar,
  Actor,
};
