const sendEmail = require('../utils/sendemail');
const nodemailer = require('nodemailer');

// Mock Nodemailer
jest.mock('nodemailer');

describe('sendEmail Utility', () => {
  it('should send an email successfully', async () => {
    // Mock the nodemailer.createTransport method
    const sendMailMock = jest.fn().mockResolvedValue('Email Sent');
    nodemailer.createTransport.mockReturnValue({ sendMail: sendMailMock });

    const emailParams = {
      to: 'test@example.com',
      subject: 'Test Email',
      html: '<p>This is a test email</p>',
    };

    await sendEmail(emailParams.to, emailParams.subject, emailParams.html);

    expect(nodemailer.createTransport).toHaveBeenCalled();
    expect(sendMailMock).toHaveBeenCalledWith({
      from: process.env.EMAIL,
      to: emailParams.to,
      subject: emailParams.subject,
      html: emailParams.html,
    });
  });
});
