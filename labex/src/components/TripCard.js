import React from "react";
import styled from "styled-components";
import lixo from "../img/lixo.png";
import axios from "axios";
import { goToTripsDetailsPage } from "../routes/coordinator";
import { useHistory } from "react-router";

const Div = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 18vw;
  &:hover {
    cursor: pointer;
    background-color: white;
    color: black;
    transition: 300ms;
  }
`;

const Img = styled.img`
  height: 4vh;
  width: 5vh;
  margin-right: 6px;
  &:hover {
    border-radius: 50%;
    background-color: #d0efff;
    cursor: pointer;
    transition: 300ms;
  }
`;

export const TripCard = (props) => {
  const history = useHistory();
  const { name, tripId, list } = props;
  const deleteTrip = (id) => {
    const token = window.localStorage.getItem("token");
    if (window.confirm("Você realmente deseja deletar essa viagem?")) {
      axios
        .delete(
          `https://us-central1-labenu-apis.cloudfunctions.net/labeX/joao-vitor-alves-cruz/trips/${id}`,
          {
            headers: {
              auth: token,
            },
          }
        )
        .then((res) => {
          list();
        })
        .catch((err) => {
          console.log(err.data);
        });
    }
  };

  return (
    <Div>
      <p onClick={() => goToTripsDetailsPage(history, tripId)}>{name}</p>
      <Img onClick={() => deleteTrip(tripId)} src={lixo} />
    </Div>
  );
};
