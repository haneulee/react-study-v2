import styled from "styled-components";

interface CircleProps {
  bgColor: string;
  bdColor?: string;
}
const Container = styled.div<CircleProps>`
  background-color: ${(props) => props.bgColor};
`;

const Circle = function ({ bgColor, bdColor }: CircleProps) {
  return <Container bgColor={bgColor} bdColor={bdColor ?? bgColor} />;
};

export default Circle;
