import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import AdminHomePage from "../pages/AdminHomePage";
import ApplicationFormPage from "../pages/ApplicationFormPage";
import CreateTripPage from "../pages/CreateTripPage";
import HomePage from "../pages/HomePage";
import ListTripsPage from "../pages/ListTripsPage";
import LoginPage from "../pages/LoginPage";
import TripsDetailsPage from "../pages/TripDetailsPage";
import ErrorPage from "../pages/ErrorPage";

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/admin/trips/list">
          <AdminHomePage />
        </Route>
        <Route exact path="/ApplicationFormPage">
          <ApplicationFormPage />
        </Route>
        <Route exact path="/admin/trips/create">
          <CreateTripPage />
        </Route>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route exact path="/ListTripsPage">
          <ListTripsPage />
        </Route>
        <Route exact path="/LoginPage">
          <LoginPage />
        </Route>
        <Route exact path="/admin/trips/:id">
          <TripsDetailsPage />
        </Route>
        <Route>
          <ErrorPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
