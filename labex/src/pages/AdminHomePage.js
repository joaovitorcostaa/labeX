import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import {
  goToCreateTripPage,
  goToHomePage,
  goToLoginPage,
} from "../routes/coordinator";
import { Button, DivContainer } from "../components/Estilization";
import { useProtectedPage } from "../hooks/useProtectedPages";
import { TripCard } from "../components/TripCard";

const DivLista = styled.div`
  overflow: auto;
`;

const AdminHomePage = () => {
  useProtectedPage();
  const [trips, setTrips] = useState([]);
  const history = useHistory();

  useEffect(() => {
    list();
  }, []);

  const logout = () => {
    window.localStorage.removeItem("token");
    goToLoginPage(history);
  };

  const list = () => {
    axios
      .get(
        "https://us-central1-labenu-apis.cloudfunctions.net/labeX/joao-vitor-alves-cruz/trips"
      )
      .then((res) => {
        setTrips(res.data.trips);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const filteredList = trips.map((trip) => {
    return (
      <TripCard key={trip.id} name={trip.name} tripId={trip.id} list={list} />
    );
  });

  return (
    <DivContainer>
      <h1>admin home</h1>
      <div>
        <Button onClick={() => goToCreateTripPage(history)}>
          Criar viagem
        </Button>
        <Button onClick={() => goToHomePage(history)}>Voltar</Button>
        <Button onClick={logout}>Logout</Button>
      </div>

      <DivLista>
        {filteredList.length > 0 ? (
          filteredList
        ) : (
          <p>Carregando as viagens...</p>
        )}
      </DivLista>
    </DivContainer>
  );
};

export default AdminHomePage;
