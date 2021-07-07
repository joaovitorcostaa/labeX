import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import {
  Button,
  Input,
  Select,
  DivContainer2,
} from "../components/Estilization";
import { useForm } from "../hooks/useForm";
import { goToListTripsPage } from "../routes/coordinator";

const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: white;
`;

const ApplicationFormPage = () => {
  const history = useHistory();

  useEffect(() => {
    list();
    countriesList();
  }, []);

  const initialState = {
    name: "",
    age: "",
    applicationText: "",
    profession: "",
    country: "",
  };
  const [trips, setTrips] = useState([]);
  const [form, onChange, resetForm] = useForm(initialState);
  const [countries, setCountries] = useState([]);

  const apply = () => {
    const body = {
      name: form.name,
      age: form.age,
      applicationText: form.applicationText,
      profession: form.profession,
      country: form.country,
    };

    axios
      .post(
        `https://us-central1-labenu-apis.cloudfunctions.net/labeX/joao-vitor-alves-cruz/trips/${form.trip}/apply`,
        body
      )
      .then((res) => {
        alert("Você aplicou para essa vaga!");
        resetForm()
      })
      .catch((err) => {
        console.log(err);
      });
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

  const countriesList = () => {
    axios
      .get("https://servicodados.ibge.gov.br/api/v1/localidades/paises")
      .then((res) => {
        setCountries(res.data);
      })
      .catch((err) => {
        alert("Erro!");
      });
  };

  const handleClick = (e) => {
    e.preventDefault();
    apply();
  };

  const filteredList = trips.map((trip) => {
    return (
      <option key={trip.id} value={trip.id}>
        {" "}
        {trip.name}{" "}
      </option>
    );
  });

  const filteredCountries = countries.map((country) => {
    return (
      <option key={country.nome} value={country.nome}>
        {" "}
        {country.nome}{" "}
      </option>
    );
  });

  return (
    <DivContainer2>
      <h1>ApplicationFormPage</h1>
      <Form onSubmit={handleClick}>
        <Select required name="trip" onChange={onChange} value={form.trip}>
          <option>Escolha a viagem</option>
          {filteredList}
        </Select>

        <Select
          required
          name="country"
          onChange={onChange}
          value={form.country}
        >
          <option>Escolha um país</option>
          {filteredCountries}
        </Select>

        <Input
          required
          name="name"
          placeholder={"Nome"}
          value={form.name}
          onChange={onChange}
          pattern={"^.{3,}$"}
        ></Input>

        <Input
          required
          name="age"
          min="18"
          placeholder={"Idade"}
          type="number"
          value={form.age}
          onChange={onChange}
        ></Input>

        <Input
          required
          name="applicationText"
          placeholder={"Texto de candidatura"}
          type="text"
          value={form.applicationText}
          onChange={onChange}
          pattern={"^.{30,}$"}
        ></Input>

        <Input
          required
          type="text"
          name="profession"
          placeholder={"Profissão"}
          value={form.profession}
          onChange={onChange}
          pattern={"^.{10,}$"}
        ></Input>
        <div>
          <Button onClick={() => goToListTripsPage(history)}> Voltar </Button>
          <Button>Enviar</Button>
        </div>
      </Form>
    </DivContainer2>
  );
};

export default ApplicationFormPage;
