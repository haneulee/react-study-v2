import { useRecoilValue } from "recoil";
import { toDoSelector } from "atoms";
import styled from "styled-components";
import { Helmet } from "react-helmet";

import Categories from "components/Categories";
import CreateToDo from "components/CreateToDo";
import ToDo from "components/ToDo";
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
  min-width: 1000px;
  margin: 30px auto;
`;

const Title = styled.h1`
  font-size: 48px;
`;

const ToDoContainer = styled.ul`
  margin: 20px;
  & li {
    margin: 10px;
  }s
`;

const ToDoList = function () {
  const toDos = useRecoilValue(toDoSelector);

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
        <Categories />
        <CreateToDo />
        <ToDoContainer>
          {toDos?.map((toDo) => (
            <ToDo key={toDo.id} {...toDo} />
          ))}
        </ToDoContainer>
      </Wrapper>
    </Container>
  );
};

export default ToDoList;
