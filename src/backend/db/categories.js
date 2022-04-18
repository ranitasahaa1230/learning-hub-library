import { v4 as uuid } from "uuid";

/**
 * Category Database can be added here.
 * You can add category of your wish with different attributes
 * */

export const categories = [
  {
    _id: uuid(),
    categoryName: "All",
  },
  {
    _id: uuid(),
    categoryName: "Javascript",
  },
  {
    _id: uuid(),
    categoryName: "React JS",
  },
  {
    _id: uuid(),
    categoryName: "Redux",
  },
  {
    _id: uuid(),
    categoryName: "MongoDB",
  },
  {
    _id: uuid(),
    categoryName: "TypeScript",
  },
];
