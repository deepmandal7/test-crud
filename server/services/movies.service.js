const pool = require("../../config/database"),
    { Movie } = require("../models"),
    { ObjectId } = require("mongoose").Types;

module.exports.createMovie = async (body) => {
    try {
        return await Movie.create(body)
            .then((result) => {
                return result._id;
            })
            .catch((err) => {
                return;
            });
    } catch (err) {
        return;
    }
};

module.exports.getMovies = async (params) => {
    if (params._id) {
        return await Movie.findById(params._id)
            .then((result) => {
                return result;
            })
            .catch((err) => {
                return;
            });
    }
    return await Movie.find()
        .then((result) => {
            return result;
        })
        .catch((err) => {
            return;
        });
};

module.exports.updateMovie = async (body) => {
    try {
        return await Movie.updateOne({ _id: body._id }, body)
            .then((result) => {
                return result;
            })
            .catch((err) => {
                return;
            });
    } catch (err) {
        return;
    }
};

module.exports.deleteMovie = async (params) => {
    try {
        return Movie.deleteOne({ _id: ObjectId(params._id) })
            .then((result) => {
                return result;
            })
            .catch((err) => {
                return;
            });
    } catch (err) {
        return;
    }
};
