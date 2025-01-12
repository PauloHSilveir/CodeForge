const { setupMailer } = require('../modules/mailer');

async function sendForgotPasswordEmail(email, resetLink) {
    try {
        const transport = await setupMailer();
        const info = await transport.sendMail({
            to: email,
            from: 'blue-stars-events@gmail.com',
            subject: 'Redefinição de Senha - Blue Stars Events',
            template: 'auth/forgot_password',
            context: { resetLink },
        });

        console.log('E-mail enviado com sucesso:', info);
        return { success: true, info };
    } catch (error) {
        console.error('Erro ao enviar o e-mail:', error);
        return { success: false, error };
    }
}
function generatePasswordResetLink(token, email) {
    const baseUrl = 'http://localhost:5173/criarnovasenha'; 
    return `${baseUrl}?token=${token}&email=${encodeURIComponent(email)}`;
}



module.exports = { sendForgotPasswordEmail, generatePasswordResetLink };
