import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Nav from "./Pages/Components/Nav/Nav";
import Main from "./Pages/Main/Main";
import BookMark from "./Pages/Bookmark/Bookmark";
import Detail from "./Pages/Detail/Detail";

function Routes() {
  return (
    <Router>
      <Nav />
      <Switch>
        <Route exact path="/main" component={Main} />
        <Route exact path="/bookmark" component={BookMark} />
        <Route exact path="/detail/:id" component={Detail} />
      </Switch>
    </Router>
  );
}

export default Routes;
