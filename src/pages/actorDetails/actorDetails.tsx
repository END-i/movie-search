import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

import useFetch from "utils/useFetch";
import { useGlobalState } from "utils/context";
import t from "utils/translate";
import { Dirived } from "components/styled";
import { GoBack } from "components";
import { ReactComponent as BackIcon } from "assets/icons/back.svg";
import actor from "assets/icons/actor.svg";
import actress from "assets/icons/actress.svg";
import movie from "assets/icons/movie.svg";
import { MediaContainer } from "components/styled";
import { Loading } from "./styled";

export default function () {
  const { push } = useHistory();
  const { search } = useLocation();
  const { lang, actorDetails } = useGlobalState();
  const [actorId, setActorId] = useState("");

  const getActorDetails = useFetch(
    `person/${actorId}?api_key=<<api_key>>&language=${lang.value}`,
    "actorDetails",
  );
  const getActorMovies = useFetch(
    `person/${actorId}?api_key=<<api_key>>&language=${lang.value}`,
    "actorMovies",
  );

  useEffect(() => {
    if (search) {
      setActorId(search.slice(1));
      if (actorId) {
        getActorDetails();
        getActorMovies();
        window.scrollTo(0, 0);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, actorId]);

  console.log("actorDetails :>> ", actorDetails);
  if (!actorDetails) {
    return <Loading>Loading...</Loading>;
  }

  return (
    <>
      <GoBack />
      details movie
    </>
  );
}
