/* eslint-disable @typescript-eslint/no-explicit-any */
import nodeMailer, { Transporter } from "nodemailer";
import ejs from "ejs";
import path from "path";
import config from "../configs/environment.config";

interface EmailOptions {
  email: string;
  subject: string;
  template: string;
  data: { [key: string]: any };
}

const sendMail = async (options: EmailOptions): Promise<void> => {
  const transporter: Transporter = nodeMailer.createTransport({
    host: config.getSMTPHost(),
    port: parseInt(config.getSMTPPort()),
    service: config.getSMTPService(),
    auth: {
      user: config.getSMTPMail(),
      pass: config.getSMTPPassword(),
    },
  });

  const { email, subject, template, data } = options;

  //get the email template file
  const templatePath = path.join(__dirname, "../mails", template);

  // Render the email template with EJS
  const html: string = await ejs.renderFile(templatePath, data);

  // Send the email
  await transporter.sendMail({
    from: config.getSMTPMail(),
    to: email,
    subject,
    html,
  });
};

export default sendMail;
