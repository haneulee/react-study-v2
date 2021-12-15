import { useRecoilValue } from "recoil";
import CreateToDo from "components/CreateToDo";
import ToDo from "components/ToDo";
import { toDoState } from "atoms";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import BackButton from "components/BackButton";
import ToggleButton from "components/ToggleButton";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  margin: 30px;
`;

const Header = styled.header`
  width: 100%;
  height: 100px;
  position: relative;
`;

const Wrapper = styled.div`
  max-width: 1000px;
  margin: 30px auto;
`;

const Title = styled.h1`
  font-size: 48px;
`;

const ToDoContainer = styled.ul`
  margin: 20px;
  & li {
    margin: 10px;
  }
`;

const ToDoList = function () {
  const toDos = useRecoilValue(toDoState);
  return (
    <Container>
      <Helmet>
        <title>To Do List 📚</title>
      </Helmet>
      <Header>
        <BackButton />
        <Title>To Do List 📚</Title>
        <ToggleButton />
      </Header>
      <Wrapper>
        <CreateToDo />
        <ToDoContainer>
          {toDos.map((toDo) => (
            <ToDo key={toDo.id} {...toDo} />
          ))}
        </ToDoContainer>
      </Wrapper>
    </Container>
  );
};

export default ToDoList;
