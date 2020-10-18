import React from "react";
import data from "../data";
import styled from "styled-components";

import GlobalStyles from "./GlobalStyles";
import Typeahead from "./Typeahead";

const App = (props) => {
  // TODO!
  return (
    <>
      <GlobalStyles />
      <Wrapper>
        <Typeahead
          categories={data.categories}
          suggestions={data.books}
          handleSelect={(suggestion) => {
            window.alert(suggestion);
          }}
        />
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  /* align-items: center; */
  display: flex;
  justify-content: center;
  font-family: Arial, Helvetica, sans-serif;
  height: 100vh;
  margin-top: 100px;
`;

export default App;
