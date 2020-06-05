import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

import { IActorCast } from "utils/types";
import useFetch from "utils/useFetch";
import { useGlobalState } from "utils/context";
import { Dirived } from "components/styled";
import { GoBack } from "components";
import movie from "assets/icons/movie.svg";
import actor from "assets/icons/actor.svg";
import actress from "assets/icons/actress.svg";
import question from "assets/icons/question.svg";
import { MediaContainer } from "components/styled";
import {
  Loading,
  Details,
  Poster,
  Description,
  Title,
  Row,
  Content,
  Overview,
  PartScroll,
  PartList,
  Image,
  Item,
  ItemTitle,
  PartTitle,
  Genres,
} from "./styled";

export default function () {
  const { push } = useHistory();
  const { search } = useLocation();
  const { actorDetails, actorMovies, genresMovie } = useGlobalState();
  const [actorId, setActorId] = useState<string>("");
  const [cast, setCast] = useState<IActorCast[]>();

  const getActorDetails = useFetch(
    `person/${actorId}?api_key=<<api_key>>&language=en-US`,
    "actorDetails",
  );
  const getActorMovies = useFetch(
    `person/${actorId}/movie_credits?api_key=<<api_key>>&language=en-US`,
    "actorMovies",
  );

  useEffect(() => {
    if (search) {
      setActorId(search.slice(1));
      if (actorId) {
        getActorDetails();
        getActorMovies();
        window.scrollTo(0, 0);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, actorId]);

  useEffect(() => {
    if (actorMovies) {
      setCast(() =>
        actorMovies.cast.sort((a, b) => {
          if (a.popularity < b.popularity) {
            return 1;
          }
          if (a.popularity > b.popularity) {
            return -1;
          }
          return 0;
        }),
      );
    }
  }, [actorMovies]);

  const age = () => {
    if (!birthday) {
      return "";
    }
    const [year, month, day] = birthday.split("-");
    const curYear = new Date().getFullYear();
    const curMonth = new Date().getMonth() + 1;
    const curDay = new Date().getDate();
    let age: number = curYear - Number(year);

    if (curMonth > Number(month)) {
      return `${age} years`;
    }
    if (curDay >= Number(day)) {
      return `${age} years`;
    }
    return `${age - 1}  years`;
  };

  if (!actorDetails) {
    return <Loading>Loading...</Loading>;
  }

  const {
    name,
    profile_path,
    birthday,
    deathday,
    place_of_birth,
    biography,
    homepage,
    gender,
  } = actorDetails;

  const poster = profile_path
    ? `https://image.tmdb.org/t/p/w300/${profile_path}`
    : gender === 1
    ? actress
    : gender === 2
    ? actor
    : question;

  return (
    <>
      <GoBack />
      <Details>
        <Content>
          <Poster src={poster} />
          <Description>
            <Title>{`${name}`}</Title>
            {homepage ? (
              <p>
                Homepage: <strong>{homepage}</strong>
              </p>
            ) : null}
            <Row>
              {place_of_birth ? (
                <>
                  <div>{place_of_birth}</div>
                  <Dirived />
                </>
              ) : null}
              {birthday ? (
                <>
                  <div>{`${birthday.replace(/-/gi, "/")} ${
                    deathday ? `-${deathday.replace(/-/gi, "/")}` : ""
                  }`}</div>
                  <Dirived />
                </>
              ) : null}

              <div>{age()}</div>
            </Row>
            <br />
            {biography ? (
              <Overview>
                <p>Biography:</p>
                {biography}
              </Overview>
            ) : null}
          </Description>
        </Content>
      </Details>
      {cast && cast.length ? (
        <MediaContainer>
          <PartTitle>Starring:</PartTitle>
          <PartScroll>
            <PartList>
              {cast.map(({ id, credit_id, release_date, poster_path, title, vote_average, genre_ids }) => {
                const poster = poster_path
                  ? `https://image.tmdb.org/t/p/w200/${poster_path}`
                  : movie;
                const year = release_date ? `(${release_date.split("-")[0]})` : "";
                return (
                  <Item key={credit_id} onClick={() => push(`movie_details?${id}`)}>
                    <Image image={poster} />
                    <div>
                      <ItemTitle>{title}</ItemTitle>
                      <div>{year}</div>
                      {genre_ids.length ? (
                        <Genres>
                          {genre_ids.map((id, key) => {
                            if (!genresMovie) {
                              return null;
                            }
                            const name = genresMovie.genres.find((i) => i.id === id) || {
                              name: { name: "" },
                            };
                            return (
                              <span key={id}>{`${name.name}${
                                key + 1 < genre_ids.length ? "," : ""
                              } `}</span>
                            );
                          })}
                        </Genres>
                      ) : null}
                    </div>
                  </Item>
                );
              })}
            </PartList>
          </PartScroll>
        </MediaContainer>
      ) : null}
      {actorMovies?.crew && actorMovies?.crew.length ? (
        <MediaContainer>
          <PartTitle>Production:</PartTitle>
          <PartScroll>
            <PartList>
              {actorMovies?.crew.map(
                ({ id, credit_id, department, job, release_date, poster_path, title }) => {
                  const poster = poster_path
                    ? `https://image.tmdb.org/t/p/w200/${poster_path}`
                    : movie;
                  const year = release_date ? `(${release_date.split("-")[0]})` : "";
                  return (
                    <Item key={credit_id} onClick={() => push(`movie_details?${id}`)}>
                      <Image image={poster} />
                      <div>
                        <ItemTitle>{title}</ItemTitle>
                        <div>{year}</div>
                        <Genres>{job}</Genres>
                      </div>
                    </Item>
                  );
                },
              )}
            </PartList>
          </PartScroll>
        </MediaContainer>
      ) : null}
      <br />
    </>
  );
}
