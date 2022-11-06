const http = require("http");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const logger = require("morgan");
const compression = require("compression");
const api = require("../server/routes");
const { responseHandlerMiddleware } = require("../server/middlewares/index.js");

/** ====== DotENV configuration */
dotenv.config({ path: require("find-config")(".env") });

const configurations = {
    production: { ssl: true, port: process.env.PORT, hostname: "" },
    development: {
        ssl: false,
        port: process.env.PORT,
        hostname: process.env.STAGE_HOSTNAME,
    },
};

const environment = process.env.NODE_ENV || "development";
const config = configurations[environment];

const app = express();

var credentials = {
    // key: fs.readFileSync("/etc/letsencrypt/live/myresorts.in/privkey.pem"),
    // cert: fs.readFileSync("/etc/letsencrypt/live/myresorts.in/fullchain.pem"),
};

// let server = config.ssl
//     ? https.createServer(credentials, app)
//     : http.createServer(app);
let server = http.createServer(app);

app.use(cors());
app.options("*", cors());
app.use(helmet());
app.use(compression());
app.use(logger("dev"));
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true }));
app.set("trust proxy", 1);
// app.use(cookieParser());
// app.use(
//     session({
//         store: new pgSession({
//             pool,
//             tableName: "session",
//         }),
//         name: "user_sid",
//         secret: process.env.SESSION_SECRET,
//         resave: false,
//         cookie: { secure: false, maxAge: 1.2e6 },
//         saveUninitialized: true,
//     })
// );
// app.set("views", path.resolve(__dirname, "../views"));
// app.set("view engine", "ejs");
// app.use(express.static("../public"));
// app.use((req, res, next) => {
//     if (req.cookies.user_sid && !req.session.user) {
//         res.clearCookie("user_sid");
//     }
//     next();
// });

app.use("/api", api);
app.use(responseHandlerMiddleware);

module.exports = server;
