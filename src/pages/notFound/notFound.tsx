import React from "react";
import { useHistory } from "react-router-dom";

import { homePath } from "pages/_routes/routesList";
import { Wrapper, Title, Link } from "./styled";

export default function () {
  const { push } = useHistory();

  return (
    <Wrapper>
      <Title>Page Not Found</Title>
      <Link onClick={() => push(homePath)}>Go Home</Link>
    </Wrapper>
  );
}
