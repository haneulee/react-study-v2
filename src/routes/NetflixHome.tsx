import Header from "components/Header";
import { Route, Switch } from "react-router";
import styled from "styled-components";
import Home from "./Home";
import Search from "./Search";
import Tv from "./Tv";

const NetflixWrapper = styled.div`
  display: flex;
  flex-direction: column;
  a {
    &:hover {
      box-shadow: none;
    }
  }
`;

const NetflixHome = function () {
  return (
    <NetflixWrapper>
      <Header />
      <Switch>
        <Route exact path={["/netflix", "/netflix/movie/:movieId"]}>
          <Home />
        </Route>
        <Route exact path={["/netflix/tv", "/netflix/tv/:tvId"]}>
          <Tv />
        </Route>
        <Route exact path="/netflix/search">
          <Search />
        </Route>
      </Switch>
    </NetflixWrapper>
  );
};

export default NetflixHome;
