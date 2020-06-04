import { ReactNode } from "react";

export type IProvider = {
  children: ReactNode;
};

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
  actorDetauls: any;
  movieActors: IMovieActors | null;
  similarMovie: ISimilarMovie | null;
  actorDetails: IActorDetails | null;
  actorMovies: any | null;
  filters: IDropDownValue[];
}

export interface IActorDetails {
  adult: false;
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
  | "actorDetauls"
  | "movieActors"
  | "similarMovie"
  | "actorDetails"
  | "actorMovies";

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
}

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
