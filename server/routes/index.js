const router = require("express").Router();

const moviesRoute = require("./movies.route");

router.use("/movies", moviesRoute);

module.exports = router;
