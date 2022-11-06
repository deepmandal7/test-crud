const router = require("express").Router();

const { moviesController } = require("../controllers");

router
    .route("/")
    .post(moviesController)
    .get(moviesController)
    .put(moviesController);
router.route("/:_id").delete(moviesController);

module.exports = router;
