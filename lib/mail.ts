import nodemailer from "nodemailer";

export function getTransport() {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;

  if (!user || !pass) throw new Error("Missing Gmail credentials");

  return nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });
}

export async function sendContactEmail(input: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  const transport = getTransport();
  const to = process.env.CONTACT_TO_EMAIL ?? process.env.GMAIL_USER;

  await transport.sendMail({
    from: `"${input.name}" <${process.env.GMAIL_USER}>`,
    to,
    replyTo: input.email,
    subject: `[Contact] ${input.subject}`,
    text: `From: ${input.name} <${input.email}>\n\n${input.message}`,
    html: `
      <div style="font-family:system-ui,sans-serif;max-width:600px">
        <h2 style="margin:0 0 8px">New contact message</h2>
        <p style="color:#666;margin:0 0 16px">
          From <strong>${escape(input.name)}</strong> &lt;${escape(input.email)}&gt;
        </p>
        <p><strong>Subject:</strong> ${escape(input.subject)}</p>
        <hr style="border:none;border-top:1px solid #eee;margin:16px 0" />
        <pre style="white-space:pre-wrap;font-family:inherit">${escape(input.message)}</pre>
      </div>
    `,
  });
}

function escape(s: string) {
  return s.replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ]!,
  );
}
