import React from "react";
import { useHistory } from "react-router-dom";

import { FilmWrapper, Poster, Title, ReleaseDate } from "./styled";
import { ItemProps } from "utils/types";
import { useGlobalState } from "utils/context";
import movie from "assets/icons/movie.svg";
import actor from "assets/icons/actor.svg";
import actress from "assets/icons/actress.svg";
import question from "assets/icons/question.svg";
import television from "assets/icons/television.svg";
import corporate from "assets/icons/corporate.svg";

export default function (props: ItemProps) {
  const {
    searchBy: { value },
  } = useGlobalState();
  const { push } = useHistory();

  if (value === "person") {
    const { id, name, profile_path, gender } = props;
    const image = profile_path
      ? `https://image.tmdb.org/t/p/w200${profile_path}`
      : gender === 1
      ? actress
      : gender === 2
      ? actor
      : question;

    return (
      <FilmWrapper onClick={() => push(`actor_details?${id}`)}>
        <Poster image={image} cover={!Boolean(profile_path)} />
        <Title>{name}</Title>
      </FilmWrapper>
    );
  }

  if (value === "company") {
    const { name, logo_path } = props;
    const image = logo_path ? `https://image.tmdb.org/t/p/w200${logo_path}` : corporate;

    return (
      <FilmWrapper onClick={() => {}}>
        <Poster image={image} cover={true} />
        <Title>{name}</Title>
      </FilmWrapper>
    );
  }

  if (value === "tv") {
    const { name, poster_path, first_air_date } = props;
    const image = poster_path ? `https://image.tmdb.org/t/p/w200${poster_path}` : television;

    return (
      <FilmWrapper onClick={() => {}}>
        <Poster image={image} cover={!Boolean(poster_path)} />
        <Title>{name}</Title>
        {first_air_date ? (
          <ReleaseDate>First day: {first_air_date.replace(/-/g, "/") || ""}</ReleaseDate>
        ) : null}
      </FilmWrapper>
    );
  }

  const { id, title, poster_path, release_date } = props;
  const image = poster_path ? `https://image.tmdb.org/t/p/w300${poster_path}` : movie;

  return (
    <FilmWrapper onClick={() => push(`movie_details?${id}`)}>
      <Poster image={image} cover={!Boolean(poster_path)} />
      <Title>{title}</Title>
      <ReleaseDate>{new Date(release_date).getFullYear() || ""}</ReleaseDate>
    </FilmWrapper>
  );
}
