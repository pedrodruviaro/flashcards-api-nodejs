const Joi = require("joi");

class AuthValidation {
    register(data) {
        const schema = Joi.object({
            name: Joi.string().min(5).max(100).required(),
            email: Joi.string().min(5).max(150).required().email(),
            password: Joi.string().min(6).max(72).required(),
        });

        return schema.validate(data);
    }

    login(data) {
        const schema = Joi.object({
            email: Joi.string().min(5).max(150).required().email(),
            password: Joi.string().min(6).max(72).required(),
        });

        return schema.validate(data);
    }
}

module.exports = new AuthValidation();
