import jwt from "jsonwebtoken";

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  // console.log(authHeader)
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  const token = authHeader.split(' ')[1];

  // console.log("Token Received:", token);
  // console.log("JWT_SECRET:", process.env.JWT_SECRET);

  jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
    if (err) {
      console.error("JWT Verification Error:", err);
      return res.status(403).json({ message: 'Invalid token' });
    }

    // console.log("Decoded Token:", decodedToken);
    req.user = decodedToken; // Attach user data to the request
    next();
  });
};

export default authenticateToken;
