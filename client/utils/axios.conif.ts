import { Axios } from "axios";

export const axios = new Axios({
  baseURL: "https://zillow-com1.p.rapidapi.com",
  headers: {
    "X-RapidAPI-Key": "6069924accmsh138db6bfce91767p17aae6jsnf0d42e4dd709",
    "X-RapidAPI-Host": "zillow-com1.p.rapidapi.com",
  },
});
const env = "prod";
export const API_KEY = "yCs1jygXg1aJ1tUOlr2Ll2TdNKWC2Vl7uO4dy8s6";
export const SERVER_API = new Axios({
  baseURL:
    env !== "dev"
      ? `https://se8lfty5f5.execute-api.us-west-2.amazonaws.com/Prod`
      : "http://127.0.0.1:3000/",
});
