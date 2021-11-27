import styled from "styled-components";

const Btn = styled.button`
  color: white;
  background-color: #4caf50; /* Green */
  border: 0;
  border-radius: 0.25rem;
`;

const Wrapper = styled.div`
  display: flex;
`;

const Input = styled.input.attrs({ required: true })`
  background-color: red;
`;

const App = function () {
  return (
    <Wrapper as="header">
      <Btn>Log in</Btn>
      <Btn as="a" href="/">
        Log in
      </Btn>
      <Input />
      <Input />
      <Input />
    </Wrapper>
  );
};

export default App;
