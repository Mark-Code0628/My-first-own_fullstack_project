import { verifyToken } from '../config/jwt.js';

export const requireAuth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        message: 'Authentication required',
      });
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);

    // decoded tartalma: { userId, role, iat, exp }
    req.user = {
      id: decoded.userId,
      role: decoded.role,
    };

    next();
  } catch (error) {
    return res.status(401).json({
      message: 'Invalid or expired token',
    });
  }
};
