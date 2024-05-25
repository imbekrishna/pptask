const nodemailer = require("nodemailer");

function getOffset(currentPage = 1, listPerPage) {
  return (currentPage - 1) * [listPerPage];
}

function emptyOrRows(rows) {
  if (!rows) {
    return [];
  }
  return rows;
}

async function sendMail(assignmentTitle, students) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const mailOptions = {
    from: "admin@assignment.com",
    to: students.join(", "),
    subject: "A new assignment has been posted.",
    text: `Assignment: ${assignmentTitle} has been created. Check your dashborad for more details.`,
    html: `Assignment: <strong>${assignmentTitle}</strong> has been created. Check your dashborad for more details.`,
  };

  return transporter.sendMail(mailOptions);
}

module.exports = {
  getOffset,
  emptyOrRows,
  sendMail,
};
