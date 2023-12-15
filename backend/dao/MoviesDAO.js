export default class MoviesDAO {
  static movies;

  static async injectDB(connection) {
    if (MoviesDAO.movies) {
      return;
    }

    try {
      MoviesDAO.movies = await connection
        .db(process.env.MOVIEREVIEWS_NS)
        .collection("movies");
    } catch (e) {
      console.error(
        `Unable to establish a collection handle in moviesDAO: ${e}`,
      );
    }
  }
}
