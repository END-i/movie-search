import React from "react";

import { IChildrenProp } from "utils/types";
import { Header, Footer } from "components";
import { Wrapper } from "./styled";

export default function ({ children }: IChildrenProp) {
  return (
    <Wrapper>
      <Header />
      {children}
      <Footer />
    </Wrapper>
  );
}
