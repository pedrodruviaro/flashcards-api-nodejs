const Joi = require("joi");

class QuestionValidation {
    create(data) {
        const schema = Joi.object({
            question: Joi.string().min(5).required(),
            answer: Joi.string().min(5).required(),
        });

        return schema.validate(data);
    }
}

module.exports = new QuestionValidation();
