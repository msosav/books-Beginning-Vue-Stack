import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongodb from "mongodb";
import MoviesRoute from "./api/MoviesRoute.js";

class Index {
  static app = express();

  static router = express.Router();

  static main() {
    dotenv.config();
    Index.setUpServer();
    Index.setUpDatabase();
  }

  static setUpServer() {
    Index.app.use(cors());
    Index.app.use(express.json());
    Index.app.use("/api/v1/movies", MoviesRoute.configRoutes(Index.router));
    Index.app.use("*", (req, res) => {
      res.status(404).json({ error: "not found" });
    });
  }

  static async setUpDatabase() {
    const client = new mongodb.MongoClient(process.env.MOVIEREVIEWS_DB_URI);
    const port = process.env.PORT || 8000;
    try {
      await client.connect();
      Index.app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
      });
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  }
}

Index.main();
