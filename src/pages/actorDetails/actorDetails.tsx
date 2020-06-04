import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

import useFetch from "utils/useFetch";
import { useGlobalState } from "utils/context";
import { Dirived } from "components/styled";
import { GoBack } from "components";
import { ReactComponent as BackIcon } from "assets/icons/back.svg";
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
  Genres,
  Runtime,
  Popularity,
  Content,
  Overview,
} from "./styled";

export default function () {
  const { push } = useHistory();
  const { search } = useLocation();
  const { actorDetails, actorMovies } = useGlobalState();
  const [actorId, setActorId] = useState("");

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

  console.log("actorDetails :>> ", actorDetails);
  console.log("actorMovies :>> ", actorMovies);
  if (!actorDetails) {
    return <Loading>Loading...</Loading>;
  }

  const { name, profile_path, birthday, deathday, biography, homepage } = actorDetails;

  const poster = profile_path ? `https://image.tmdb.org/t/p/w300/${profile_path}` : movie;

  return (
    <>
      <GoBack />
      <Details>
        <Content>
          <Poster src={poster} />
          <Description>
            <Title>{`${name}`}</Title>
            <p>
              Homepage: <strong>{homepage}</strong>
            </p>
            <Row>
              <div>{`${birthday.replace(/-/gi, "/")} ${
                deathday ? `-${deathday.replace(/-/gi, "/")}` : ""
              }`}</div>
              <Dirived />
              <div>{age()}</div>
              {/* <Date>{release_date.replace(/-/gi, "/")}</Date>
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
                ) : null} */}
            </Row>
            <br />
            <Overview>
              <p>Biography:</p>
              {biography}
            </Overview>
          </Description>
        </Content>
      </Details>
    </>
  );
}
