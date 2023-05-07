import nodemailer from 'nodemailer'; 
import Transport from "nodemailer-sendinblue-transport";

const emailService = (sendTo, subject, htmlTemp) => {
	const transporter = nodemailer.createTransport(
		new Transport({ apiKey: process.env.SENDINBLUE_API_KEY })
	);

	const footer = `<p>This email was sent from Irembo test service.</p>`;

	const options = {
		from: process.env.SEND_FROM,
		to: sendTo,
		subject: subject,
		html: `${htmlTemp} <br/> <br/>${footer}`,
	};

	transporter.sendMail(options, function (err, info) {
		if (err) {
			console.log(err);
			return err;
		}
		console.log(info);
		return info.response;
	});
};

export default emailService;