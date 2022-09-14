import express from "express";
import cors from 'cors';

import { router } from "./routes";

const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.status(200).send("App rodando!");
});

app.use(express.json());
app.use(router);

const link = "http://localhost:8080/";
app.listen(8080, () => {
  console.log(`Server running at ${link}`);
});