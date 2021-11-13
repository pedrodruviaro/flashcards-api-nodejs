const { v4: uuid } = require("uuid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const AuthValidation = require("../services/AuthValidation");
const User = require("../models/User");

class AuthController {
    async register(req, res) {
        const { error } = AuthValidation.register(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        try {
            const emailExists = await User.findOne({
                where: {
                    email: req.body.email,
                },
            });

            if (emailExists) {
                return res
                    .status(400)
                    .json({ error: "Email already registered " });
            }
        } catch (err) {
            return res.status(500).json({ error: err });
        }

        try {
            const salt = await bcrypt.genSalt();
            const hashedPass = await bcrypt.hash(req.body.password, salt);

            const newUser = {
                id: uuid(),
                name: req.body.name,
                email: req.body.email,
                password: hashedPass,
            };

            const savedUser = await User.create(newUser);
            const { password, ...rest } = savedUser.dataValues;
            return res.status(201).json({ ...rest });
        } catch (error) {
            return res.status(500).json({ error: err });
        }
    }

    async login(req, res) {
        const { error } = AuthValidation.login(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        try {
            const user = await User.findOne({
                where: {
                    email: req.body.email,
                },
            });

            if (!user) {
                return res.status(400).json({ error: "User not found" });
            }

            const passwordIsValid = await bcrypt.compare(
                req.body.password,
                user.password
            );
            if (!passwordIsValid) {
                return res.status(400).json({ error: "Wrong password" });
            }

            const token = jwt.sign(
                { userId: user.id },
                process.env.TOKEN_SECRET,
                {
                    expiresIn: 86400,
                }
            );

            const { name } = user.dataValues;
            return res.status(200).json({ ok: true, token, name });
        } catch (err) {
            return res.status(500).json({ error: err });
        }
    }

    async verifyToken(req, res) {
        const { userId } = req.user;

        try {
            const user = await User.findByPk(userId);
            const { password, ...rest } = user.dataValues;
            return res.status(200).json({ ...rest });
        } catch (err) {
            return res.status(500).json({ error });
        }
    }
}

module.exports = new AuthController();
