import { IInitialState } from "utils/types";

export const initFilm = {
  page: 1,
  results: [],
  total_pages: 0,
  total_results: 0,
};

const initialState: IInitialState = {
  loading: true,
  errors: false,
  films: initFilm,
  lang: { key: "ru", value: "ru-RU" },
  search: initFilm,
  searchAutocomplete: initFilm,
  query: "",
  page: 1,
  searchBy: { key: "movies", value: "movies" },
  movieDetails: null,
  actorDetauls: null,
  movieActors: null,
};

export default initialState;
