require("dotenv").config()
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const session = require("express-session")
const KnexSessionStore = require("connect-session-knex")(session)
const connection = require("../database/connection.js")
const requireAuth = require("../auth/restricted-middleware.js")

const sessionConfig = {
  name: "mmm",
  secret: "secret",
  cookie: {
    maxAge: 1000 * 60 * 10 * 6,
    secure: false,
    httpOnly: true,
  },
  resave: false,
  saveUninitialized: true,
  store: new KnexSessionStore({
    knex: connection,
    createtable: true,
    clearInterval: 1000 * 60 * 60 * 24, // one day
  }),
};

const authRouter = require("../auth/auth-router.js");
const usersRouter = require("../users/users-router.js");

const server = express();

server.use(session(sessionConfig))
server.use(helmet());
server.use(express.json());
server.use(cors());

server.use("/api/auth", authRouter);
server.use("/api/users", requireAuth, usersRouter);

server.get("/", (req, res) => {
  res.json({ api: "up" });
});

module.exports = server;
