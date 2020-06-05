import React, { useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";

import { IChildrenProp } from "utils/types";
import useFetch from "utils/useFetch";
import initialState from "utils/context/initialState";
import { homePath } from "pages/_routes/routesList";
import { Header, Footer } from "components";
import { Wrapper } from "./styled";
import { useDispatch } from "utils/context";

export default function ({ children }: IChildrenProp) {
  const { search } = useLocation();
  const { push } = useHistory();
  const dispatch = useDispatch();

  const getMovieGenres = useFetch(
    "genre/movie/list?api_key=<<api_key>>&language=en-US",
    "genresMovie",
  );
  const getTvGenres = useFetch("genre/tv/list?api_key=<<api_key>>&language=en-US", "genresTv");

  useEffect(() => {
    if (search) {
      const param: { [key: string]: string | number } = {
        query: initialState.query,
        page: initialState.page,
      };

      search
        .slice(1)
        .split("&")
        .forEach((el) => {
          const [name, value] = el.split("=");
          if ("page") {
            param[name] = Number(value);
          }
          if (name === "query") {
            param[name] = value;
          }
          if (name === "searchBy") {
            const searchBy = initialState.filters.find((a) => a.value === value);
            if (searchBy) {
              dispatch("searchBy", searchBy);
            } else {
              push(homePath);
            }
          }
        });
      dispatch("query", param.query);
      dispatch("page", param.page);
    } else {
      dispatch("query", initialState.query);
      dispatch("page", initialState.page);
      dispatch("movieActors", initialState.movieActors);
      dispatch("actorMovies", initialState.actorMovies);
      dispatch("search", initialState.search);
      dispatch("searchAutocomplete", initialState.searchAutocomplete);
      dispatch("searchResults", initialState.searchResults);
      dispatch("similarMovie", initialState.similarMovie);
      dispatch("actorDetails", initialState.actorDetails);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  useEffect(() => {
    getMovieGenres();
    getTvGenres();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Wrapper>
      <Header />
      {children}
      <Footer />
    </Wrapper>
  );
}
