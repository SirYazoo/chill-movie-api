const db = require("../config/db");

const getAllMovies = async () => {
  try {
    const [rows] = await db.query("SELECT * FROM SERIES_FILM");
    return rows;
  } catch (error) {
    throw new Error(`Gagal mengambil data film: ${error.message}`);
  }
};

const addMovie = async (movieData) => {
  try {
    const { judul, sinopsis, rating_usia, type, is_premium } = movieData;

    const query = `
            INSERT INTO SERIES_FILM (judul, sinopsis, rating_usia, type, is_premium) 
            VALUES (?, ?, ?, ?, ?)
        `;

    const [result] = await db.query(query, [
      judul,
      sinopsis,
      rating_usia,
      type,
      is_premium || false,
    ]);

    return result.insertId;
  } catch (error) {
    throw new Error(`Gagal menambahkan film: ${error.message}`);
  }
};

const getMovieById = async (id) => {
  try {
    const query = "SELECT * FROM SERIES_FILM WHERE id = ?";
    const [rows] = await db.query(query, [id]);

    if (rows.length === 0) {
      return null;
    }

    return rows[0];
  } catch (error) {
    throw new Error(`Gagal mengambil data film: ${error.message}`);
  }
};

const updateMovie = async (id, movieData) => {
  try {
    const { judul, sinopsis, rating_usia, type, is_premium } = movieData;

    const query = `
            UPDATE SERIES_FILM 
            SET judul = ?, sinopsis = ?, rating_usia = ?, type = ?, is_premium = ?
            WHERE id = ?
        `;

    const [result] = await db.query(query, [
      judul,
      sinopsis,
      rating_usia,
      type,
      is_premium || false,
      id,
    ]);

    return result.affectedRows > 0;
  } catch (error) {
    throw new Error(`Gagal mengubah data film: ${error.message}`);
  }
};

const deleteMovie = async (id) => {
  try {
    const query = "DELETE FROM SERIES_FILM WHERE id = ?";

    const [result] = await db.query(query, [id]);

    return result.affectedRows > 0;
  } catch (error) {
    throw new Error(`Gagal menghapus data film: ${error.message}`);
  }
};

module.exports = {
  getAllMovies,
  addMovie,
  getMovieById,
  updateMovie,
  deleteMovie,
};
