import React, { useState, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { homePath } from "pages/_routes/routesList";
import { DropDown } from "components";
import { useGlobalState, useDispatch } from "utils/context";
import useOutsideClick from "utils/useOutsideClick";
import useFetch from "utils/useFetch";
import { IDropDownValue } from "utils/types";
import { Wrapper, Container, Title, Filter } from "./styled";
import SearchArea from "./searchArea";

export default function () {
  const { search, query, searchBy, filters } = useGlobalState();
  const dispatch = useDispatch();
  const { push } = useHistory();
  const searchResRef = useRef<HTMLDivElement>(null);
  const [searchFilmTitle, setSearchFilmTitle] = useState<string>(query);

  const searchMovie = useFetch(
    `search/${searchBy.value}?api_key=<<api_key>>&language=en-US&query=${query}&page=1&include_adult=false`,
    "searchResults",
  );

  useEffect(() => {
    setSearchFilmTitle(query);
  }, [query]);

  useEffect(() => {
    if (query) {
      searchMovie();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  useOutsideClick(searchResRef, () => {
    if (search.results.length) {
      dispatch("search", { results: [] });
    }
  });

  const onSearchMovie = (title: string) => {
    dispatch("query", title);
    setSearchFilmTitle(title);
    dispatch("search", { results: [] });
  };

  const clear = () => {
    dispatch("searchResults", { results: [] });
    dispatch("search", { results: [] });
    dispatch("query", "");
    setSearchFilmTitle("");
  };

  const dropDownChange = (i: IDropDownValue) => {
    dispatch("searchBy", i);
    push(homePath);
    clear();
  };
  
  return (
    <Wrapper>
      <Container>
        <Title onClick={() => push(homePath)}>TMDB</Title>
        <SearchArea {...{ onSearchMovie, setSearchFilmTitle, searchFilmTitle, clear }} />
        <Filter>
          Search by:
          <DropDown options={filters} callback={dropDownChange} current={searchBy} />
        </Filter>
      </Container>
    </Wrapper>
  );
}
