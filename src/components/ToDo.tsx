import { Button } from "@chakra-ui/button";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { Categories, categoriesState, IToDo, toDoState } from "../atoms";

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
  const categories = useRecoilValue(categoriesState);
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
      {categories.map((c) => {
        if (c !== category) {
          return (
            <ToDoButton
              key={Math.random()}
              color="teal"
              name={c}
              onClick={onClick}
            >
              {c}
            </ToDoButton>
          );
        }
        return null;
      })}
    </ToDoWrapper>
  );
};

export default ToDo;
