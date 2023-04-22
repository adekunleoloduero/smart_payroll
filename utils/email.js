const nodemailer = require('nodemailer');
const config = require('../configs/index');




exports.sendPasswordResetLink = async function(data) {
    //Create transport object
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: config.GOOGLE_MAIL_USERNAME,
          pass: config.GOOGLE_MAIL_PASSWORD,
          clientId: config.GOOGLE_0AUTH2_CLIENT_ID,
          clientSecret: config.GOOGLE_0AUTH2_CLIENT_SECRET,
          refreshToken: config.GOOGLE_0AUTH2_REFRESH_TOKEN
        }        
      });
      
      //Set mail options
      const mailOptions = {
        from: 'dnexteinstein2@gmail.com',
        to: data.email,
        subject: data.subject,
        html: `
        <hp>Hello ${data.name},</p>
        <p>You are getting this email because you requested for a password reset.</p>
        <p>Click <a href="${data.link}" target="_blank">here</a> to reset your password. Alternatively, you can copy and paste the link below into your browser tab:</p>
        <a href="${data.link}" target="_blank">${data.link}</a>
        <p>If the request did not originate from you, please contact the admin immediately at <a href="#">bursar@ekounimed.edu.ng</a></p>
        <p>Thank you.</p><br>
        <p><strong>EkoUNIMED</strong></p>
        `
      };

      transporter.sendMail(mailOptions, (err) => {
        if (err) {
          console.log(err);
        }
      })
}
