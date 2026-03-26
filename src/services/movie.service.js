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

module.exports = {
  getAllMovies,
  addMovie,
};
