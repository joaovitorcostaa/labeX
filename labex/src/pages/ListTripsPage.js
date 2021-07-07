import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { goToApplicationFormPage, goToHomePage } from "../routes/coordinator";
import { Button, DivContainer } from "../components/Estilization";
import styled from "styled-components";
import axios from "axios";

const DivLista = styled.div`
  overflow: auto;
`;
const DivElement = styled.div`
  padding: 6px;
  max-width: 500px;
  &:hover {
    background-color: #d0efff;
    cursor: pointer;
    transition: 300ms;
    color: black;
  }
`;

const ListTripsPage = () => {
  const history = useHistory();
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    list();
  }, []);

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
      <DivElement key={trip.id}>
        <h2>Nome: {trip.name}</h2>
        <p>Descrição: {trip.description}</p>
        <p>Planeta: {trip.planet}</p>
        <p>Duração: {trip.durationInDays} dias</p>
        <p>Data: {trip.date}</p>
      </DivElement>
    );
  });

  return (
    <DivContainer>
      <p>ListTripsPage</p>
      <div>
        <Button onClick={() => goToApplicationFormPage(history)}>
          Inscrever-se
        </Button>
        <Button onClick={() => goToHomePage(history)}>Home </Button>
      </div>
      <DivLista>{filteredList}</DivLista>
    </DivContainer>
  );
};

export default ListTripsPage;
