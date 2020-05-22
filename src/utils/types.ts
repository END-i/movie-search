import { ReactNode } from "react";

export type IProvider = {
  children: ReactNode;
};

export interface IInitialState {
  loading: boolean;
  errors: boolean;
  films: IFilms;
  genre: any;
  lang: ILang;
  search: IFilms;
  searchAutocomplete: IFilms;
  query: string;
}

export type IDispatch = {
  type: IType;
  value: any;
};
export type IType =
  | "errors"
  | "loading"
  | "films"
  | "genre"
  | "lang"
  | "search"
  | "searchAutocomplete"
  | "query";

export interface IFilms {
  page: number;
  results: IFilm[];
  total_pages: number;
  total_results: number;
}
export interface IFilm {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface ILang {
  key: string;
  value: string;
}
