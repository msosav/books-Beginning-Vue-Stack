import MoviesController from "./controllers/MoviesController.js";

export default class MoviesRoute {
  static configRoutes(router) {
    router.route("/").get(MoviesController.apiGetMovies);
    return router;
  }
}
