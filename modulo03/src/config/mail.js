export default {
  host: 'smtp.mailtrap.io',
  port: 2525,
  secure: false,
  auth: {
    user: 'b652154a2f27bf',
    pass: '120424d0220304',
  },
  default: {
    from: 'Equipe GoBarber <noreply@gobarber.com>',
  },
};

/**
 *
 * Serviço de email disponiveis
  Amazon SES
  Mailgun
  Sparkpost
  Mandril (Mailchimp)

Disponivel mas com limite
  Gmail

Serviço utilizado neste projeto pois funciona apenas para desenvolvimento
  Mailtrap (DEV)
 */
