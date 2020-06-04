import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

import useFetch from "utils/useFetch";
import { useGlobalState } from "utils/context";
import { Dirived } from "components/styled";
import { GoBack } from "components";
import actor from "assets/icons/actor.svg";
import actress from "assets/icons/actress.svg";
import movie from "assets/icons/movie.svg";
import { MediaContainer } from "components/styled";
import {
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
} from "./styled";

export default function () {
  const { push } = useHistory();
  const { search } = useLocation();
  const { movieDetails, movieActors, similarMovie } = useGlobalState();
  const [movieId, setMovieId] = useState("");

  const getMovieDetails = useFetch(
    `movie/${movieId}?api_key=<<api_key>>&language=en-US`,
    "movieDetails",
  );
  const getActors = useFetch(`movie/${movieId}/credits?api_key=<<api_key>>`, "movieActors");
  const getSimilar = useFetch(
    `movie/${movieId}/similar?api_key=<<api_key>>&language=en-US&page=1`,
    "similarMovie",
  );

  useEffect(() => {
    if (search) {
      setMovieId(search.slice(1));
      if (movieId) {
        getMovieDetails();
        getActors();
        getSimilar();
        window.scrollTo(0, 0);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, movieId]);

  if (!movieDetails) {
    return <Loading>Loading...</Loading>;
  }

  const {
    vote_average,
    backdrop_path,
    genres,
    title,
    original_title,
    poster_path,
    release_date,
    runtime,
    overview,
    production_countries,
  } = movieDetails;

  const backdrop = `https://image.tmdb.org/t/p/original/${backdrop_path}`;
  const poster = poster_path ? `https://image.tmdb.org/t/p/w300/${poster_path}` : movie;
  const year = release_date ? `(${release_date.split("-")[0]})` : "";
  return (
    <>
      <GoBack />
      <Wrapper image={backdrop}>
        <Details>
          <Content>
            <Poster src={poster} />
            <Description>
              <Title>{`${title} ${year}`}</Title>
              <p>({original_title})</p>
              <Row>
                <Date>{release_date.replace(/-/gi, "/")}</Date>
                {production_countries.length ? (
                  <>
                    <Dirived />
                    <Genres>
                      {production_countries.map(
                        ({ name }, key) =>
                          `${name}${key + 1 < production_countries.length ? ", " : ""}`,
                      )}
                    </Genres>
                  </>
                ) : null}
                <Dirived />
                <Genres>
                  {genres.map(({ name }, key) => `${name}${key + 1 < genres.length ? ", " : ""}`)}
                </Genres>
                {runtime ? (
                  <>
                    <Dirived />
                    <Runtime>{`${runtime} min`}</Runtime>
                  </>
                ) : null}
              </Row>
              <Popularity>{`Rating: ${vote_average}`}</Popularity>
              <Overview>
                <p>Overview:</p>
                {overview}
              </Overview>
            </Description>
          </Content>
        </Details>
      </Wrapper>
      {movieActors?.cast && movieActors?.cast.length ? (
        <MediaContainer>
          <PartTitle>Starring:</PartTitle>
          <PartScroll>
            <PartList>
              {movieActors?.cast
                .slice(0, 50)
                .map(({ cast_id, id, name, character, profile_path, gender }) => {
                  const avatar = profile_path
                    ? `https://image.tmdb.org/t/p/w200/${profile_path}`
                    : gender === 1
                    ? actor
                    : actress;
                  return (
                    <Item key={cast_id} onClick={() => push(`actor_details?${id}`)}>
                      <Image image={avatar} />
                      <ItemTitle>{name}</ItemTitle>
                      <div>({character})</div>
                    </Item>
                  );
                })}
            </PartList>
          </PartScroll>
        </MediaContainer>
      ) : null}
      {movieActors?.crew && movieActors?.crew.length ? (
        <MediaContainer>
          <PartTitle>Production:</PartTitle>
          <PartScroll>
            <PartList>
              {movieActors?.crew
                .slice(0, 50)
                .map(({ name, credit_id, id, job, profile_path, gender }) => {
                  const avatar = profile_path
                    ? `https://image.tmdb.org/t/p/w200/${profile_path}`
                    : gender === 1
                    ? actor
                    : actress;
                  return (
                    <Item key={credit_id} onClick={() => push(`actor_details?${id}`)}>
                      <Image image={avatar} />
                      <ItemTitle>{name}</ItemTitle>
                      <div>({job})</div>
                    </Item>
                  );
                })}
            </PartList>
          </PartScroll>
        </MediaContainer>
      ) : null}
      {similarMovie?.results && similarMovie?.results.length ? (
        <MediaContainer>
          <PartTitle>Similar movies:</PartTitle>
          <PartScroll>
            <PartList>
              {similarMovie?.results.map(({ id, release_date, poster_path, title }) => {
                const poster = poster_path
                  ? `https://image.tmdb.org/t/p/w200/${poster_path}`
                  : movie;
                const year = release_date ? `(${release_date.split("-")[0]})` : "";
                return (
                  <Item key={id} onClick={() => push(`movie_details?${id}`)}>
                    <Image image={poster} />
                    <ItemTitle>{title}</ItemTitle>
                    <div>{year}</div>
                  </Item>
                );
              })}
            </PartList>
          </PartScroll>
        </MediaContainer>
      ) : null}
      <br />
    </>
  );
}
