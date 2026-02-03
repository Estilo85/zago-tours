import { Resend } from 'resend';

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
    name?: string,
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
   * Send admin notification for new general inquiry
   */
  static async sendAdminInquiryNotification(inquiryData: {
    email: string;
    message: string;
    phone?: string;
    address?: string;
    createdAt: Date;
  }): Promise<void> {
    const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #EF4444; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background-color: #f9fafb; }
          .inquiry-details { background-color: white; padding: 15px; margin: 20px 0; border-radius: 5px; border-left: 4px solid #EF4444; }
          .detail-row { padding: 8px 0; border-bottom: 1px solid #e5e7eb; }
          .detail-row:last-child { border-bottom: none; }
          .label { font-weight: bold; color: #6b7280; display: inline-block; width: 100px; }
          .value { color: #111827; }
          .message-box { background-color: #fef2f2; padding: 15px; margin: 15px 0; border-radius: 5px; white-space: pre-wrap; word-wrap: break-word; }
          .timestamp { color: #6b7280; font-size: 12px; text-align: center; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🔔 New General Inquiry</h1>
          </div>
          <div class="content">
            <p>A new general inquiry has been submitted on Zagotours.</p>
            
            <div class="inquiry-details">
              <div class="detail-row">
                <span class="label">From:</span>
                <span class="value">${inquiryData.email}</span>
              </div>
              ${
                inquiryData.phone
                  ? `
              <div class="detail-row">
                <span class="label">Phone:</span>
                <span class="value">${inquiryData.phone}</span>
              </div>
              `
                  : ''
              }
              ${
                inquiryData.address
                  ? `
              <div class="detail-row">
                <span class="label">Address:</span>
                <span class="value">${inquiryData.address}</span>
              </div>
              `
                  : ''
              }
              <div class="detail-row">
                <span class="label">Submitted:</span>
                <span class="value">${new Date(
                  inquiryData.createdAt,
                ).toLocaleString('en-US', {
                  dateStyle: 'medium',
                  timeStyle: 'short',
                })}</span>
              </div>
            </div>

            <h3>Message:</h3>
            <div class="message-box">
              ${inquiryData.message}
            </div>

            <div class="timestamp">
              <p>This is an automated notification from Zagotours Admin System</p>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;

    await this.sendEmail({
      to: this.fromEmail,
      subject: `New Inquiry from ${inquiryData.email} - Zagotours`,
      html,
    });
  }

  /**
   * Send trip planning call confirmation (no agent assigned yet)
   */
  static async sendCallConfirmation(
    email: string,
    name: string,
    callDetails: {
      startTime: Date;
      meetingLink?: string;
    },
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
          .info-box { background-color: #DBEAFE; padding: 15px; margin: 15px 0; border-radius: 5px; border-left: 4px solid #3B82F6; }
          .button { display: inline-block; padding: 12px 24px; background-color: #10B981; color: white; text-decoration: none; border-radius: 5px; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Trip Planning Call Request Received!</h1>
          </div>
          <div class="content">
            <h2>Hi ${name},</h2>
            <p>We've received your trip planning call request!</p>
            
            <div class="info-box">
              <strong>What's Next?</strong>
              <p>Our team will assign an agent to your call and send you their details shortly. You'll receive a confirmation email once an agent has been assigned.</p>
            </div>
            
            <div class="details">
              <p><strong>Requested Date & Time:</strong> ${new Date(
                callDetails.startTime,
              ).toLocaleString('en-US', {
                dateStyle: 'full',
                timeStyle: 'short',
              })}</p>
              ${callDetails.meetingLink ? `<p><strong>Meeting Link:</strong> <a href="${callDetails.meetingLink}">${callDetails.meetingLink}</a></p>` : ''}
            </div>

            <p style="margin-top: 20px;">We're excited to help plan your adventure!</p>
          </div>
        </div>
      </body>
    </html>
  `;

    await this.sendEmail({
      to: email,
      subject: 'Trip Planning Call Request Received - Zagotours',
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
    documentUrl: string,
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

  /**
   * Send contract signed notification to admin
   */
  static async sendContractSignedNotification(contractData: {
    userEmail: string;
    userName: string;
    contractId: string;
    signedAt: Date;
    agreement: string;
  }): Promise<void> {
    const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #10B981; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background-color: #f9fafb; }
          .contract-details { background-color: white; padding: 15px; margin: 20px 0; border-radius: 5px; border-left: 4px solid #10B981; }
          .detail-row { padding: 8px 0; border-bottom: 1px solid #e5e7eb; }
          .detail-row:last-child { border-bottom: none; }
          .label { font-weight: bold; color: #6b7280; display: inline-block; width: 120px; }
          .value { color: #111827; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>✅ Contract Signed</h1>
          </div>
          <div class="content">
            <p>A contract has been signed on Zagotours.</p>
            
            <div class="contract-details">
              <div class="detail-row">
                <span class="label">User:</span>
                <span class="value">${contractData.userName}</span>
              </div>
              <div class="detail-row">
                <span class="label">Email:</span>
                <span class="value">${contractData.userEmail}</span>
              </div>
              <div class="detail-row">
                <span class="label">Contract ID:</span>
                <span class="value">${contractData.contractId}</span>
              </div>
              <div class="detail-row">
                <span class="label">Signed At:</span>
                <span class="value">${new Date(
                  contractData.signedAt,
                ).toLocaleString('en-US', {
                  dateStyle: 'medium',
                  timeStyle: 'short',
                })}</span>
              </div>
              <div class="detail-row">
                <span class="label">Agreement:</span>
                <span class="value">${contractData.agreement}</span>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;

    await this.sendEmail({
      to: this.fromEmail,
      subject: `Contract Signed - ${contractData.userName}`,
      html,
    });
  }

  /**
   * Send contract signed confirmation to user
   */
  static async sendContractSignedConfirmation(
    email: string,
    name: string,
    documentUrl: string,
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
          .button { display: inline-block; padding: 12px 24px; background-color: #10B981; color: white; text-decoration: none; border-radius: 5px; margin-top: 20px; }
          .info-box { background-color: #DBEAFE; padding: 15px; margin: 15px 0; border-radius: 5px; border-left: 4px solid #3B82F6; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Contract Successfully Signed</h1>
          </div>
          <div class="content">
            <h2>Hi ${name},</h2>
            <p>Your contract has been successfully signed and processed.</p>
            
            <div class="info-box">
              <strong>What's Next?</strong>
              <p>You can download a copy of your signed contract using the button below. Keep this for your records.</p>
            </div>
            
            <a href="${documentUrl}" class="button">Download Contract</a>
            
            <p style="margin-top: 20px;">If you have any questions, feel free to reach out to our team.</p>
          </div>
        </div>
      </body>
    </html>
  `;

    await this.sendEmail({
      to: email,
      subject: 'Contract Signed Successfully - Zagotours',
      html,
    });
  }

  /**
   * Send trip request notification to assigned agent
   */
  static async sendTripRequestNotification(
    agentEmail: string,
    agentName: string,
    requestData: {
      adventurerName: string;
      adventurerEmail: string;
      tripType: string;
      destination: string;
      date: Date;
      preferences: string;
      requestId: string;
    },
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
          .request-details { background-color: white; padding: 15px; margin: 20px 0; border-radius: 5px; border-left: 4px solid #4F46E5; }
          .detail-row { padding: 8px 0; border-bottom: 1px solid #e5e7eb; }
          .detail-row:last-child { border-bottom: none; }
          .label { font-weight: bold; color: #6b7280; display: inline-block; width: 130px; }
          .value { color: #111827; }
          .preferences-box { background-color: #fef3c7; padding: 15px; margin: 15px 0; border-radius: 5px; white-space: pre-wrap; word-wrap: break-word; }
          .button { display: inline-block; padding: 12px 24px; background-color: #4F46E5; color: white; text-decoration: none; border-radius: 5px; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🌍 New Trip Request Assigned</h1>
          </div>
          <div class="content">
            <h2>Hi ${agentName},</h2>
            <p>You have a new trip request from one of your referrals!</p>
            
            <div class="request-details">
              <div class="detail-row">
                <span class="label">Adventurer:</span>
                <span class="value">${requestData.adventurerName}</span>
              </div>
              <div class="detail-row">
                <span class="label">Email:</span>
                <span class="value">${requestData.adventurerEmail}</span>
              </div>
              <div class="detail-row">
                <span class="label">Trip Type:</span>
                <span class="value">${requestData.tripType}</span>
              </div>
              <div class="detail-row">
                <span class="label">Destination:</span>
                <span class="value">${requestData.destination}</span>
              </div>
              <div class="detail-row">
                <span class="label">Preferred Date:</span>
                <span class="value">${new Date(
                  requestData.date,
                ).toLocaleDateString('en-US', {
                  dateStyle: 'long',
                })}</span>
              </div>
              <div class="detail-row">
                <span class="label">Request ID:</span>
                <span class="value">${requestData.requestId}</span>
              </div>
            </div>

            <h3>Trip Preferences:</h3>
            <div class="preferences-box">
              ${requestData.preferences}
            </div>

            <a href="${process.env.FRONTEND_URL}/agent/trip-requests/${requestData.requestId}" class="button">View Request Details</a>
            
            <p style="margin-top: 20px;">Please reach out to ${requestData.adventurerName} to discuss their trip requirements.</p>
          </div>
        </div>
      </body>
    </html>
  `;

    await this.sendEmail({
      to: agentEmail,
      subject: `New Trip Request: ${requestData.destination} - Zagotours`,
      html,
    });
  }

  /**
   * Send callback request notification to assigned agent
   */
  static async sendCallbackRequestNotification(
    agentEmail: string,
    agentName: string,
    requestData: {
      requestorName: string;
      requestorEmail: string;
      requestorPhone: string;
      bestTime: string;
      requestId: string;
      isRegisteredUser: boolean;
    },
  ): Promise<void> {
    const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #F59E0B; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background-color: #f9fafb; }
          .request-details { background-color: white; padding: 15px; margin: 20px 0; border-radius: 5px; border-left: 4px solid #F59E0B; }
          .detail-row { padding: 8px 0; border-bottom: 1px solid #e5e7eb; }
          .detail-row:last-child { border-bottom: none; }
          .label { font-weight: bold; color: #6b7280; display: inline-block; width: 130px; }
          .value { color: #111827; }
          .badge { display: inline-block; padding: 4px 12px; background-color: #DBEAFE; color: #1E40AF; border-radius: 12px; font-size: 12px; font-weight: bold; }
          .button { display: inline-block; padding: 12px 24px; background-color: #F59E0B; color: white; text-decoration: none; border-radius: 5px; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>📞 New Callback Request</h1>
          </div>
          <div class="content">
            <h2>Hi ${agentName},</h2>
            <p>You have a new callback request from ${requestData.isRegisteredUser ? 'one of your referrals' : 'a potential client'}!</p>
            
            ${requestData.isRegisteredUser ? '<span class="badge">Registered User</span>' : '<span class="badge" style="background-color: #FEF3C7; color: #92400E;">New Lead</span>'}
            
            <div class="request-details">
              <div class="detail-row">
                <span class="label">Name:</span>
                <span class="value">${requestData.requestorName}</span>
              </div>
              <div class="detail-row">
                <span class="label">Email:</span>
                <span class="value">${requestData.requestorEmail}</span>
              </div>
              <div class="detail-row">
                <span class="label">Phone:</span>
                <span class="value">${requestData.requestorPhone}</span>
              </div>
              <div class="detail-row">
                <span class="label">Best Time to Call:</span>
                <span class="value">${requestData.bestTime}</span>
              </div>
              <div class="detail-row">
                <span class="label">Request ID:</span>
                <span class="value">${requestData.requestId}</span>
              </div>
            </div>

            <a href="${process.env.FRONTEND_URL}/agent/callback-requests/${requestData.requestId}" class="button">View Request Details</a>
            
            <p style="margin-top: 20px;">Please reach out to ${requestData.requestorName} at their preferred time to discuss their travel needs.</p>
          </div>
        </div>
      </body>
    </html>
  `;

    await this.sendEmail({
      to: agentEmail,
      subject: `New Callback Request from ${requestData.requestorName} - Zagotours`,
      html,
    });
  }

  /**
   * Send admin notification for new trip planning call request
   */
  static async sendAdminNewCallRequest(callData: {
    adventurerName: string;
    adventurerEmail: string;
    adventurerPhone?: string;
    startTime: Date;
    endTime: Date;
    meetingLink?: string;
    callId: string;
    createdAt: Date;
  }): Promise<void> {
    const html = `
  <!DOCTYPE html>
  <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #DC2626; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background-color: #f9fafb; }
        .call-details { background-color: white; padding: 15px; margin: 20px 0; border-radius: 5px; border-left: 4px solid #DC2626; }
        .detail-row { padding: 8px 0; border-bottom: 1px solid #e5e7eb; }
        .detail-row:last-child { border-bottom: none; }
        .label { font-weight: bold; color: #6b7280; display: inline-block; width: 150px; }
        .value { color: #111827; }
        .alert-box { background-color: #FEF2F2; padding: 15px; margin: 15px 0; border-radius: 5px; border-left: 4px solid #DC2626; }
        .button { display: inline-block; padding: 12px 24px; background-color: #DC2626; color: white; text-decoration: none; border-radius: 5px; margin-top: 20px; }
        .timestamp { color: #6b7280; font-size: 12px; text-align: center; margin-top: 20px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🔔 New Trip Planning Call Request</h1>
        </div>
        <div class="content">
          <div class="alert-box">
            <strong>⚠️ Action Required:</strong> A new trip planning call has been requested. Please assign an agent.
          </div>
          
          <div class="call-details">
            <div class="detail-row">
              <span class="label">Adventurer:</span>
              <span class="value">${callData.adventurerName}</span>
            </div>
            <div class="detail-row">
              <span class="label">Email:</span>
              <span class="value">${callData.adventurerEmail}</span>
            </div>
            ${
              callData.adventurerPhone
                ? `
            <div class="detail-row">
              <span class="label">Phone:</span>
              <span class="value">${callData.adventurerPhone}</span>
            </div>
            `
                : ''
            }
            <div class="detail-row">
              <span class="label">Requested Start Time:</span>
              <span class="value">${new Date(callData.startTime).toLocaleString(
                'en-US',
                {
                  dateStyle: 'full',
                  timeStyle: 'short',
                },
              )}</span>
            </div>
            <div class="detail-row">
              <span class="label">Duration:</span>
              <span class="value">${Math.round((new Date(callData.endTime).getTime() - new Date(callData.startTime).getTime()) / (1000 * 60))} minutes</span>
            </div>
            ${
              callData.meetingLink
                ? `
            <div class="detail-row">
              <span class="label">Meeting Link:</span>
              <span class="value"><a href="${callData.meetingLink}">${callData.meetingLink}</a></span>
            </div>
            `
                : ''
            }
            <div class="detail-row">
              <span class="label">Call ID:</span>
              <span class="value">${callData.callId}</span>
            </div>
            <div class="detail-row">
              <span class="label">Submitted:</span>
              <span class="value">${new Date(callData.createdAt).toLocaleString(
                'en-US',
                {
                  dateStyle: 'medium',
                  timeStyle: 'short',
                },
              )}</span>
            </div>
          </div>

          <a href="${process.env.ADMIN_URL || process.env.FRONTEND_URL}/admin/calls/${callData.callId}" class="button">Assign Agent</a>
          
          <div class="timestamp">
            <p>This is an automated notification from Zagotours Admin System</p>
          </div>
        </div>
      </div>
    </body>
  </html>
  `;

    await this.sendEmail({
      to: this.fromEmail,
      subject: `New Call Request - ${callData.adventurerName} - Zagotours`,
      html,
    });
  }

  /**
   * Send admin notification for new trip request
   */
  static async sendAdminNewTripRequest(requestData: {
    adventurerName: string;
    adventurerEmail: string;
    tripType: string;
    destination: string;
    date: Date;
    preferences?: string;
    requestId: string;
    createdAt: Date;
  }): Promise<void> {
    const html = `
  <!DOCTYPE html>
  <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #DC2626; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background-color: #f9fafb; }
        .request-details { background-color: white; padding: 15px; margin: 20px 0; border-radius: 5px; border-left: 4px solid #DC2626; }
        .detail-row { padding: 8px 0; border-bottom: 1px solid #e5e7eb; }
        .detail-row:last-child { border-bottom: none; }
        .label { font-weight: bold; color: #6b7280; display: inline-block; width: 150px; }
        .value { color: #111827; }
        .alert-box { background-color: #FEF2F2; padding: 15px; margin: 15px 0; border-radius: 5px; border-left: 4px solid #DC2626; }
        .preferences-box { background-color: #fef3c7; padding: 15px; margin: 15px 0; border-radius: 5px; white-space: pre-wrap; word-wrap: break-word; }
        .button { display: inline-block; padding: 12px 24px; background-color: #DC2626; color: white; text-decoration: none; border-radius: 5px; margin-top: 20px; }
        .timestamp { color: #6b7280; font-size: 12px; text-align: center; margin-top: 20px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🔔 New Trip Request</h1>
        </div>
        <div class="content">
          <div class="alert-box">
            <strong>⚠️ Action Required:</strong> A new trip request has been submitted. Please assign an agent.
          </div>
          
          <div class="request-details">
            <div class="detail-row">
              <span class="label">Adventurer:</span>
              <span class="value">${requestData.adventurerName}</span>
            </div>
            <div class="detail-row">
              <span class="label">Email:</span>
              <span class="value">${requestData.adventurerEmail}</span>
            </div>
            <div class="detail-row">
              <span class="label">Trip Type:</span>
              <span class="value">${requestData.tripType}</span>
            </div>
            <div class="detail-row">
              <span class="label">Destination:</span>
              <span class="value">${requestData.destination}</span>
            </div>
            <div class="detail-row">
              <span class="label">Preferred Date:</span>
              <span class="value">${new Date(
                requestData.date,
              ).toLocaleDateString('en-US', {
                dateStyle: 'long',
              })}</span>
            </div>
            <div class="detail-row">
              <span class="label">Request ID:</span>
              <span class="value">${requestData.requestId}</span>
            </div>
            <div class="detail-row">
              <span class="label">Submitted:</span>
              <span class="value">${new Date(
                requestData.createdAt,
              ).toLocaleString('en-US', {
                dateStyle: 'medium',
                timeStyle: 'short',
              })}</span>
            </div>
          </div>

          ${
            requestData.preferences
              ? `
          <h3>Trip Preferences:</h3>
          <div class="preferences-box">
            ${requestData.preferences}
          </div>
          `
              : ''
          }

          <a href="${process.env.ADMIN_URL || process.env.FRONTEND_URL}/admin/trip-requests/${requestData.requestId}" class="button">Assign Agent</a>
          
          <div class="timestamp">
            <p>This is an automated notification from Zagotours Admin System</p>
          </div>
        </div>
      </div>
    </body>
  </html>
  `;

    await this.sendEmail({
      to: this.fromEmail,
      subject: `New Trip Request - ${requestData.destination} - Zagotours`,
      html,
    });
  }
  /**
   * Send anonymous callback notification to admin
   */
  static async sendAnonymousCallbackNotification(callbackData: {
    name: string;
    email: string;
    phone: string;
    bestTime: string;
    requestId: string;
    createdAt: Date;
  }): Promise<void> {
    const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #DC2626; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background-color: #f9fafb; }
          .request-details { background-color: white; padding: 15px; margin: 20px 0; border-radius: 5px; border-left: 4px solid #DC2626; }
          .detail-row { padding: 8px 0; border-bottom: 1px solid #e5e7eb; }
          .detail-row:last-child { border-bottom: none; }
          .label { font-weight: bold; color: #6b7280; display: inline-block; width: 130px; }
          .value { color: #111827; }
          .alert-box { background-color: #FEF2F2; padding: 15px; margin: 15px 0; border-radius: 5px; border-left: 4px solid #DC2626; }
          .timestamp { color: #6b7280; font-size: 12px; text-align: center; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🔔 New Anonymous Callback Request</h1>
          </div>
          <div class="content">
            <div class="alert-box">
              <strong>⚠️ Unassigned Lead:</strong> This callback request is from a visitor who is not registered or referred by any agent.
            </div>
            
            <div class="request-details">
              <div class="detail-row">
                <span class="label">Name:</span>
                <span class="value">${callbackData.name}</span>
              </div>
              <div class="detail-row">
                <span class="label">Email:</span>
                <span class="value">${callbackData.email}</span>
              </div>
              <div class="detail-row">
                <span class="label">Phone:</span>
                <span class="value">${callbackData.phone}</span>
              </div>
              <div class="detail-row">
                <span class="label">Best Time:</span>
                <span class="value">${callbackData.bestTime}</span>
              </div>
              <div class="detail-row">
                <span class="label">Request ID:</span>
                <span class="value">${callbackData.requestId}</span>
              </div>
              <div class="detail-row">
                <span class="label">Submitted:</span>
                <span class="value">${new Date(
                  callbackData.createdAt,
                ).toLocaleString('en-US', {
                  dateStyle: 'medium',
                  timeStyle: 'short',
                })}</span>
              </div>
            </div>

            <p><strong>Action Required:</strong> Please assign this request to an available agent or follow up directly.</p>

            <div class="timestamp">
              <p>This is an automated notification from Zagotours Admin System</p>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;

    await this.sendEmail({
      to: this.fromEmail,
      subject: `Unassigned Callback Request - ${callbackData.name}`,
      html,
    });
  }

  /**
   * Send call rescheduled notification
   */
  static async sendCallRescheduledNotification(
    email: string,
    name: string,
    rescheduleData: {
      agentName: string;
      oldStartTime: Date;
      newStartTime: Date;
      meetingLink?: string;
    },
  ): Promise<void> {
    const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #F59E0B; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background-color: #f9fafb; }
          .time-comparison { background-color: white; padding: 15px; margin: 20px 0; border-radius: 5px; }
          .old-time { text-decoration: line-through; color: #EF4444; }
          .new-time { color: #10B981; font-weight: bold; }
          .button { display: inline-block; padding: 12px 24px; background-color: #F59E0B; color: white; text-decoration: none; border-radius: 5px; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>📅 Call Rescheduled</h1>
          </div>
          <div class="content">
            <h2>Hi ${name},</h2>
            <p>Your trip planning call with ${rescheduleData.agentName} has been rescheduled.</p>
            
            <div class="time-comparison">
              <p><strong>Previous Time:</strong></p>
              <p class="old-time">${new Date(
                rescheduleData.oldStartTime,
              ).toLocaleString('en-US', {
                dateStyle: 'full',
                timeStyle: 'short',
              })}</p>
              
              <p style="margin-top: 15px;"><strong>New Time:</strong></p>
              <p class="new-time">${new Date(
                rescheduleData.newStartTime,
              ).toLocaleString('en-US', {
                dateStyle: 'full',
                timeStyle: 'short',
              })}</p>
            </div>

            ${rescheduleData.meetingLink ? `<a href="${rescheduleData.meetingLink}" class="button">Join Meeting</a>` : ''}
            
            <p style="margin-top: 20px;">Your calendar has been updated with the new time. See you then!</p>
          </div>
        </div>
      </body>
    </html>
  `;

    await this.sendEmail({
      to: email,
      subject: 'Call Rescheduled - Zagotours',
      html,
    });
  }

  /**
   * Send call cancelled notification
   */
  static async sendCallCancelledNotification(
    email: string,
    name: string,
    cancelData: {
      agentName: string;
      startTime: Date;
      reason: string;
    },
  ): Promise<void> {
    const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #EF4444; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background-color: #f9fafb; }
          .cancel-details { background-color: white; padding: 15px; margin: 20px 0; border-radius: 5px; border-left: 4px solid #EF4444; }
          .reason-box { background-color: #FEF2F2; padding: 15px; margin: 15px 0; border-radius: 5px; }
          .button { display: inline-block; padding: 12px 24px; background-color: #4F46E5; color: white; text-decoration: none; border-radius: 5px; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>❌ Call Cancelled</h1>
          </div>
          <div class="content">
            <h2>Hi ${name},</h2>
            <p>Your trip planning call with ${cancelData.agentName} has been cancelled.</p>
            
            <div class="cancel-details">
              <p><strong>Cancelled Call:</strong></p>
              <p>${new Date(cancelData.startTime).toLocaleString('en-US', {
                dateStyle: 'full',
                timeStyle: 'short',
              })}</p>
            </div>

            <div class="reason-box">
              <strong>Reason:</strong>
              <p>${cancelData.reason}</p>
            </div>

            <a href="${process.env.FRONTEND_URL}/schedule-call" class="button">Schedule New Call</a>
            
            <p style="margin-top: 20px;">If you need to reschedule, please reach out or book a new time slot.</p>
          </div>
        </div>
      </body>
    </html>
  `;

    await this.sendEmail({
      to: email,
      subject: 'Call Cancelled - Zagotours',
      html,
    });
  }
}
