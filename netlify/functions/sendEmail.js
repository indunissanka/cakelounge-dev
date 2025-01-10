const nodemailer = require('nodemailer');

    exports.handler = async (event) => {
      if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
      }

      try {
        const { to, subject, design, copy } = JSON.parse(event.body);

        const transporter = nodemailer.createTransport({
          host: 'smtp.sendgrid.net',
          port: 587,
          secure: false, // Use `true` for 465, `false` for other ports
          auth: {
            user: 'apikey',
            pass: process.env.SENDGRID_API_KEY,
          },
        });

        const mailOptions = {
          from: 'mark@sirilankan.com', // Replace with your verified sender email
          to: [to, copy],
          subject: subject,
          html: design,
        };

        await transporter.sendMail(mailOptions);

        return {
          statusCode: 200,
          body: JSON.stringify({ message: 'Email sent successfully' }),
        };
      } catch (error) {
        console.error('Error sending email:', error);
        return {
          statusCode: 500,
          body: JSON.stringify({ message: 'Failed to send email', error: error.message }),
        };
      }
    };
