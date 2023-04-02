import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { Response, Request } from "express";

const app = express();
dotenv.config();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.send("Iot project node.js api")
})

app.get("*", (req: Request, res: Response) => {
    res.status(404).send("Error 404: resource not found!")
})

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));