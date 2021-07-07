import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import { useProtectedPage } from "../hooks/useProtectedPages";
import { goToAdminHomePage } from "../routes/coordinator";
import { Button, DivContainer3 } from "../components/Estilization";
import styled from "styled-components";

const DivCandidates = styled.div`
  overflow: auto;
`;

const DivElement = styled.div`
  padding: 6px;
  max-width: 600px;
  &:hover {
    background-color: #d0efff;
    cursor: pointer;
    transition: 300ms;
    color: black;
  }
`;

const TripsDetailsPage = () => {
  useProtectedPage();
  const [trip, setTrip] = useState({});
  const history = useHistory();
  const pathParams = useParams();

  useEffect(() => {
    tripDetails();
  }, []);
  const token = window.localStorage.getItem("token");

  const tripDetails = () => {
    axios
      .get(
        `https://us-central1-labenu-apis.cloudfunctions.net/labeX/joao-vitor-alves-cruz/trip/${pathParams.id}`,
        {
          headers: {
            auth: token,
          },
        }
      )
      .then((res) => {
        setTrip(res.data.trip);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const decideCandidate = (id, decision) => {
    const body = {
      approve: decision,
    };
    axios
      .put(
        `https://us-central1-labenu-apis.cloudfunctions.net/labeX/joao-vitor-alves-cruz/trips/${pathParams.id}/candidates/${id}/decide`,
        body,
        {
          headers: {
            auth: token,
          },
        }
      )
      .then((res) => {
        tripDetails();
      })
      .catch((err) => {
        alert("Erro!");
      });
  };

  return (
    <DivContainer3>
      <h1>TripsDetailsPage</h1>
      <Button onClick={() => goToAdminHomePage(history)}> Voltar </Button>
      <DivElement>
        <h3>{trip.name}</h3>
        <p>{trip.date}</p>
        <p>{trip.planet}</p>
        <p>{trip.durationInDays} dias</p>
        <p>{trip.description}</p>
      </DivElement>

      <h1>Candidatos aprovados</h1>
      {trip.approved ? (
        trip.approved.map((candidate) => {
          return <p key={candidate.id}> {candidate.name} </p>;
        })
      ) : (
        <p>Nenhum passageiro foi aprovado!</p>
      )}

      <h1>Candidatos Pendentes</h1>
      <DivCandidates>
        {trip.candidates &&
          trip.candidates.map((candidate) => {
            const {
              name,
              age,
              country,
              profession,
              applicationText,
              id,
            } = candidate;
            return (
              <DivElement>
                <p>{name}</p>
                <p>{age} anos</p>
                <p>{country}</p>
                <p>{profession}</p>
                <p>{applicationText}</p>
                <Button onClick={() => decideCandidate(id, true)}>
                  Aprovar
                </Button>
                <Button onClick={() => decideCandidate(id, false)}>
                  Negar
                </Button>
              </DivElement>
            );
          })}
      </DivCandidates>
    </DivContainer3>
  );
};

export default TripsDetailsPage;
