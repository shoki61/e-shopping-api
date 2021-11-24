export const verificationCode = (code: string) => `
<!DOCTYPE html>
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
     font-size: 20px;
     padding: 10px 15px;
     border-radius: 10px;
     background-color: #cf00be
   }
   .Container{
     border-radius: 10px;
     background-color: #fafafa;
     padding: 20px;
     margin:auto;
   }
   
</style>
</head>
<body>
  <div class='Container'>
<p>Hi,</p>
  <p>You can complete the account creation process using the verification code below.</p>
  <p>Verification code:</p>
  <p><strong>${code}</strong></p>
</div>
  
</body>
</html> 
`;
