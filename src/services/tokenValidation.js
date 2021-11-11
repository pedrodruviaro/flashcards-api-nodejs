const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(403).json({ error: "Token not provided " });
    }

    const parts = authHeader.split(" ");
    if (parts.length !== 2) {
        return res.status(403).json({ error: "Token Error" });
    }

    const [bearer, token] = parts;
    if (!/^Bearer$/i.test(bearer)) {
        return res.status(403).json({ error: "Token Error" });
    }

    jwt.verify(token, process.env.TOKEN_SECRET, (error, decoded) => {
        if (error) {
            return res.status(403).json({ error: "Invalid Token" });
        }

        req.user = decoded;
        next();
    });
};
