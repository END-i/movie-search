import React, { useState, useRef, useEffect } from "react";

import { useGlobalState, useDispatch } from "utils/context";
import useOutsideClick from "utils/useOutsideClick";
import useFetch from "utils/useFetch";
import translate from "utils/translate";
import {
  Wrapper,
  Container,
  Title,
  SearchWrapper,
  Input,
  Icon,
  Lang,
  LangList,
  CurrentLang,
  SearchResult,
  Clear,
} from "./styled";

const list = [
  { key: "en", value: "en-US" },
  { key: "ru", value: "ru-RU" },
];

export default function () {
  const { lang, search, query } = useGlobalState();
  const dispatch = useDispatch();
  const langRef = useRef<HTMLDivElement>(null);
  const searchResRef = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState<boolean>(false);
  const [searchFilmTitle, setSearchFilmTitle] = useState<string>("");

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
      searchMovie();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, lang]);

  useEffect(() => {
    if (searchFilmTitle) {
      searchAutocomplete();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchFilmTitle, lang]);

  const changeLang = (i: { key: string; value: string }) => {
    dispatch("lang", i);
    hide();
  };

  useOutsideClick(langRef, () => {
    if (show) {
      hide();
    }
  });

  useOutsideClick(langRef, () => {
    if (show) {
      hide();
    }
  });

  useOutsideClick(searchResRef, () => {
    if (search.results.length) {
      dispatch("search", { results: [] });
    }
  });

  const hide = () => setShow(false);

  const handleChange = ({ target: { value } }: { target: { value: string } }) => {
    setSearchFilmTitle(value);
  };

  const onKey = ({ key }: { key: string }) => {
    if (key === "Escape") {
      clear();
    }
    if (key === "Enter") {
      dispatch("query", searchFilmTitle);
      dispatch("search", { results: [] });
    }
  };

  const onSearchMovie = (title: string) => {
    dispatch("query", title);
    setSearchFilmTitle(title);
  };

  const clear = () => {
    dispatch("films", { results: [] });
    dispatch("search", { results: [] });
    dispatch("query", "");
    setSearchFilmTitle("");
  };

  const searchresultContent = () => {
    const { results } = search;
    if (results.length && results.length > 1) {
      return (
        <SearchResult>
          {results &&
            results.map(({ id, original_title }) => (
              <div key={id} onClick={() => onSearchMovie(original_title)}>
                {original_title}
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
            placeholder={translate("search")}
            value={searchFilmTitle}
            onChange={handleChange}
            onKeyDown={onKey}
          />
          {searchresultContent()}
          <Clear onClick={clear} />
        </SearchWrapper>
        <Lang ref={langRef}>
          <CurrentLang onClick={() => setShow((prev) => !prev)}>{lang.key}</CurrentLang>
          <LangList show={show}>
            {list.map(({ value, key }) => (
              <div key={key} onClick={() => changeLang({ value, key })}>
                {key}
              </div>
            ))}
          </LangList>
        </Lang>
      </Container>
    </Wrapper>
  );
}
