const express = require("express");
const dbPool = require("./src/config/db");
require("dotenv").config();

const movieRoutes = require("./src/routes/movie.routes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/movies", movieRoutes);

app.get("/", (req, res) => {
  res.send("Server Chill Movie API Berjalan Lancar!");
});

app.listen(PORT, () => {
  console.log(`Server berhasil berjalan di http://localhost:${PORT}`);
});
