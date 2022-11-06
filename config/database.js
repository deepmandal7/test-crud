const mongoose = require("mongoose");

const uri =
    "mongodb+srv://notification:wTGD5bvswajOr3yj@cluster0.qbse3.mongodb.net/test-movie-database?retryWrites=true&w=majority";
mongoose.Promise = global.Promise;

mongoose.connect(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
});

mongoose.connection.on("connected", () => {
    console.info("MongoDB connected.");
});

mongoose.connection.on("error", (err) => {
    console.error(err);
    throw new Error("Unable to connect to database.");
});

module.exports = uri;
