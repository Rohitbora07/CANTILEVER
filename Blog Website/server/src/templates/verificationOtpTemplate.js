export const verificationOtpTemplate = (name, otp) => {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Email Verification</title>
</head>

<body style="margin:0;padding:0;background:#f4f4f5;font-family:Arial,Helvetica,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:40px 20px;">
<tr>
<td align="center">

<table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:18px;overflow:hidden;box-shadow:0 12px 40px rgba(0,0,0,.08);">

<tr>
<td style="background:linear-gradient(135deg,#18181b,#27272a);padding:40px;text-align:center;">
<h1 style="margin:0;color:#ffffff;font-size:32px;font-weight:700;">
📖 The Daily Binge
</h1>

<p style="margin-top:12px;color:#d4d4d8;font-size:16px;">
Verify your email address
</p>
</td>
</tr>

<tr>
<td style="padding:45px;">

<h2 style="margin:0;color:#18181b;font-size:28px;">
Hello ${name},
</h2>

<p style="margin-top:20px;color:#52525b;font-size:16px;line-height:28px;">
Welcome to <strong>The Daily Binge</strong> 🎉
</p>

<p style="color:#52525b;font-size:16px;line-height:28px;">
Use the verification code below to complete your registration.
</p>

<div style="margin:40px 0;text-align:center;">

<div style="
display:inline-block;
padding:18px 40px;
background:#18181b;
color:#ffffff;
font-size:38px;
font-weight:700;
letter-spacing:10px;
border-radius:12px;
font-family:monospace;
">
${otp}
</div>

</div>

<p style="color:#52525b;font-size:15px;line-height:28px;">
This code is valid for
<strong>10 minutes</strong>.
Do not share it with anyone.
</p>

<div style="
margin-top:35px;
padding:18px;
background:#fafafa;
border-left:4px solid #18181b;
border-radius:8px;
">

<p style="margin:0;color:#52525b;font-size:14px;line-height:24px;">
If you didn't create an account, you can safely ignore this email.
</p>

</div>

</td>
</tr>

<tr>
<td style="padding:30px;background:#fafafa;text-align:center;border-top:1px solid #e4e4e7;">

<p style="margin:0;color:#71717a;font-size:13px;">
Need help? Reply to this email anytime.
</p>

<p style="margin-top:8px;color:#a1a1aa;font-size:12px;">
© ${new Date().getFullYear()} The Daily Binge. All rights reserved.
</p>

</td>
</tr>

</table>

</td>
</tr>
</table>

</body>
</html>
`;
};