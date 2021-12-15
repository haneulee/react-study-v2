import { atom, selector } from "recoil";

export enum Categories {
  "TO_DO" = "TO_DO",
  "DOING" = "DOING",
  "DONE" = "DONE",
}

export interface IToDo {
  text: string;
  id: number;
  category: string;
}
const localStorageToDos = localStorage.getItem("ToDos");
const parsedToDos = JSON.parse(localStorageToDos as any);

const localStorageCategories = localStorage.getItem("Categories");
const parsedCategories = JSON.parse(localStorageCategories as any);

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: parsedToDos ?? [],
});

export const categoryState = atom<string>({
  key: "category",
  default: Categories.TO_DO,
});

export const categoriesState = atom<string[]>({
  key: "categories",
  default: parsedCategories ?? [
    Categories.TO_DO,
    Categories.DOING,
    Categories.DONE,
  ],
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);
    return toDos.filter((toDo) => toDo.category === category);
  },
});
