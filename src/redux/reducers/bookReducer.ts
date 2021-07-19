import axios from "axios";

const initialState: any = {
  title: "",
  chapters: [],
};

const BOOK = "book";

export function book(id: string) {
  return {
    type: BOOK,
    payload: "hello",
  };
}
