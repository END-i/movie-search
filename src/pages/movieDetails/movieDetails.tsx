import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

import useFetch from "utils/useFetch";
import { useGlobalState } from "utils/context";
import t from "utils/translate";
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
  const { lang, movieDetails, movieActors, similarMovie } = useGlobalState();
  const [movieId, setMovieId] = useState("");

  const getMovieDetails = useFetch(
    `movie/${movieId}?api_key=<<api_key>>&language=${lang.value}`,
    "movieDetails",
  );
  const getActors = useFetch(`movie/${movieId}/credits?api_key=<<api_key>>`, "movieActors");
  const getSimilar = useFetch(
    `movie/${movieId}/similar?api_key=<<api_key>>&language=${lang.value}&page=1`,
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
  console.log("movieActors :>> ", movieActors);
  console.log("movieDetails :>> ", movieDetails);
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
  return (
    <>
      <GoBack />
      <Wrapper image={backdrop}>
        <Details>
          <Content>
            <Poster src={poster} />
            <Description>
              <Title>{title}</Title>
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
              <Popularity>{`${t("rating")}: ${vote_average}`}</Popularity>
              <Overview>
                <p>{t("overview")}:</p>
                {overview}
              </Overview>
            </Description>
          </Content>
        </Details>
      </Wrapper>
      <MediaContainer>
        <PartTitle>{t("starring")}:</PartTitle>
        <PartScroll>
          <PartList>
            {movieActors?.cast.slice(0, 50).map(({ name, id, profile_path, gender }) => {
              const avatar = profile_path
                ? `https://image.tmdb.org/t/p/w200/${profile_path}`
                : gender === 1
                ? actor
                : actress;
              return (
                <Item key={id}>
                  <Image src={avatar} />
                  <ItemTitle onClick={() => push(`actor_details?${id}`)}>{name}</ItemTitle>
                </Item>
              );
            })}
          </PartList>
        </PartScroll>
      </MediaContainer>
      <MediaContainer>
        <PartTitle>{t("similar movies")}:</PartTitle>
        <PartScroll>
          <PartList>
            {similarMovie?.results.map(({ poster_path, id, title }) => {
              const poster = poster_path ? `https://image.tmdb.org/t/p/w200/${poster_path}` : movie;
              return (
                <Item key={id}>
                  <Image src={poster} />
                  <ItemTitle onClick={() => push(`movie_details?${id}`)}>{title}</ItemTitle>
                </Item>
              );
            })}
          </PartList>
        </PartScroll>
      </MediaContainer>
      <br />
    </>
  );
}
