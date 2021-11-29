import styled from "styled-components";
import Router from "Router";

const Wrapper = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  text-align: center;
  margin: 0;
  background-color: ${(props) => props.theme.bgColor};
`;

const App = function () {
  return (
    <Wrapper as="header">
      <Router />
    </Wrapper>
  );
};

export default App;
