import { useForm } from "react-hook-form";
import styled from "styled-components";
import { atom, useRecoilState } from "recoil";
import { Helmet } from "react-helmet";
import ToggleButton from "components/ToggleButton";
import { useLocation } from "react-router";
import BackButton from "components/BackButton";

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
  & input {
    color: black;
  }
`;

const Title = styled.h1`
  font-size: 48px;
`;

interface IForm {
  toDo: string;
}

interface IToDo {
  text: string;
  id: number;
  category: "TO_DO" | "DOING" | "DONE";
}

const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
});

const ToDoList = function () {
  const { state } = useLocation<RouteState>();
  const [toDos, setToDos] = useRecoilState(toDoState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const handleValid = ({ toDo }: IForm) => {
    setToDos((oldToDos) => [
      { text: toDo, id: Date.now(), category: "TO_DO" },
      ...oldToDos,
    ]);
    setValue("toDo", "");
  };
  return (
    <Container>
      <Helmet>
        <title>To Do List ✅</title>
      </Helmet>
      <Header>
        <BackButton />
        <Title>To Do List ✅</Title>
        <ToggleButton />
      </Header>
      <Wrapper>
        <form onSubmit={handleSubmit(handleValid)}>
          <input
            {...register("toDo", {
              required: "Please write a To Do",
            })}
            placeholder="Write a to do"
          />
          <button>Add</button>
        </form>
        <ul>
          {toDos.map((toDo) => (
            <li key={toDo.id}>{toDo.text}</li>
          ))}
        </ul>
      </Wrapper>
    </Container>
  );
};

export default ToDoList;
