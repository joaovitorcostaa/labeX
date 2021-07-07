import React from "react";
import { useHistory } from "react-router-dom";
import { goToHomePage } from "../routes/coordinator";
import { Button, DivContainer2 } from "../components/Estilization";

const ErrorPage = () => {
  const history = useHistory();
  return (
    <DivContainer2>
      <p>Erro 404 - Essa página não existe!</p>
      <Button onClick={() => goToHomePage(history)}>Voltar para a Home</Button>
    </DivContainer2>
  );
};

export default ErrorPage;
