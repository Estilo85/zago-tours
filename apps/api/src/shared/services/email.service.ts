import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export interface EmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
}

let resendInstance: Resend | null = null;

const getResendInstance = (): Resend => {
  if (!resendInstance) {
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      throw new Error('RESEND_API_KEY is not defined in environment variables');
    }

    resendInstance = new Resend(apiKey);
  }

  return resendInstance;
};

export class EmailService {
  private static fromEmail =
    process.env.PARTNERSHIP_EMAIL || 'partnerships@zagotours.com';

  /**
   * Send a single email
   */
  static async sendEmail(options: EmailOptions): Promise<void> {
    try {
      const resend = getResendInstance();
      await resend.emails.send({
        from: this.fromEmail,
        to: options.to,
        subject: options.subject,
        html: options.html,
        text: options.text,
        // reply_to: options.replyTo,
      });
    } catch (error) {
      console.error('Failed to send email:', error);
      throw new Error('Email sending failed');
    }
  }

  /**
   * Send welcome email to new user
   */
  static async sendWelcomeEmail(email: string, name: string): Promise<void> {
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #4F46E5; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; background-color: #f9fafb; }
            .button { display: inline-block; padding: 12px 24px; background-color: #4F46E5; color: white; text-decoration: none; border-radius: 5px; margin-top: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Welcome to Zagotours!</h1>
            </div>
            <div class="content">
              <h2>Hi ${name},</h2>
              <p>Thank you for joining Zagotours! We're excited to have you as part of our adventure community.</p>
              <p>Get ready to explore amazing destinations and create unforgettable memories.</p>
              <a href="${process.env.FRONTEND_URL}/adventures" class="button">Explore Adventures</a>
            </div>
          </div>
        </body>
      </html>
    `;

    await this.sendEmail({
      to: email,
      subject: 'Welcome to Zagotours!',
      html,
    });
  }

  /**
   * Send password reset email
   */
  static async sendPasswordResetEmail(
    email: string,
    resetToken: string,
    name?: string
  ): Promise<void> {
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #4F46E5; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; background-color: #f9fafb; }
            .button { display: inline-block; padding: 12px 24px; background-color: #4F46E5; color: white; text-decoration: none; border-radius: 5px; margin-top: 20px; }
            .warning { background-color: #FEF3C7; padding: 10px; border-left: 4px solid #F59E0B; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Password Reset Request</h1>
            </div>
            <div class="content">
              <h2>Hi ${name},</h2>
              <p>We received a request to reset your password. Click the button below to create a new password:</p>
              <a href="${resetUrl}" class="button">Reset Password</a>
              <div class="warning">
                <strong>Security Note:</strong> This link will expire in 1 hour. If you didn't request this reset, please ignore this email.
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    await this.sendEmail({
      to: email,
      subject: 'Reset Your Password - Zagotours',
      html,
    });
  }

  /**
   * Send trip planning call confirmation
   */
  static async sendCallConfirmation(
    email: string,
    name: string,
    callDetails: {
      agentName: string;
      startTime: Date;
      meetingLink?: string;
    }
  ): Promise<void> {
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #10B981; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; background-color: #f9fafb; }
            .details { background-color: white; padding: 15px; margin: 20px 0; border-radius: 5px; }
            .button { display: inline-block; padding: 12px 24px; background-color: #10B981; color: white; text-decoration: none; border-radius: 5px; margin-top: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Trip Planning Call Confirmed!</h1>
            </div>
            <div class="content">
              <h2>Hi ${name},</h2>
              <p>Your trip planning call has been scheduled!</p>
              <div class="details">
                <p><strong>Agent:</strong> ${callDetails.agentName}</p>
                <p><strong>Date & Time:</strong> ${new Date(callDetails.startTime).toLocaleString()}</p>
                ${callDetails.meetingLink ? `<p><strong>Meeting Link:</strong> <a href="${callDetails.meetingLink}">${callDetails.meetingLink}</a></p>` : ''}
              </div>
              ${callDetails.meetingLink ? `<a href="${callDetails.meetingLink}" class="button">Join Meeting</a>` : ''}
            </div>
          </div>
        </body>
      </html>
    `;

    await this.sendEmail({
      to: email,
      subject: 'Trip Planning Call Confirmed - Zagotours',
      html,
    });
  }

  /**
   * Send inquiry confirmation
   */
  static async sendInquiryConfirmation(email: string): Promise<void> {
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #4F46E5; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; background-color: #f9fafb; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>We've Received Your Inquiry</h1>
            </div>
            <div class="content">
              <h2>Thank you for reaching out!</h2>
              <p>We've received your inquiry and our team will get back to you within 24 hours.</p>
              <p>In the meantime, feel free to explore our adventures and community.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    await this.sendEmail({
      to: email,
      subject: 'We Received Your Inquiry - Zagotours',
      html,
    });
  }

  /**
   * Send contract signing notification
   */
  static async sendContractNotification(
    email: string,
    name: string,
    documentUrl: string
  ): Promise<void> {
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #4F46E5; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; background-color: #f9fafb; }
            .button { display: inline-block; padding: 12px 24px; background-color: #4F46E5; color: white; text-decoration: none; border-radius: 5px; margin-top: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Contract Ready for Signature</h1>
            </div>
            <div class="content">
              <h2>Hi ${name},</h2>
              <p>Your contract is ready for review and signature.</p>
              <a href="${documentUrl}" class="button">View & Sign Contract</a>
            </div>
          </div>
        </body>
      </html>
    `;

    await this.sendEmail({
      to: email,
      subject: 'Contract Ready for Signature - Zagotours',
      html,
    });
  }
}
