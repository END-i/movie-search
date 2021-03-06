import React, { useRef } from "react";
import { useHistory } from "react-router-dom";

import { homePath } from "pages/_routes/routesList";
import { useDispatch, useGlobalState } from "utils/context";
import useFetch from "utils/useFetch";
import { ISearchAreaProps } from "utils/types";
import { SearchWrapper, Input, Icon, SearchResult, Clear } from "./styled";

export default function ({
  setSearchFilmTitle,
  searchFilmTitle,
  onSearchMovie,
  clear,
}: ISearchAreaProps) {
  const searchResRef = useRef<HTMLDivElement>(null);
  const { push } = useHistory();
  const dispatch = useDispatch();
  const { search, searchBy } = useGlobalState();

  const searchAutocomplete = useFetch(
    `search/${searchBy.value}?api_key=<<api_key>>&language=en-US&query=${searchFilmTitle}&page=1&include_adult=false`,
    "search",
  );

  const handleChange = ({ target: { value } }: { target: { value: string } }) => {
    setSearchFilmTitle(value);
  };

  const onKey = ({ key }: { key: string }) => {
    if (key === "Escape") {
      dispatch("search", { results: [] });
      return;
    }
    if (key === "Enter") {
      dispatch("query", searchFilmTitle);
      dispatch("search", { results: [] });

      push(`${homePath}?query=${searchFilmTitle}&page=1&searchBy=${searchBy.value}`);
      return;
    }
    if (searchFilmTitle) {
      searchAutocomplete();
    } else {
      dispatch("search", { results: [] });
    }
  };

  const searchresultContent = () => {
    const { results } = search;
    if (results && results.length > 1) {
      return (
        <SearchResult>
          {results.slice(0, 5).map(({ id, title, name }) => (
            <div key={id} onClick={() => onSearchMovie(searchBy.value === "movie" ? title : name)}>
              {title || name}
            </div>
          ))}
        </SearchResult>
      );
    }
    return null;
  };

  return (
    <SearchWrapper ref={searchResRef}>
      <Icon />
      <Input
        placeholder="Search"
        value={searchFilmTitle.replace(/%20/gi, " ") || ""}
        onChange={handleChange}
        onKeyUp={onKey}
        onFocus={() => searchFilmTitle && searchAutocomplete}
      />
      {searchresultContent()}
      <Clear onClick={clear} />
    </SearchWrapper>
  );
}
