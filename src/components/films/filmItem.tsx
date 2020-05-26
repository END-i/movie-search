import React from "react";

import { FilmWrapper, Poster, Title, ReleaseDate, NoPoster } from "./styled";
import { IFilm } from "utils/types";

export default function ({ title, poster_path, release_date }: IFilm) {

  const image = `https://image.tmdb.org/t/p/w300${poster_path}`;
  return (
    <FilmWrapper>
      {poster_path ? <Poster src={image} /> : <NoPoster />}
      <Title>{title}</Title>
      <ReleaseDate>{new Date(release_date).getFullYear() || ''}</ReleaseDate>
    </FilmWrapper>
  );
}
