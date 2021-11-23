const sg = require('@sendgrid/mail');

sg.setApiKey(
  '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',
);

const verificationCodeTemplate = (code) => {
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verification</title>
    <style>
     body{
       text-align: center;
       font-family: sans-serif;
       display:flex;
       align-items:center
     }
     strong{
       color: #fff;
       font-size: 18px;
       padding: 10px 15px;
       border-radius: 10px;
       background-color: #cf00be
     }
     .container{
       border-radius: 10px;
       background-color: #ededed;
       padding: 20px;
       margin:auto;
     }
     
  </style>
  </head>
  <body>
    <div class='container'>
  <p>Hi,</p>
    <p>You can complete the account creation process using the verification code below.</p>
    <p>Verification code:</p>
    <p><strong>${code}</strong></p>
  </div>
    
  </body>
  </html>
  `;
};

export const sendVerificationCode = async (to, code) => {
  return await sg.send({
    from: 'orazmuradik@gmail.com',
    to,
    subject: 'Email Verification',
    html: verificationCodeTemplate(code),
  });
};
