import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/**
 * Sends an RSVP email invite
 * @param {string} recipient - Recipient's email address
 * @param {object} picnic - Picnic object (should include _id, title, date, park)
 */
export const sendInvitationEmail = async (recipient, picnic) => {
  const { title, date, park, _id } = picnic;
  const rsvpLink = `http://localhost:3000/rsvp/${_id}?email=${encodeURIComponent(recipient)}`;

  const html = `
    <div style="font-family: Arial, sans-serif; padding: 10px;">
      <h2>You're invited to a Piknik! 🌞</h2>
      <p><strong>Title:</strong> ${title}</p>
      <p><strong>Date:</strong> ${date}</p>
      <p><strong>Location:</strong> ${park?.name || 'Unknown Park'}</p>
      <a href="${rsvpLink}" target="_blank" style="background: #f3c530; color: black; padding: 10px 20px; text-decoration: none; border-radius: 5px;">RSVP Now</a>
    </div>
  `;

  const mailOptions = {
    from: `"Piknik" <${process.env.EMAIL_USER}>`,
    to: recipient,
    subject: `You're invited to a Piknik!`,
    html,
  };

  // ✅ Add these for debugging:
  console.log("📧 EMAIL_USER:", process.env.EMAIL_USER);
  console.log("📧 EMAIL_PASS:", process.env.EMAIL_PASS ? "✔️ loaded" : "❌ missing");

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent to ${recipient}: ${info.response}`);
  } catch (err) {
    console.error(`❌ Failed to send email to ${recipient}:`, err);
    throw err;
  }
};
