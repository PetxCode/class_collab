const url: string = "mongodb://127.0.0.1:27017/rentDB";
import { connect } from "mongoose";
import { URL } from "./constant";

export const dbConfig = async () => {
  try {
    await connect(URL!).then(() => {
      console.clear();
      console.log("db connection established");
    });
  } catch (error) {
    return console.error(error);
  }
};
