import { Button } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import { Select } from "@chakra-ui/select";
import { FormLabel } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { categoriesState, categoryState } from "../atoms";

const FormContainer = styled.form`
  display: flex;
  flex-direction: row;
  margin-top: 10px;
  & button {
    margin-left: 10px;
  }
`;

interface IForm {
  category: string;
}

const Categories = function () {
  const [category, setCategory] = useRecoilState(categoryState);
  const [categories, setCategories] = useRecoilState(categoriesState);
  const { register, handleSubmit, setValue } = useForm<IForm>();

  const handleValid = ({ category }: IForm) => {
    const isDuplicated = categories.find((name) => name === category);
    if (isDuplicated) {
      window.alert("You already have that category name ! ");
      return;
    }

    setCategories((oldCategories) => {
      const newCategories = [category, ...oldCategories];
      localStorage.setItem("Categories", JSON.stringify(newCategories));
      return newCategories;
    });
    setValue("category", "");
  };

  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };

  return (
    <>
      <Select value={category} onInput={onInput}>
        {categories.map((c) => (
          <option key={Math.random()} value={c}>
            {c}
          </option>
        ))}
      </Select>
      <FormContainer onSubmit={handleSubmit(handleValid)}>
        <FormLabel width="200px">Create Category</FormLabel>
        <Input
          {...register("category", {
            required: "Please write a category",
          })}
          placeholder="Write a category"
        />
        <Button type="submit" colorScheme="teal">
          Add
        </Button>
      </FormContainer>
    </>
  );
};

export default Categories;
