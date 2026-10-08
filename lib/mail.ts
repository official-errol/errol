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

export async function sendOrderNotification(input: {
  productName: string;
  amountPhp: number;
  customerName: string;
  customerEmail: string;
  paymentReference: string;
  notes?: string;
  orderId: string;
}) {
  const transport = getTransport();
  const to = process.env.CONTACT_TO_EMAIL ?? process.env.GMAIL_USER;

  const subject = `[Order] ${input.productName} — ₱${input.amountPhp} — ${input.customerName}`;

  const html = `
    <div style="font-family:system-ui,sans-serif;max-width:600px">
      <h2 style="margin:0 0 8px">New order</h2>
      <p style="color:#666;margin:0 0 16px">
        Order ID: <code>${input.orderId}</code>
      </p>

      <table style="border-collapse:collapse;width:100%;font-size:14px">
        <tr>
          <td style="padding:8px 0;color:#666;width:140px">Product</td>
          <td style="padding:8px 0"><strong>${escape(input.productName)}</strong></td>
        </tr>
        <tr>
          <td style="padding:8px 0;color:#666">Amount</td>
          <td style="padding:8px 0"><strong>₱${input.amountPhp}</strong></td>
        </tr>
        <tr>
          <td style="padding:8px 0;color:#666">Customer</td>
          <td style="padding:8px 0">${escape(input.customerName)}</td>
        </tr>
        <tr>
          <td style="padding:8px 0;color:#666">Email</td>
          <td style="padding:8px 0"><a href="mailto:${escape(input.customerEmail)}">${escape(input.customerEmail)}</a></td>
        </tr>
        <tr>
          <td style="padding:8px 0;color:#666">GCash ref</td>
          <td style="padding:8px 0"><code>${escape(input.paymentReference)}</code></td>
        </tr>
        ${
          input.notes
            ? `<tr>
                <td style="padding:8px 0;color:#666">Notes</td>
                <td style="padding:8px 0">${escape(input.notes)}</td>
              </tr>`
            : ""
        }
      </table>

      <hr style="border:none;border-top:1px solid #eee;margin:24px 0" />

      <p style="font-size:14px;color:#666">
        Mark this order as completed from the admin panel after adding the customer to Canva Pro.
      </p>
    </div>
  `;

  await transport.sendMail({
    from: `"Errol Shop" <${process.env.GMAIL_USER}>`,
    to,
    replyTo: input.customerEmail,
    subject,
    text: `New order\n\nProduct: ${input.productName}\nAmount: PHP ${input.amountPhp}\nCustomer: ${input.customerName}\nEmail: ${input.customerEmail}\nGCash ref: ${input.paymentReference}\n${input.notes ? `Notes: ${input.notes}\n` : ""}\nOrder ID: ${input.orderId}`,
    html,
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
