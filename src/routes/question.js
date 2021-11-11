const router = require("express").Router();
const tokenValidation = require("../services/tokenValidation");

const QuestionController = require("../controllers/QuestionController");

/*
    POST => /api/question/create/:collectionId
    BODY => question, answer
*/
router.post(
    "/create/:collectionId",
    tokenValidation,
    QuestionController.create
);

module.exports = router;
