import { IInitialState } from "utils/types";

export const initResult = {
  page: 1,
  results: [],
  total_pages: 0,
  total_results: 0,
};

const initialState: IInitialState = {
  loading: true,
  errors: false,
  searchResults: initResult,
  search: initResult,
  searchAutocomplete: initResult,
  query: "",
  page: 1,
  searchBy: { key: "movies", value: "movie" },
  movieDetails: null,
  actorDetauls: null,
  movieActors: null,
  similarMovie: null,
  actorDetails: null,
  actorMovies: null,
  filters: [
    { key: "actors", value: "person" },
    { key: "movies", value: "movie" },
    { key: "company", value: "company" },
    { key: "tv show", value: "tv" },
  ],
};

export default initialState;
