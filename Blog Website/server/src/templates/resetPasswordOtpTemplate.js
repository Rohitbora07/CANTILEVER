export const passwordResetOtpTemplate = (name, email, otp) => {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>Password Reset Request - The Daily Binge</title>
</head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;padding:50px 20px;">
<tr><td align="center">
<table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.04);border:1px solid #e2e8f0;">
<tr><td style="background:#18181b;height:6px;font-size:0;line-height:0;">&nbsp;</td></tr>

<tr>
<td style="padding:40px 40px 20px 40px;text-align:left;">
<span style="font-family:'Georgia',serif;font-size:24px;font-weight:700;color:#18181b;letter-spacing:-0.5px;">THE DAILY BINGE</span>
<div style="margin-top:12px;width:40px;height:2px;background:#18181b;"></div>
</td>
</tr>

<tr>
<td style="padding:20px 40px 40px 40px;">
<h2 style="margin:0 0 16px 0;color:#18181b;font-family:'Georgia',serif;font-size:22px;font-weight:600;line-height:1.3;">Password Reset Request</h2>

<p style="margin:0 0 20px 0;color:#3f3f46;font-size:15px;line-height:26px;">Hello ${name},</p>

<p style="margin:0 0 30px 0;color:#3f3f46;font-size:15px;line-height:26px;">We received a request to reset the password for the account associated with <strong>${email}</strong>. Please use the verification code below to authorize this change.</p>

<div style="margin:35px 0;text-align:center;">
<div style="display:inline-block;padding:16px 36px;background:#f4f4f5;color:#18181b;font-size:34px;font-weight:700;letter-spacing:8px;border-radius:8px;font-family:'Courier New',Courier,monospace;border:1px solid #e4e4e7;">${otp}</div>
</div>

<p style="margin:0 0 25px 0;color:#71717a;font-size:14px;line-height:24px;text-align:center;">This code will expire in <strong>10 minutes</strong> and can only be used once.</p>

<div style="margin-top:35px;padding:20px;background:#fafafa;border:1px solid #e4e4e7;border-radius:6px;">
<p style="margin:0;color:#71717a;font-size:13px;line-height:22px;"><strong>Security Note:</strong> If you did not request a password reset, you can safely ignore this email. Your current password remains secure, and no changes have been made to your account.</p>
</div>
</td>
</tr>

<tr>
<td style="padding:30px 40px;background:#fafafa;border-top:1px solid #e4e4e7;">
<table width="100%" cellpadding="0" cellspacing="0">
<tr><td style="padding-top:16px;color:#a1a1aa;font-size:12px;line-height:18px;">&copy; ${new Date().getFullYear()} The Daily Binge. All rights reserved.<br/>This is an automated security notification regarding your account.</td></tr>
</table>
</td>
</tr>

</table>
</td></tr>
</table>
</body>
</html>
`;
};