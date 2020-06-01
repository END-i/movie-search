import React from "react";
import { useHistory } from "react-router-dom";

import { FilmWrapper, Poster, Title, ReleaseDate, NoPoster } from "./styled";
import { IFilm } from "utils/types";

export default function ({ id, title, poster_path, release_date }: IFilm) {
  const image = `https://image.tmdb.org/t/p/w300${poster_path}`;
  const { push } = useHistory();

  const showDetails = () => {
    push(`movie_details?${id}`);
  };

  return (
    <FilmWrapper onClick={showDetails}>
      {poster_path ? <Poster src={image} /> : <NoPoster />}
      <Title>{title}</Title>
      <ReleaseDate>{new Date(release_date).getFullYear() || ""}</ReleaseDate>
    </FilmWrapper>
  );
}
