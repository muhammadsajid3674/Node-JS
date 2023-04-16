import nodemailer from 'nodemailer'

export const sendEmail = async ({ email, otp }) => {
    let testAccount = await nodemailer.createTestAccount();
    const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
            user: testAccount.user,
            pass: testAccount.pass
        }
    })

    let mailOptions = {
        from: "company@gullygang.com",
        to: email,
        subject: "Testing mail",
        text: `<h3>Gully Gang Company</h3><br />
        <p>Your OTP is: ${otp}</p>`
    }

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log( "Email send: " + info.messageId);
            console.log("Preview URL: " + nodemailer.getTestMessageUrl(info));
        }
    })
}