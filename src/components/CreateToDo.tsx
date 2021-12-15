import { Button } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, toDoState } from "../atoms";

const FormContainer = styled.form`
  display: flex;
  flex-direction: row;
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
    setToDos((oldToDos) => [
      { text: toDo, id: Date.now(), category },
      ...oldToDos,
    ]);
    setValue("toDo", "");
  };
  return (
    <FormContainer onSubmit={handleSubmit(handleValid)}>
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
