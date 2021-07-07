import React from "react";
import { useHistory } from "react-router-dom";
import {
  goToAdminHomePage,
  goToListTripsPage,
  goToLoginPage,
} from "../routes/coordinator";
import { Button, DivContainer } from "../components/Estilization";

const HomePage = () => {
  const history = useHistory();
  const token = window.localStorage.getItem("token");
  const validacao = () => {
    if (token === null) {
      goToLoginPage(history);
    } else {
      goToAdminHomePage(history);
    }
  };

  return (
    <DivContainer>
      <h1>LabeX</h1>
      <div>
        <Button onClick={() => goToListTripsPage(history)}>Ver viagens</Button>
        <Button onClick={validacao}>Área de admin</Button>
      </div>
    </DivContainer>
  );
};

export default HomePage;
