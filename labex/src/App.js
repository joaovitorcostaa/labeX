import React from "react";
import Router from "./routes/Router";
import styled from "styled-components";
import "../src/App.css";

const DivContainer = styled.div`
  font-family: "Zen Dots", cursive;
`;

const App = () => {
  return (
    <DivContainer>
      <Router />
    </DivContainer>
  );
};

export default App;
