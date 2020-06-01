import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

import useFetch from "utils/useFetch";
import { useGlobalState } from "utils/context";
import t from "utils/translate";
import { Dirived } from "components/styled";
import {
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
  Actor
} from "./styled";

export default function () {
  const { goBack } = useHistory();
  const { search } = useLocation();
  const { lang, movieDetails, movieActors } = useGlobalState();
  const [movieId, setMovieId] = useState("");

  const getMovieDetails = useFetch(
    `movie/${movieId}?api_key=<<api_key>>&language=${lang.value}`,
    "movieDetails",
  );
  const getActors = useFetch(`movie/${movieId}/credits?api_key=<<api_key>>`, "movieActors");

  useEffect(() => {
    if (search) {
      !movieId && setMovieId(search.slice(1));
      if (movieId) {
        getMovieDetails();
        getActors();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, movieId]);

  console.log("movieDetails :>> ", movieDetails);
  if (!movieDetails) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "100px 0",
          fontSize: 30,
        }}
      >
        Loading...
      </div>
    );
  }

  const {
    vote_average,
    backdrop_path,
    genres,
    title,
    poster_path,
    release_date,
    runtime,
    overview,
  } = movieDetails;
  const backdrop = `https://image.tmdb.org/t/p/original/${backdrop_path}`;
  const poster = `https://image.tmdb.org/t/p/w300/${poster_path}`;
  return (
    <>
      <GoBack onClick={goBack} />
      <Wrapper image={backdrop}>
        <Details>
          <Content>
            <Poster src={poster} />
            <Description>
              <Title>{title}</Title>
              <Row>
                <Date>{release_date.replace(/-/gi, "/")}</Date>
                <Dirived />
                <Genres>
                  {genres.map(({ name }, key) => `${name}${key + 1 < genres.length ? ", " : ""}`)}
                </Genres>
                <Dirived />
                <Runtime>{`${runtime} min`}</Runtime>
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
      <Starring>
        <p>{t("starring")}</p>
        <MovieActors>
          {movieActors?.cast.map(({ name, id, profile_path }) => {
            const avatar = `https://image.tmdb.org/t/p/w200/${profile_path}`;

            return (
              <Actor key={id}>
                {name}
                <Avatar src={avatar} />
              </Actor>
            );
          })}
        </MovieActors>
      </Starring>
    </>
  );
}
