const Joi = require("joi");

class CollectionValidation {
    create(data) {
        const schema = Joi.object({
            name: Joi.string().min(3).max(255).required(),
            category: Joi.string().min(3).max(100).required(),
            description: Joi.string().required(),
        });

        return schema.validate(data);
    }
}

module.exports = new CollectionValidation();
