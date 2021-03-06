import { useState } from "react";
import Circle from "components/Circle";
import styled, { keyframes } from "styled-components";

const animation = keyframes`
0% {
  transform: rotate(0deg);
  border-radius: 0;
}
50% {
  transform: rotate(360deg);
  border-radius: 100px;
}
100% {
  transform: rotate(0deg);
  border-radius: 0;
}
`;

const Btn = styled.button`
  color: white;
  background-color: #4caf50; /* Green */
  border: 0;
  border-radius: 0.25rem;
`;

const Emoji = styled.span`
  font-size: 30px;
`;

const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 300px;
  background-color: skyblue;
  animation: ${animation} 1s linear infinite;
  ${Emoji} {
    &:hover {
      font-size: 50px;
      &:active {
        opacity: 0;
      }
    }
  }
`;

const Input = styled.input.attrs({ required: true })`
  background-color: red;
`;

const Title = styled.div`
  color: ${(props) => props.theme.textColor};
`;

const Test = function () {
  const [value, setValue] = useState("");
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setValue(value);
  };
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(value);
  };

  return (
    <>
      <Title>Hello</Title>
      <Box>
        <Emoji as="p">😂</Emoji>
      </Box>
      <div>
        <Emoji>🔥</Emoji>
        <Btn as="a" href="/">
          Log in
        </Btn>
        <Input />
      </div>
      <Circle bgColor="red" />
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="username"
          onChange={onChange}
          value={value}
        />
        <button type="submit">Log in</button>
      </form>
    </>
  );
};

export default Test;
