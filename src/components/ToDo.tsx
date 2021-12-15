import { Button } from "@chakra-ui/button";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { Categories, IToDo, toDoState } from "../atoms";

const ToDoWrapper = styled.li`
  background: rgba(0, 0, 0, 0.2);
  padding: 20px 40px;
  border-radius: 4px;
`;

const ToDoButton = styled(Button)`
  margin-left: 10px;
`;

const ToDo = function ({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;

    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const newToDo = { text, id, category: name as any };
      const newToDoArr = [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];

      localStorage.setItem("ToDos", JSON.stringify(newToDoArr));

      return newToDoArr;
    });
  };

  return (
    <ToDoWrapper>
      <span>{text}</span>
      {category !== Categories.DOING && (
        <ToDoButton color="teal" name={Categories.DOING} onClick={onClick}>
          Doing
        </ToDoButton>
      )}
      {category !== Categories.TO_DO && (
        <ToDoButton color="teal" name={Categories.TO_DO} onClick={onClick}>
          To Do
        </ToDoButton>
      )}
      {category !== Categories.DONE && (
        <ToDoButton color="teal" name={Categories.DONE} onClick={onClick}>
          Done
        </ToDoButton>
      )}
    </ToDoWrapper>
  );
};

export default ToDo;
