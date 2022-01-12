// @ts-nocheck
// no types for mailersend :(
import MailerSend from 'mailersend';

interface MailOptions {
    fromName: string;
    fromMail: string;
    toName: string;
    toMail: string;
    subject: string;
    body: string;
}

export const sendMail = async (opts: MailOptions) => {
    const { Recipient, EmailParams } = MailerSend;

    const mailersend = new MailerSend({
        api_key: process.env.MAILERSEND_TOKEN,
    });

    const params = new EmailParams()
        .setFrom(opts.fromMail)
        .setFromName(opts.fromName)
        .setRecipients([new Recipient(opts.toMail, opts.toName)])
        .setSubject(opts.subject)
        .setHtml(opts.body)
        .setText(opts.body);

    return mailersend.send(params);
}