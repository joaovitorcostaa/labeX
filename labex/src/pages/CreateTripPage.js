import React from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { useProtectedPage } from "../hooks/useProtectedPages";
import { goToAdminHomePage } from "../routes/coordinator";
import {
  Button,
  Input,
  Select,
  DivContainer3,
} from "../components/Estilization";
import { useForm } from "../hooks/useForm";

const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: white;
`;

const CreateTripPage = () => {
  useProtectedPage();

  const initialForm = {
    name: "",
    description: "",
    planet: "",
    durationInDays: "",
    date: "",
  };
  const [form, onChange, resetForm] = useForm(initialForm);

  const history = useHistory();

  const createTrip = () => {
    const token = window.localStorage.getItem("token");
    const dateArray = form.date.split("-");
    const date = `${dateArray[2]}/${dateArray[1]}/${dateArray[0]}`;
    const body = {
      name: form.name,
      description: form.description,
      planet: form.planet,
      durationInDays: form.durationInDays,
      date: date,
    };
    axios
      .post(
        "https://us-central1-labenu-apis.cloudfunctions.net/labeX/joao-vitor-alves-cruz/trips",
        body,
        {
          headers: {
            auth: token,
          },
        }
      )
      .then(() => {
        alert("Viagem criada com sucesso!");
        resetForm()
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleClick = (e) => {
    e.preventDefault();
    createTrip();
  };

  const today = new Date();
  const stringToday =
    today.getFullYear() +
    "-" +
    ("0" + (today.getMonth() + 1)).substr(-2) +
    "-" +
    ("0" + today.getDate()).substr(-2);

  return (
    <DivContainer3>
      <h1>CreateTripPage</h1>
      <Form onSubmit={handleClick}>
        <Select required onChange={onChange} name="planet" value={form.planet}>
          <option>Escolha um planeta</option>
          <option>Mercúrio</option>
          <option>Terra</option>
          <option>Marte</option>
          <option>Vênus</option>
          <option>Saturno</option>
          <option>Urano</option>
          <option>Netuno</option>
          <option>Plutão</option>
          <option>Jupiter</option>
        </Select>
        <Input
          required
          name="name"
          value={form.name}
          onChange={onChange}
          type="text"
          placeholder={"Nome"}
          pattern={"^.{5,}$"}
        />
        <Input
          required
          onChange={onChange}
          type="date"
          name="date"
          value={form.date}
          min={stringToday}
        />
        <Input
          required
          onChange={onChange}
          placeholder={"Descrição"}
          type="text"
          name="description"
          value={form.description}
          pattern={"^.{30,}$"}
        />

        <Input
          required
          onChange={onChange}
          placeholder={"Duração em dias"}
          type="number"
          name="durationInDays"
          value={form.durationInDays}
          min="50"
        />
        <div>
          <Button onClick={() => goToAdminHomePage(history)}> Voltar </Button>
          <Button>Criar</Button>
        </div>
      </Form>
    </DivContainer3>
  );
};

export default CreateTripPage;
