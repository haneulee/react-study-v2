import styled from "styled-components";
import Router from "Router";
import { ReactQueryDevtools } from "react-query/devtools";

const Wrapper = styled.div`
  display: flex;
  width: 100vw;
  min-height: 100vh;
  text-align: center;
  margin: 0;
`;

const App = function () {
  return (
    <Wrapper>
      <Router />
      <ReactQueryDevtools initialIsOpen />
    </Wrapper>
  );
};

export default App;
