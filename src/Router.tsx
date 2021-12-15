import { BrowserRouter, Switch, Route } from "react-router-dom";
import Test from "routes/Test";
import Coin from "routes/Coin";
import Coins from "routes/Coins";
import ToDoList from "routes/ToDoList";

const Router = function () {
  return (
    <BrowserRouter basename="/react-study-v2">
      <Switch>
        <Route path="/todo">
          <ToDoList />
        </Route>
        <Route path="/coin/:coinId">
          <Coin />
        </Route>
        <Route exact path="/">
          <Coins />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};
export default Router;
