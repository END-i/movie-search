import React, { useEffect, useRef, useState } from "react";

import { useGlobalState, useDispatch } from "utils/context";
import { initResult } from "utils/context/initialState";
import useFetch from "utils/useFetch";
import { IResult, IResults } from "utils/types";
import { Wrapper, NoFilms, More, FilmsGrid } from "./styled";
import { ReactComponent as CircleIcon } from "assets/icons/circle.svg";
import Item from "./item";

export default function () {
  const { searchResults, query, page, searchBy } = useGlobalState();
  const dispatch = useDispatch();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [resultList, setResultList] = useState<IResults>(initResult);

  const searchMovie = useFetch(
    `search/${searchBy.value}?api_key=<<api_key>>&language=en-US&query=${query}&page=${page}&include_adult=false`,
    "searchResults",
  );

  useEffect(() => {
    if (query && page > 1) {
      searchMovie();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    dispatch("page", 1);
    setResultList(initResult);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  useEffect(() => {
    if (page === 1) {
      setResultList(searchResults);
    } else {
      setResultList((prev) => ({
        ...searchResults,
        results: [...prev.results, ...searchResults.results],
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchResults]);

  const changePage = () => {
    const p: number = searchResults.total_pages <= page ? page : page + 1;
    dispatch("page", p);
  };

  const Content = () => {
    const { results } = resultList;
    if (results && results.length) {
      return (
        <>
          <FilmsGrid>
            {results.map((props: IResult, key: number) => (
              <Item key={key} {...props} />
            ))}
          </FilmsGrid>
          {searchResults.total_pages > page ? (
            <More onClick={changePage}>
              <CircleIcon />
              Show 20 more
            </More>
          ) : null}
        </>
      );
    }

    if (!query) {
      return <NoFilms>Enter the name of the movie in the search field to start the.</NoFilms>;
    }

    return <NoFilms>There are no movies that matched your query.</NoFilms>;
  };

  return (
    <Wrapper ref={wrapperRef}>
      <Content />
    </Wrapper>
  );
}
