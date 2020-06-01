import React, { useState, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { DropDown } from "components";
import { useGlobalState, useDispatch } from "utils/context";
import useOutsideClick from "utils/useOutsideClick";
import useFetch from "utils/useFetch";
import t from "utils/translate";
import {
  Wrapper,
  Container,
  Title,
  SearchWrapper,
  Input,
  Icon,
  SearchResult,
  Clear,
} from "./styled";

const list = [
  { key: "en", value: "en-US" },
  { key: "ru", value: "ru-RU" },
];

const filters = [
  { key: "actors", value: "actors" },
  { key: "movies", value: "movies" },
];

export default function () {
  const { lang, search, query, searchBy } = useGlobalState();
  const dispatch = useDispatch();
  const { push } = useHistory();
  const searchResRef = useRef<HTMLDivElement>(null);
  const [searchFilmTitle, setSearchFilmTitle] = useState<string>(query);

  const searchAutocomplete = useFetch(
    `search/movie?api_key=<<api_key>>&language=${lang.value}&query=${searchFilmTitle}&page=1&include_adult=false`,
    "search",
  );
  const searchMovie = useFetch(
    `search/movie?api_key=<<api_key>>&language=${lang.value}&query=${query}&page=1&include_adult=false`,
    "films",
  );

  useEffect(() => {
    if (query) {
      setSearchFilmTitle(query);
    }
  }, [query]);

  useEffect(() => {
    if (query) {
      searchMovie();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, lang]);

  useOutsideClick(searchResRef, () => {
    if (search.results.length) {
      dispatch("search", { results: [] });
    }
  });

  const handleChange = ({ target: { value } }: { target: { value: string } }) => {
    setSearchFilmTitle(value);
  };

  const onKey = ({ key }: { key: string }) => {
    if (key === "Escape") {
      clear();
      return;
    }
    if (key === "Enter") {
      dispatch("query", searchFilmTitle);
      dispatch("search", { results: [] });
      push(`/home?lang=${lang.value}&query=${searchFilmTitle}&page=1&searchBy=${searchBy.value}`);
      return;
    }
    if (searchFilmTitle) {
      searchAutocomplete();
    } else {
      dispatch("search", { results: [] });
    }
  };

  const onSearchMovie = (title: string) => {
    dispatch("query", title);
    setSearchFilmTitle(title);
    dispatch("search", { results: [] });
  };

  const clear = () => {
    dispatch("films", { results: [] });
    dispatch("search", { results: [] });
    dispatch("query", "");
    setSearchFilmTitle("");
  };

  const searchresultContent = () => {
    const { results } = search;
    if (results && results.length > 1) {
      return (
        <SearchResult>
          {results &&
            results.map(({ id, title }) => (
              <div key={id} onClick={() => onSearchMovie(title)}>
                {title}
              </div>
            ))}
        </SearchResult>
      );
    }
    return null;
  };

  return (
    <Wrapper>
      <Container>
        <Title>TMDB</Title>
        <SearchWrapper ref={searchResRef}>
          <Icon />
          <Input
            placeholder={t("search")}
            value={searchFilmTitle}
            onChange={handleChange}
            onKeyDown={onKey}
            onFocus={() => searchFilmTitle && searchAutocomplete}
          />
          {searchresultContent()}
          <Clear onClick={clear} />
        </SearchWrapper>
        <DropDown options={list} callback={(i) => dispatch("lang", i)} current={lang} />
        <DropDown options={filters} callback={(i) => dispatch("searchBy", i)} current={searchBy} />
      </Container>
    </Wrapper>
  );
}
