const router = require("express").Router();
const AuthController = require("../controllers/AuthController");
const tokenValidation = require("../services/tokenValidation");

/*
    POST => /api/auth/register
    BODY => name, email, password
*/
router.post("/register", AuthController.register);

/*
    POST => /api/auth/login
    BODY => email, password
*/
router.post("/login", AuthController.login);

/*
    GET => /api/auth/token
*/
router.get("/token", tokenValidation, AuthController.verifyToken);

module.exports = router;
