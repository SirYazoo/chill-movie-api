const express = require("express");
const router = express.Router();
const movieService = require("../services/movie.service");

router.get("/", async (req, res) => {
  try {
    const movies = await movieService.getAllMovies();

    res.status(200).json({
      success: true,
      message: "Berhasil mengambil daftar film",
      data: movies,
    });
  } catch (error) {
    console.error("Error GET /movies:", error.message);

    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan pada server internal",
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const movieData = req.body;

    if (!movieData.judul || !movieData.type) {
      return res.status(400).json({
        success: false,
        message: "Judul dan type film wajib diisi",
      });
    }

    const newId = await movieService.addMovie(movieData);

    res.status(201).json({
      success: true,
      message: "Film berhasil ditambahkan",
      data: { id: newId, ...movieData },
    });
  } catch (error) {
    console.error("Error POST /movies:", error.message);

    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat menambahkan film",
    });
  }
});
module.exports = router;
