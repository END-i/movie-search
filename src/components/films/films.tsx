import React, { useEffect, useRef, useState } from "react";

import { useGlobalState, useDispatch } from "utils/context";
import { initFilm } from "utils/context/initialState";
import useFetch from "utils/useFetch";
import t from "utils/translate";
import { IFilm, IFilms } from "utils/types";
import { Wrapper, NoFilms, More, FilmsGrid } from "./styled";
import { ReactComponent as CircleIcon } from "assets/icons/circle.svg";
import Film from "./filmItem";

export default function () {
  const { films, query, lang, page } = useGlobalState();
  const dispatch = useDispatch();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [filmList, setFilmList] = useState<IFilms>(initFilm);

  const searchMovie = useFetch(
    `search/movie?api_key=<<api_key>>&language=${lang.value}&query=${query}&page=${page}&include_adult=false`,
    "films",
  );

  useEffect(() => {
    if (query && page > 1) {
      searchMovie();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    dispatch("page", 1);
    setFilmList(initFilm);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  useEffect(() => {
    if (!filmList.results.length) {
      setFilmList(films);
    } else {
      setFilmList((prev) => ({ ...films, results: [...prev.results, ...films.results] }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [films]);

  const changePage = () => {
    const p: number = films.total_pages <= page ? page : page + 1;
    dispatch("page", p);
  };

  const Content = () => {
    const { results } = filmList;
    if (results && results.length) {
      return (
        <>
          <FilmsGrid>
            {results.map((props: IFilm, key: number) => (
              <Film key={key} {...props} />
            ))}
          </FilmsGrid>
          {films.total_pages > page ? (
            <More onClick={changePage}>
              <CircleIcon />
              {t("more")}
            </More>
          ) : null}
        </>
      );
    }

    if (!query) {
      return <NoFilms>{t("start search")}</NoFilms>;
    }

    return <NoFilms>{t("no matched")}</NoFilms>;
  };

  return (
    <Wrapper ref={wrapperRef}>
      <Content />
    </Wrapper>
  );
}
