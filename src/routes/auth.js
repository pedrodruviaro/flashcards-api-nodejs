const router = require("express").Router();
const AuthController = require("../controllers/AuthController");

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

module.exports = router;
