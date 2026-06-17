export const welcomeEmailTemplate = (name, verificationLink) => `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Welcome</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:Arial,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
            <td align="center" style="padding:40px 20px;">
                <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;">
                    
                    <tr>
                        <td style="background:#111827;padding:30px;text-align:center;">
                            <h1 style="color:#ffffff;margin:0;">Welcome to Blog 🎉</h1>
                        </td>
                    </tr>

                    <tr>
                        <td style="padding:40px 30px;">
                            <h2 style="color:#111827;">Hello ${name},</h2>

                            <p style="color:#4b5563;font-size:16px;line-height:1.7;">
                                Thank you for joining our community! We're excited to have you on board.
                            </p>

                            <p style="color:#4b5563;font-size:16px;line-height:1.7;">
                                To unlock all features and keep your account secure, please verify your email address.
                            </p>

                            <div style="text-align:center;margin:35px 0;">
                                <a href="${verificationLink}"
                                style="background:#2563eb;color:white;text-decoration:none;padding:14px 28px;border-radius:8px;font-size:16px;font-weight:bold;display:inline-block;">
                                    Verify Email
                                </a>
                            </div>

                            <p style="color:#4b5563;font-size:15px;line-height:1.7;">
                                If the button doesn't work, copy and paste the link below into your browser:
                            </p>

                            <p style="word-break:break-all;color:#2563eb;">
                                ${verificationLink}
                            </p>

                            <p style="color:#4b5563;font-size:16px;line-height:1.7;">
                                We look forward to seeing the amazing content you'll create.
                            </p>

                            <p style="color:#111827;font-weight:bold;">
                                Happy Blogging! 🚀
                            </p>
                        </td>
                    </tr>

                    <tr>
                        <td style="background:#f9fafb;padding:20px;text-align:center;color:#6b7280;font-size:14px;">
                            © ${new Date().getFullYear()} Blog. All rights reserved.
                        </td>
                    </tr>

                </table>
            </td>
        </tr>
    </table>
</body>
</html>
`;