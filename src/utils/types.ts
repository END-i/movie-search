import { ReactNode } from "react";

export type IProvider = {
  children: ReactNode;
};

export type IDispatch = {
  type: IType;
  value: any;
};
export type IType =
  | "errors"
  | "loading"
  | "searchResults"
  | "search"
  | "searchAutocomplete"
  | "query"
  | "page"
  | "searchBy"
  | "movieDetails"
  | "movieActors"
  | "similarMovie"
  | "actorDetails"
  | "actorMovies"
  | "genresMovie"
  | "genresTv";

export interface IInitialState {
  loading: boolean;
  errors: boolean;
  searchResults: IResults;
  search: IResults;
  searchAutocomplete: IResults;
  query: string;
  page: number;
  searchBy: IDropDownCurrent;
  movieDetails: IMovieDetails | null;
  movieActors: IMovieActors | null;
  similarMovie: ISimilarMovie | null;
  actorDetails: IActorDetails | null;
  actorMovies: IActorMovies | null;
  filters: IDropDownValue[];
  genresMovie: IGenres | null;
  genresTv: IGenres | null;
}

export interface IGenres {
  genres: {
    id: number;
    name: string;
  }[];
}
export interface IActorMovies {
  crew: IActorCrew[];
  cast: IActorCast[];
  id: number;
}
export interface IActorCast {
  adult: boolean;
  backdrop_path: string;
  character: string;
  credit_id: string;
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
export interface IActorCrew {
  adult: boolean;
  backdrop_path: string;
  credit_id: string;
  department: string;
  genre_ids: number[];
  id: number;
  job: string;
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
export interface IActorDetails {
  adult: boolean;
  also_known_as: string[];
  biography: string;
  birthday: string;
  deathday: string | null;
  gender: number;
  homepage: string;
  id: number;
  imdb_id: string;
  known_for_department: string;
  name: string;
  place_of_birth: string;
  popularity: number;
  profile_path: string;
}

export interface ISimilarMovie {
  page: number;
  total_pages: number;
  total_results: number;
  results: {
    adult: false;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    poster_path: string;
    release_date: string;
    title: string;
    video: false;
    vote_average: number;
    vote_count: number;
    popularity: number;
  }[];
}

export interface IResults {
  page: number;
  results: IResult[];
  total_pages: number;
  total_results: number;
}
export type ItemProps = IResult | any;
export interface IResult {
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

  gender: number;
  known_for: number[];
  known_for_department: string;
  name: string;
  profile_path: string;
}
export interface IPersonResult {}
export interface IDropDownCurrent {
  key: string;
  value: string;
}

export interface IRoute {
  path?: string;
  Component: () => JSX.Element;
}

export interface IRouteWrapper extends IRoute {
  isAuth: boolean;
  redirectPathname: string;
  publicRoutes?: boolean;
}

export type IChildrenProp = {
  children: ReactNode;
};

export interface IMovieDetails {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: null;
  budget: number;
  genres: {
    id: number;
    name: string;
  }[];
  homepage: string;
  id: number;
  imdb_id: null;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: {
    name: string;
    id: number;
    logo_path: string | null;
    origin_country: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: {
    iso_639_1: string;
    name: string;
  }[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface IMovieActors {
  id: number;
  cast: {
    cast_id: number;
    character: string;
    credit_id: string;
    gender: number;
    id: number;
    name: string;
    order: number;
    profile_path: string | null;
  }[];
  crew: {
    credit_id: string;
    department: string;
    gender: number;
    id: number;
    job: string;
    name: string;
    profile_path: string | null;
  }[];
}

export interface IDropDownValue {
  value: string;
  key: string;
}

export interface ISearchAreaProps {
  setSearchFilmTitle: React.Dispatch<React.SetStateAction<string>>;
  searchFilmTitle: string;
  onSearchMovie: (title: string) => void;
  clear: () => void;
}
