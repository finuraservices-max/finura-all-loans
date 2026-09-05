// Netlify function example (serverless) to process form submissions and send notification
// Place this file in netlify/functions/send-notification.js when using Netlify deploys.
// This example logs the submission; to send emails configure an SMTP client or API (SendGrid, Mailgun) and use environment variables.

exports.handler = async function(event, context) {
  try {
    const body = event.body ? JSON.parse(event.body) : {};
    console.log('Form submission received:', body);

    // Example: send email using third-party service here (not configured in this repo)
    // Read SMTP/API keys from environment variables: process.env.SENDGRID_API_KEY, etc.

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Notification processed' })
    };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, body: JSON.stringify({ error: 'Server error' }) };
  }
};
