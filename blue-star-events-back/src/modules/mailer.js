const nodemailer = require('nodemailer');
const path = require('path');
const { host, port, user, pass } = require('../config/mail.json');

async function setupMailer() {
    const { default: hbs } = await import('nodemailer-express-handlebars');

    const transport = nodemailer.createTransport({
        host,
        port,
        auth: { user, pass },
    });

    transport.use(
        'compile',
        hbs({
            viewEngine: {
                defaultLayout: null,
                partialsDir: path.resolve('./src/resources/mail/'),
            },
            viewPath: path.resolve('./src/resources/mail/'),
            extName: '.html',
        })
    );

    return transport;
}

module.exports = { setupMailer };
