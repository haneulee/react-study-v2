import { BrowserRouter, Switch, Route } from "react-router-dom";
import Test from "routes/Test";
import Coin from "routes/Coin";
import Coins from "routes/Coins";

const Router = function () {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/test">
          <Test />
        </Route>
        <Route path="/coin/:coinId">
          <Coin />
        </Route>
        <Route path="/">
          <Coins />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};
export default Router;
