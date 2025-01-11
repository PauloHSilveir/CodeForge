const nodemailer = require('nodemailer');
const { host, port, user, pass } = require('./src/config/mail.json');
const path = require('path');
const crypto = require('crypto');

(async () => {
    const { default: hbs } = await import('nodemailer-express-handlebars');

    const transport = nodemailer.createTransport({
        host,
        port,
        auth: { user, pass },
    });

    transport.use('compile', hbs({
      viewEngine: {
        defaultLayout: null,
        partialsDir: path.resolve('./src/resources/mail/')
      },
      viewPath: path.resolve('./src/resources/mail/'),
      extName: '.html',
    }));
    
    const token = crypto.randomBytes(20).toString('hex');

    async function sendEmail() {
        try {
            const info = await transport.sendMail({
                    to: "paulo@gmail.com",
                    from: 'blue-stars-events@gmail.com',
                    template: 'auth/forgot_password',
                    context: { token },
            });
            console.log('E-mail enviado com sucesso:', info);
        } catch (err) {
            console.error('Erro ao enviar o e-mail:', err);
        }
    }

    sendEmail();

})();