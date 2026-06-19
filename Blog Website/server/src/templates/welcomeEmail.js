export const welcomeEmailTemplate = (name, email) => {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>Welcome to The Daily Binge</title>
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
<h2 style="margin:0 0 16px 0;color:#18181b;font-family:'Georgia',serif;font-size:22px;font-weight:600;line-height:1.3;">Welcome to the community</h2>

<p style="margin:0 0 20px 0;color:#3f3f46;font-size:15px;line-height:26px;">Hello ${name},</p>

<p style="margin:0 0 20px 0;color:#3f3f46;font-size:15px;line-height:26px;">We are glad to have you with us. Your account under <strong>${email}</strong> is officially active, and you now have access to everything we have been building here at The Daily Binge.</p>

<p style="margin:0 0 30px 0;color:#3f3f46;font-size:15px;line-height:26px;">Our goal is to bring you stories, insights, and updates that genuinely deserve a spot in your daily routine. We hope you find exactly what you are looking for.</p>



<p style="margin:0;color:#3f3f46;font-size:15px;line-height:26px;">We look forward to sharing this space with you.</p>

<p style="margin:24px 0 0 0;color:#71717a;font-size:15px;font-style:italic;">Warm regards,<br>The Daily Binge</p>
</td>
</tr>

<tr>
<td style="padding:30px 40px;background:#fafafa;border-top:1px solid #e4e4e7;">
<table width="100%" cellpadding="0" cellspacing="0">
<tr><td style="color:#71717a;font-size:13px;line-height:20px;">Have questions or feedback? Feel free to reach out to us by replying directly to this email.</td></tr>
<tr><td style="padding-top:16px;color:#a1a1aa;font-size:12px;line-height:18px;">&copy; ${new Date().getFullYear()} The Daily Binge. All rights reserved.<br/>You received this email because you signed up for an account on our platform.</td></tr>
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