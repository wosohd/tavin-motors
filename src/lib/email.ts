import { Resend } from "resend";

const apiKey = process.env.RESEND_API_KEY;

const emailFrom =
  process.env.AUTH_EMAIL_FROM ??
  "Tavin Motors <onboarding@resend.dev>";

function getResend() {
  if (!apiKey) {
    throw new Error(
      "RESEND_API_KEY is not configured.",
    );
  }

  return new Resend(apiKey);
}

function escapeHtml(
  value: string,
) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

type SendPasswordResetEmailInput = {
  to: string;
  name: string;
  resetUrl: string;
};

export async function sendPasswordResetEmail({
  to,
  name,
  resetUrl,
}: SendPasswordResetEmailInput) {
  const resend = getResend();

  const safeName =
    escapeHtml(name);

  const safeResetUrl =
    escapeHtml(resetUrl);

  const { error } =
    await resend.emails.send({
      from: emailFrom,
      to,
      subject:
        "Reset your Tavin Motors password",

      text: [
        `Hello ${name},`,
        "",
        "We received a request to reset the password for your Tavin Motors account.",
        "",
        `Reset your password: ${resetUrl}`,
        "",
        "If you did not request this change, you can safely ignore this email.",
        "",
        "Tavin Motors",
      ].join("\n"),

      html: `
        <div
          style="
            margin:0;
            padding:40px 20px;
            background:#0b0d10;
            color:#f6f2e9;
            font-family:Arial,Helvetica,sans-serif;
          "
        >
          <div
            style="
              max-width:560px;
              margin:0 auto;
              border:1px solid #353238;
              border-radius:24px;
              overflow:hidden;
              background:#111318;
            "
          >
            <div
              style="
                height:5px;
                background:linear-gradient(
                  90deg,
                  #751e29,
                  #98763d,
                  #751e29
                );
              "
            ></div>

            <div style="padding:36px;">
              <p
                style="
                  margin:0 0 8px;
                  color:#c7a766;
                  font-size:12px;
                  font-weight:700;
                  letter-spacing:2px;
                  text-transform:uppercase;
                "
              >
                Tavin Motors
              </p>

              <h1
                style="
                  margin:0 0 20px;
                  font-size:28px;
                  line-height:1.2;
                  color:#ffffff;
                "
              >
                Reset your password
              </h1>

              <p
                style="
                  margin:0 0 16px;
                  color:#d3d4d6;
                  line-height:1.7;
                "
              >
                Hello ${safeName},
              </p>

              <p
                style="
                  margin:0 0 26px;
                  color:#aeb2b8;
                  line-height:1.7;
                "
              >
                We received a request to reset
                the password for your Tavin
                Motors account.
              </p>

              <a
                href="${safeResetUrl}"
                style="
                  display:inline-block;
                  padding:14px 22px;
                  border-radius:12px;
                  background:#751e29;
                  color:#ffffff;
                  font-size:14px;
                  font-weight:700;
                  text-decoration:none;
                "
              >
                Reset password
              </a>

              <p
                style="
                  margin:28px 0 0;
                  color:#777d85;
                  font-size:12px;
                  line-height:1.6;
                "
              >
                If you did not request this
                password reset, no action is
                required.
              </p>
            </div>
          </div>
        </div>
      `,
    });

  if (error) {
    throw new Error(
      `Unable to send password reset email: ${error.message}`,
    );
  }
}