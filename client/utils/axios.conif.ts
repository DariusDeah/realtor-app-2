import { Axios } from "axios";

export const axios = new Axios({
  baseURL: "https://zillow-com1.p.rapidapi.com",
  headers: {
    "X-RapidAPI-Key": "6069924accmsh138db6bfce91767p17aae6jsnf0d42e4dd709",
    "X-RapidAPI-Host": "zillow-com1.p.rapidapi.com",
  },
});
