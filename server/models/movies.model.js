const movieSchema = new (require("mongoose").Schema)(
    {
        movie_name: { type: String, trim: true, required: true },
        rating: { type: Number, trim: true, required: false },
        movie_cast: [{ type: String, trim: true, required: false }],
        genre: { type: String, required: false },
        release_date: { type: Date, required: false },
    },
    {
        timestamps: true,
    }
);

const Movie = require("mongoose").model("Movie", movieSchema);

module.exports = Movie;
