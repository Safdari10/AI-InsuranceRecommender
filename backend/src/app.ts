import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import chatRoutes from "./routes/chatRoutes";

dotenv.config();

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

app.use("/", chatRoutes);

const PORT = process.env.PORT || 3001;
const HOST = process.env.HOST || "localhost";

app.listen(PORT, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});
