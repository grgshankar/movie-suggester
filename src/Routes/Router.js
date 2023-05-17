import React from "react";
import {
  BrowserRouter,
  Redirect,
  Route,
  Switch,
} from "react-router-dom/cjs/react-router-dom.min";
import AddMovie from "../components/AddMovie";
import Profile from "../components/Profile";
import ViewMovie from "../components/ViewMovie";
import Home from "../pages/Home";

const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact>
            <Redirect to="/home" />
          </Route>
          <Route path="/home" component={Home} />
          <Route path="/add_movie" component={AddMovie} exact />
          <Route path="/profile" component={Profile} exact />
          <Route path="/view/:id" component={ViewMovie} exact />
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default Router;
