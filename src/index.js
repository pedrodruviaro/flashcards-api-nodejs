const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const sequelize = require("./infra/sequelize");
require("dotenv").config();

// MODELS
const User = require("./models/User");
const Collection = require("./models/Collection");
const Question = require("./models/Question");

User.hasMany(Collection);
Collection.belongsTo(User);

Collection.hasMany(Question);
Question.belongsTo(Collection);

// User.sync({ force: true });
// Collection.sync({ force: true });
// Question.sync({ force: true });

const server = express();
const PORT = process.env.PORT || 5000;

server.use(express.json());
server.use(cors({ origin: "*" }));
server.use(morgan("dev"));

(async () => {
    try {
        await sequelize.authenticate();
        server.listen(PORT, () =>
            console.log(`Server running on port ${PORT}`)
        );
    } catch (err) {
        console.log(err);
    }
})();

// ROUTES
server.use("/api/auth", require("./routes/auth"));
server.use("/api/collection", require("./routes/collection"));
server.use("/api/question", require("./routes/question"));
