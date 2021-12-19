import { HashRouter, Switch, Route } from "react-router-dom";
import Test from "routes/Test";
import Coin from "routes/Coin";
import Coins from "routes/Coins";
import ToDoList from "routes/ToDoList";
import NetflixHome from "routes/NetflixHome";

const Router = function () {
  return (
    <HashRouter>
      <Switch>
        <Route exact path="/">
          <Coins />
        </Route>
        <Route path="/netflix">
          <NetflixHome />
        </Route>
        <Route exact path="/todo">
          <ToDoList />
        </Route>
        <Route path="/coin/:coinId">
          <Coin />
        </Route>
      </Switch>
    </HashRouter>
  );
};
export default Router;
