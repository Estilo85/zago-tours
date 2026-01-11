import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const JWT_SECRET = (process.env.JWT_SECRET || 'your-secret-key') as jwt.Secret;
const RESET_TOKEN_EXPIRY = (process.env.JWT_EXPIRES_IN ||
  '1h') as jwt.SignOptions['expiresIn'];

export class JwtUtil {
  // Generate password reset token
  static generateResetToken(userId: string): string {
    return jwt.sign({ userId, type: 'password-reset' }, JWT_SECRET, {
      expiresIn: RESET_TOKEN_EXPIRY,
    });
  }

  // Verify and decode reset token
  static verifyResetToken(token: string): { userId: string } | null {
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as any;

      if (decoded.type !== 'password-reset') {
        return null;
      }

      return { userId: decoded.userId };
    } catch (error) {
      return null;
    }
  }

  static generateRandomToken(): string {
    return crypto.randomBytes(32).toString('hex');
  }
}
