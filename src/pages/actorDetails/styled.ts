import styled from "styled-components";

import { MediaContainer } from "components/styled";
import { white2, shadow01 } from "assets/colors";

const Loading = styled.div`
  text-align: center;
  padding: 100px 0;
  font-size: 30;
`;

const Wrapper = styled.div<{ image: string }>`
  background: ${({ image }) => `url("${image}") no-repeat center`};
  background-size: cover;
  height: auto;
  width: auto;
  @media only screen and (max-width: 480px) {
    width: fit-content;
  }
`;
const Details = styled.div`
  background: linear-gradient(
    to right,
    rgba(11.76%, 15.29%, 17.25%, 1) 150px,
    rgba(19.61%, 21.96%, 23.53%, 0.84) 100%
  );
  height: auto;
  width: auto;
  @media only screen and (max-width: 480px) {
    width: fit-content;
  }
`;

const Poster = styled.img`
  margin: 0 auto;
  border-radius: 10px;
  width: 100%;
  max-width: 300px;
  @media only screen and (max-width: 768px) {
    max-width: 200px;
    margin: 0 auto;
  }
  @media only screen and (max-width: 480px) {
    max-width: 200px;
  }
`;
const Description = styled.div`
  color: #fff;
  /* padding-top: 50px; */
  @media only screen and (max-width: 768px) {
    padding-top: 0;
  }
  @media only screen and (max-width: 480px) {
    padding-top: 20px;
  }
`;
const Title = styled.h2`
  width: 100%;
  margin: 0;
  padding: 0;
  font-size: 2.2rem;
  @media only screen and (max-width: 600px) {
    text-align: center;
  }
`;
const Row = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;
const Date = styled.div``;
const Genres = styled.div`
  font-weight: 300;
  margin-top: 5px;
`;
const Runtime = styled.div``;
const Popularity = styled.div`
  font-size: 1.3em;
  margin: 15px 0;
`;
const Content = styled(MediaContainer)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 20px;
  @media only screen and (max-width: 600px) {
    display: flex;
    flex-direction: column;
  }
`;
const Overview = styled.div`
  white-space: pre-line;
  p {
    font-size: 1.3em;
    margin: 0 0 5px;
  }
`;

const PartScroll = styled.div`
  overflow: auto;
`;
const PartList = styled.div`
  display: flex;
  width: fit-content;
`;
const Image = styled.div<{ image: string }>`
  background: ${({ image }) => `url("${image}") no-repeat center`};
  width: 200px;
  background-size: contain;
  margin-right: 5px;
`;
const Item = styled.div`
  box-shadow: 0 2px 8px ${shadow01};
  border: 1px solid ${white2};
  padding: 10px;
  margin: 0 10px 10px;
  display: flex;
  width: 350px;
  min-height: 300px;
  box-sizing: border-box;
  cursor: pointer;
`;
const ItemTitle = styled.div`
  margin-top: auto;
  cursor: pointer;
  margin: 10px 0 0;
  font-weight: 600;
  &:hover {
    text-decoration: underline;
  }
`;
const PartTitle = styled.p`
  font-weight: 600;
  font-size: 1.5em;
  text-decoration: underline;
  margin: 10px 20px;
`;

export {
  Loading,
  Wrapper,
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
  PartScroll,
  PartList,
  Image,
  Item,
  ItemTitle,
  PartTitle,
};
