export let mailTransport = {
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: process.env.MAIL_SMTP_USER,
        pass: process.env.MAIL_SMTP_PASS,
    }
}