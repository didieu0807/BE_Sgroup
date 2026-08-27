import express, { json } from "express";
import router from "./src/route/route.js";
import { readData } from "./src/repository/readData.js";
import errorHandler from "./src/middleware/errorHandler.js";


const app = express();
app.use(express.json());
app.use("/", router)

app.use(errorHandler)

app.listen(3000, () =>{
  console.log("Server is running on port http://localhost:3000");
})