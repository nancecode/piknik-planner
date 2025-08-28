import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "piknik-secret";

export const verifyJWTAuth = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
        const token = authHeader.split(" ")[1];
        try {
            req.user = jwt.verify(token, JWT_SECRET);
            next();
        } catch (err) {
            return res.status(401).json({ error: "Invalid or expired token" });
        }
    } else {
        return res.status(401).json({ error: "Authorization header missing or malformed" });
    }
}