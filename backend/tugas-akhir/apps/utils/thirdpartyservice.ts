// import nodemailer from "nodemailer";

// export async function sendForgetPasswordEmail(email: string) {
//   // Generate test SMTP service account from ethereal.email
//   // Only needed if you don't have a real mail account for testing
//   let testAccount = await nodemailer.createTestAccount();

//   // create reusable transporter object using the default SMTP transport
//   let transporter = nodemailer.createTransport({
//     host: "smtp.ethereal.email",
//     port: 587,
//     secure: false, // true for 465, false for other ports
//     auth: {
//       user: testAccount.user, // generated ethereal user
//       pass: testAccount.pass, // generated ethereal password
//     },
//   });

//   const html = `<b> Reset Your Password </b><br><a href="#">confirm</a>`;
//   // send mail with defined transport object
//   let info = await transporter.sendMail({
//     from: '"Fred Foo 👻" <foo@example.com>', // sender address
//     to: email, // list of receivers
//     subject: "Reset Password", // Subject line
//     text: "Confirmation to reset your password", // plain text body
//     html, // html body
//   });
// }
