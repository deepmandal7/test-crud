const catchAsync = require("../utils/catchAsync"),
    {
        updateMovie,
        getMovies,
        createMovie,
        deleteMovie,
    } = require("../services");

module.exports.moviesController = catchAsync(async (req, res, next) => {
    if (req.method == "POST") {
        let data = { ...req.body };
        let response = await createMovie(data);
        if (response) {
            res.message = response;
            return next(200);
        }
        res.error = "Failed to create movie";
        return next(500);
    }
    if (req.method == "GET") {
        let query = { ...req.query };
        let response = await getMovies(query);
        if (response) {
            res.message = response;
            return next(200);
        }
        res.error = "Failed to get movies";
        return next(500);
    }
    if (req.method == "PUT") {
        let data = { ...req.body };
        let response = await updateMovie(data);
        if (response) {
            res.message = response;
            return next(200);
        }
        res.error = "Failed to update movie";
        return next(500);
    }
    if (req.method == "DELETE") {
        let data = { ...req.params };
        let response = await deleteMovie(data);
        if (response) {
            res.message = response;
            return next(200);
        }
        res.error = "Failed to delete movie";
        return next(500);
    }
    res.error = "Error occured";
    return next(400);
});
