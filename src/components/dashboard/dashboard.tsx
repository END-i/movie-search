import React, { useEffect } from "react";

import { useGlobalState } from "utils/context";
import useFetch from "utils/useFetch";
import { Header, Films, Footer } from "components";
import { Wrapper } from "./styled";

export default function () {
  const { lang } = useGlobalState();
  const getGenre = useFetch(`genre/movie/list?api_key=<<api_key>>&language=${lang.value}`, "genre");

  useEffect(() => {
    getGenre();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Wrapper>
      <Header />
      <Films />
      <Footer />
    </Wrapper>
  );
}
