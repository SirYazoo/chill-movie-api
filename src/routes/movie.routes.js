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

router.get("/:id", async (req, res) => {
  try {
    const movieId = req.params.id;
    const movie = await movieService.getMovieById(movieId);

    if (!movie) {
      return res.status(404).json({
        success: false,
        message: `Film dengan ID ${movieId} tidak ditemukan`,
      });
    }

    res.status(200).json({
      success: true,
      message: "Berhasil mengambil detail film",
      data: movie,
    });
  } catch (error) {
    console.error(`Error GET /movies/${req.params.id}:`, error.message);
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

router.put("/:id", async (req, res) => {
  try {
    const movieId = req.params.id;
    const movieData = req.body;

    if (!movieData.judul || !movieData.type) {
      return res.status(400).json({
        success: false,
        message: "Judul dan Type film wajib diisi untuk update!",
      });
    }

    const isUpdated = await movieService.updateMovie(movieId, movieData);

    if (!isUpdated) {
      return res.status(404).json({
        success: false,
        message: `Gagal update. Film dengan ID ${movieId} tidak ditemukan`,
      });
    }

    res.status(200).json({
      success: true,
      message: "Data film berhasil diperbarui",
      data: {
        id: Number(movieId),
        ...movieData,
      },
    });
  } catch (error) {
    console.error(`Error PUT /movies/${req.params.id}:`, error.message);
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat mengubah data film",
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const movieId = req.params.id;

    const isDeleted = await movieService.deleteMovie(movieId);

    if (!isDeleted) {
      return res.status(404).json({
        success: false,
        message: `Gagal menghapus. Film dengan ID ${movieId} tidak ditemukan`,
      });
    }

    res.status(200).json({
      success: true,
      message: `Data film dengan ID ${movieId} berhasil dihapus`,
    });
  } catch (error) {
    console.error(`Error DELETE /movies/${req.params.id}:`, error.message);
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat menghapus data film",
    });
  }
});

module.exports = router;
