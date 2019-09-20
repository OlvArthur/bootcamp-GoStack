import nodemailer from 'nodemailer';
import mailConfig from '../config/mail';

class Mail {
  constructor() {
    const { host, port, secure, auth } = mailConfig;

    this.transporter = nodemailer.createTransport({
      host,
      port,
      secure,

      // Nestes casos o interrogação age com if com condição "auth.user",
      //ação "auth" e then "null"
      auth: auth.user ? auth : null,
    });
  }

  /**
   * Necessario criar um novo metodo para que possa ser possivel
   * somar as mensagens padrões do email com a mensagem em si
   */
  sendMail(message) {
    return this.transporter.sendMail({
      ...mailConfig.default,
      ...message,
    });
  }
}

export default new Mail();
