export class EmailService {
  static async sendPasswordResetEmail(
    email: string,
    resetToken: string
  ): Promise<void> {
    const resetUrl = `${process.env.CLIENT_URL}/reset-password?token=${resetToken}`;

    // TODO: Replace with your email provider (SendGrid, Resend, Nodemailer, etc.)
    console.log(`
      ===================================
      Password Reset Email
      ===================================
      To: ${email}
      Reset URL: ${resetUrl}
      ===================================
    `);

    // Example with Nodemailer or Resend:
    /*
    await transporter.sendMail({
      from: 'noreply@zagotours.com',
      to: email,
      subject: 'Password Reset Request',
      html: `
        <h1>Reset Your Password</h1>
        <p>Click the link below to reset your password:</p>
        <a href="${resetUrl}">Reset Password</a>
        <p>This link expires in 1 hour.</p>
        <p>If you didn't request this, please ignore this email.</p>
      `,
    });
    */
  }
}
