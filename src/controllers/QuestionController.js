const QuestioNValidation = require("../services/QuestionValidation");
const Question = require("../models/Question");
const Collection = require("../models/Collection");

class QuestionController {
    async create(req, res) {
        const { userId } = req.user;
        const { collectionId } = req.params;

        const { error } = QuestioNValidation.create(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        try {
            const collection = await Collection.findByPk(collectionId);

            if (collection.userId !== userId) {
                return res.status(200).json({
                    error: "You can only create question on your own collection",
                });
            }

            const newQuestion = {
                collectionId: collectionId,
                question: req.body.question,
                answer: req.body.answer,
            };

            const savedQuestion = await Question.create(newQuestion);
            return res.status(201).json(savedQuestion);
        } catch (error) {
            return res.status(500).json({ error });
        }
    }
}

module.exports = new QuestionController();
