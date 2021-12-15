import { Button } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import { FormLabel } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, toDoState } from "../atoms";

const FormContainer = styled.form`
  display: flex;
  flex-direction: row;
  margin-top: 10px;
  & button {
    margin-left: 10px;
  }
`;

interface IForm {
  toDo: string;
}

const CreateToDo = function () {
  const setToDos = useSetRecoilState(toDoState);
  const category = useRecoilValue(categoryState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const handleValid = ({ toDo }: IForm) => {
    setToDos((oldToDos) => {
      const newToDos = [{ text: toDo, id: Date.now(), category }, ...oldToDos];

      localStorage.setItem("ToDos", JSON.stringify(newToDos));

      return newToDos;
    });
    setValue("toDo", "");
  };
  return (
    <FormContainer onSubmit={handleSubmit(handleValid)}>
      <FormLabel width="200px">Create To Do</FormLabel>
      <Input
        {...register("toDo", {
          required: "Please write a To Do",
        })}
        placeholder="Write a to do"
      />
      <Button type="submit" colorScheme="teal">
        Add
      </Button>
    </FormContainer>
  );
};

export default CreateToDo;
